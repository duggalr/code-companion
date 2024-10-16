# import asyncio
# import websockets

# async def test_websocket():
#     url = "ws://code-companion-api-staging.ca-central-1.elasticbeanstalk.com/ws_handle_chat_response"

#     try:
#         async with websockets.connect(url) as websocket:
#             print("Connected to WebSocket")
            
#             # Optionally, send a message to the WebSocket server
#             # await websocket.send("Hello WebSocket")

#             # Wait for a response
#             response = await websocket.recv()
#             print(f"Received response: {response}")
#     except Exception as e:
#         print(f"Error: {e}")

# # Run the event loop
# # asyncio.get_event_loop().run_until_complete(test_websocket())
# test_websocket()





# from asgiref.sync import async_to_sync
# import websockets


# def test_url(url, data=""):
#     conn = async_to_sync(websockets.connect)(url)
#     async_to_sync(conn.send)(data)


# if __name__ == "__main__":
#     url = "http://code-companion-api-staging.ca-central-1.elasticbeanstalk.com/ws_handle_chat_response"
#     test_url(url, data = "test")


# # test_url("ws://127.0.0.1:8000/ws/registration/123")






import websocket

def on_message(ws, message):
    print(f"Received message: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(a, b, c):
    print("Connection closed", a, b, c)

def on_open(ws):
    print("Connected to WebSocket")
    # Optionally, send a message to the server
    # ws.send("Hello WebSocket")
    # data = { text: inputValue, sender: 'user', type: 'user_message', complete: true }
    data = {
        "text": "Hello WebSocket"
        ,
        # 'sender': 'user',
        # 'type': 'user_message',
        # 'complete': True,
    }
    ws.send(data)

if __name__ == "__main__":
    websocket_url = "ws://code-companion-api-staging.ca-central-1.elasticbeanstalk.com/ws_handle_chat_response"
    # websocket_url = 'ws://127.0.0.1:8000/ws_handle_chat_response'
    # Test local first
    
    ws = websocket.WebSocketApp(websocket_url,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open

    # Run the WebSocket
    ws.run_forever()
