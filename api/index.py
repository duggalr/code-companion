import os
from dotenv import load_dotenv, find_dotenv
ENV_FILE = find_dotenv()
load_dotenv(ENV_FILE)
from pydantic import BaseModel
from openai import AsyncOpenAI
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


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

# TODO:
    # create it here first and get it to work
    # then, componentize and finalize with tests

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


from utils import testing_one

@app.post("/execute_user_code")
async def execute_code(request: CodeExecutionRequest):
    print(f"language: {request.language}")
    print(f"code: {request.code}")

    user_language = request.language
    user_code = request.code

    response = testing_one.execute_code_in_container(
        language="python",
        code=user_code
    )

    print(f"Docker Response: {response}")

# TODO:
    # create celery task for this docker code execution
    # from there:
        # show response on next.js app
        # proceed to finalizing from there

