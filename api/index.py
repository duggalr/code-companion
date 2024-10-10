import os
from dotenv import load_dotenv, find_dotenv
ENV_FILE = find_dotenv()
load_dotenv(ENV_FILE)
from openai import AsyncOpenAI
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


### Create FastAPI instance with custom docs and openapi url
app = FastAPI(
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json"
)

# TODO:
    # create it here first and get it to work
    # then, componentize and finalize with tests

def _prepate_tutor_prompt():
    prompt = f"""## Instructions:
You are an AI assistant. Your goal is to output begineer python code for the user to go through and learn.

## Output:
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


# @app.get("/api/py/helloFastApi")
# def hello_fast_api():
#     return {"message": "Hello from FastAPI"}
