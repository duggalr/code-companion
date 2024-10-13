import os
from dotenv import load_dotenv, find_dotenv
ENV_FILE = find_dotenv()
load_dotenv(ENV_FILE)
from pydantic import BaseModel
from openai import AsyncOpenAI
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates


### Create FastAPI instance with custom docs and openapi url
app = FastAPI(
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend's origin here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

### Celery ###
import docker
from celery import Celery
from celery.result import AsyncResult

# celery -A index worker --loglevel=info

# Initialize Celery
celery = Celery(
    __name__,
    backend = "redis://127.0.0.1",
    broker = "redis://127.0.0.1:6379/0",
)
# celery.conf.update(
#     __name__,
#     broker="redis://127.0.0.1:6379/0",
#     backend="redis://127.0.0.1:6379/0"
#     # broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"),
#     # result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0"),
# )
# print(f"Celery CONFIG: {celery.conf}")

# Initialize Docker client
client = docker.from_env()

@celery.task
def execute_code_in_container(language: str, code: str):
    """
    Task to run user-submitted code inside a Docker container.
    """
    # Set up language-specific Docker image
    docker_image = {
        "python": "python:3.12-slim",
        "nodejs": "node:14-slim"
    }.get(language)

    if not docker_image:
        raise ValueError("Unsupported language")

    # Write the user's code to a temporary file
    host_code_dir = "/tmp"  # Directory on the host
    code_file_name = "submission_code.py"  # Name of the file
    host_code_file = os.path.join(host_code_dir, code_file_name)

    with open(host_code_file, "w") as f:
        f.write(code)

    # The code will be placed in the /app directory inside the container
    container_code_file = f"/app/{code_file_name}"

    # Create the command to run inside the container
    exec_cmd = {
        "python": f"python {container_code_file}",
        "nodejs": f"node {container_code_file}"
    }.get(language)

    # Initialize Docker client
    client = docker.from_env()

    # Run the code inside a Docker container
    container = client.containers.run(
        image=docker_image,
        command=exec_cmd,
        volumes={host_code_dir: {"bind": "/app", "mode": "rw"}},  # Mount the entire /tmp directory
        working_dir="/app",
        detach=True,
        mem_limit="512m",
        cpu_period=100000,
        cpu_quota=50000  # limits CPU to 50% of a single CPU core
    )

    # Wait for the container to complete
    result = container.wait()

    # Capture the container logs (output from the code execution)
    logs = container.logs().decode("utf-8")

    # # Remove the container explicitly
    container.remove()

    if result["StatusCode"] == 0:
        return {"success": True, "output": logs}
    else:
        return {"success": False, "output": logs}




import random
import time

@celery.task(name="test_task_one")
def test_task_one():
    rv = []
    for idx in range(0, 15):
        rn = random.choice(list(range(1,4)))
        print(f"Sleep for {rn} seconds...")
        time.sleep(rn)
        rv.append(idx)

    final_sum = sum(rv)
    return {'success': True, 'output': final_sum}


### Views ###

def _prepate_tutor_prompt():
    prompt = """##Instructions:
You will be assisting a student who is learning Python, by being their upbeat, encouraging tutor. 
Your primary goal is to guide and mentor them, helping them learn Python effectively, but also to become a great individual thinker. Please adhere to these guidelines. See examples below of what not to say, and what to say instead.
No Direct Answers: Do not provide direct code solutions to the students' questions or challenges. Instead, focus on providing hints, explanations, and guidance that help them understand and solve the problems on their own. For questions students ask, don't simply provide the answer. Instead, provide a hint and try to ask the student a follow-up question/suggestion. Under no circumstance should you provide the student a direct answer to their problem/question.
Encourage Problem Solving: Always encourage the students to think through the problems themselves. Ask leading questions that guide them toward a solution, and provide feedback on their thought processes.
Make sure you consider both correctness and efficiency. You want to help the student write optimal code, that is also correct for their given problem.
Only ask one question or offer only one suggestion at a time. Wait for the students response before asking a new question or offering a new suggestion.
Encourage the student. Always motivate the student and provide encourage, even when they are struggling or haven't figured out the solution yet. This will help provide motivation and elicit positive emotion for the student. 

##Example Student Question:
# Find the total product of the list

list_one = [2,23,523,1231,32,9]
total_product = 0
for idx in list_one:
    total_product = idx * idx

I'm confused here. I am multiplying idx and setting it to total_product but getting the wrong answer. What is wrong?

##Example Bad Answer (Avoid this type of answer):
You are correct in iterating through the list with the for loop but at the moment, your total_product is incorrectly setup. Try this instead:
list_one = [2,23,523,1231,32,9]
total_product = 1
for idx in list_one:
    total_product = total_product * idx

##Example Good Answer: (this is a good answer because it identifies the mistake the student is making but instead of correcting it for the student, it asks the student a follow-up question as a hint, forcing the student to think on their own)
You are on the right track. Pay close attention to the operation you are performing in the loop. You're currently multiplying the number with itself, but you want to find the product of all numbers. What operation should you use instead to continuously update 'total_product'?

##Student Question:
{question}

##Student Code:
{student_code}

##Your Answer:
"""
    return prompt


async def generate_async_response_stream():
    client = AsyncOpenAI(
        api_key=os.environ['OPENAI_KEY']
    )
    model = "gpt-4o-mini"

    prompt = _prepate_tutor_prompt()
    response_stream = await client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                ],
            }
        ],
        model=model,
        stream=True
    )

    async for chunk in response_stream:
        print('res:', chunk)
        if chunk.choices[0].finish_reason == 'stop':
            yield None
        else:
            content = chunk.choices[0].delta.content
            if content:
                yield content


@app.websocket("/ws_handle_chat_response")
async def websocket_handle_chat_response(websocket: WebSocket):
    await websocket.accept()  # Accept WebSocket connection
    try:
        while True:
            # Receive data from client
            data = await websocket.receive_json()
            print('Received data:', data)

            # TODO:
                # MODEL_GEN_COMPLETE
            async for text in generate_async_response_stream():
                print('Response', text)
                # print('Is None:', text is None)
                # await websocket.send_text(text)
                if text is None:
                    await websocket.send_text('MODEL_GEN_COMPLETE')
                else:
                    await websocket.send_text(text)

    except WebSocketDisconnect:
        print("WebSocket connection closed")
        await websocket.close()


class CodeExecutionRequest(BaseModel):
    language: str
    code: str


@app.post("/execute_user_code")
async def execute_code(request: CodeExecutionRequest):
    """
    Endpoint to submit code for execution.
    """
    # task = test_task_one.delay()
    # TODO:
    task = execute_code_in_container.delay()
    return {"task_id": task.id}
  

@app.get("/task/status/{task_id}")
async def get_status(task_id: str):
    task_result = AsyncResult(task_id)
    return {"task_id": task_id, "status": task_result.status}


@app.get("/result/{task_id}")
def get_result(task_id: str):
    """
    Endpoint to check the result of the execution.
    """
    print(f"Task ID: {task_id}")
    task_result = celery.AsyncResult(task_id)
    return {"task_id": task_id, "task_result": task_result}
    # print(f"Task Result: {task_result}")
    # print(f"Task RESULT DETAIL: {task_result.result}")
    # print(f"GET RESPONSE FROM TASK: {task_result.get()}")
    # if task_result.state == 'PENDING':
    #     return {"status": "Task is still being processed..."}
    # elif task_result.state == 'SUCCESS':
    #     task_rv = task_result.get()
    #     return {"status": "Task completed", "output": task_rv}
    # else:
    #     return {"status": "Task failed", "error": task_result.info}



# @app.get("/result/{task_id}")
# def get_result(task_id: str):
#     """
#     Endpoint to check the result of the execution.
#     """
#     print(f"Task ID: {task_id}")
#     task_result = AsyncResult(task_id)
#     print(f"Task Result: {task_result}")

#     print(f"GET RESPONSE FROM TASK: {task_result.get()}")

#     # if task_result.state == 'PENDING':
#     #     return {"status": "Task is still being processed..."}
#     # elif task_result.state == 'SUCCESS':
#     #     task_rv = task_result.get()
#     #     return {"status": "Task completed", "output": task_rv}
#     # else:
#     #     return {"status": "Task failed", "error": task_result.info}



# @app.post("/execute_user_code")
# async def execute_code(request: CodeExecutionRequest):
#     """
#     Endpoint to submit code for execution.
#     """
#     task = test_task_one.delay()
#     return {"task_id": task.id}

#     # # print(f"language: {request.language}")
#     # # print(f"code: {request.code}")

#     # user_language = request.language
#     # user_code = request.code

#     # task = execute_code_in_container.delay(
#     #     language = user_language,
#     #     code = user_code
#     # )
#     # return {"task_id": task.id}

#     # # response = testing_one.execute_code_in_container(
#     # #     language="python",
#     # #     code=user_code
#     # # )
#     # # print(f"Docker Response: {response}")

#     # # if submission.language not in ["python", "nodejs"]:
#     # #     raise HTTPException(status_code=400, detail="Unsupported language")

#     # # # Execute the code in the background using a Celery task
#     # # task = execute_code_in_container.delay(submission.language, submission.code)
    
#     # # return {"task_id": task.id}

