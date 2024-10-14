import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlay, faSpinner } from "@fortawesome/free-solid-svg-icons";


const ChatInterface = ({ messages, setMessages, generatedMessage, setGeneratedMessage, isGenerating, setIsGenerating }) => {

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sendBtnEnabled, setSendBtnEnabled] = useState(false);

  // Enter Listener
  useEffect(() => {
    const listener = (event) => {
      if ((event.code === "Enter" || event.code === "NumpadEnter") && !event.shiftKey) {
        console.log("Enter key was pressed without Shift. Run your function.");
        event.preventDefault();
        // callMyFunction();
      }
    };
  
    document.addEventListener("keydown", listener);
  
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  

  // End of Messages
  useEffect(() => {
    // Keep the input box always visible at the bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  const [ws, setWs] = useState(null);

  let accumulatedMessage = "";

  // Web Socket
  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket("ws://127.0.0.1:8000/ws_handle_chat_response");
  
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };
  
    socket.onmessage = (event) => {
      const message = event.data;
      console.log("Received message:", message);
  
      if (message === "MODEL_GEN_COMPLETE") {

        // When generation is complete, add the final generated message to messages
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: accumulatedMessage, sender: "bot" }, // Final generated message
        ]);

        // Reset the local variable after the update
        setTimeout(() => {
          accumulatedMessage = ""; // Clear after allowing state update to take effect
        }, 0);

        setGeneratedMessage(""); // Clear the generated message state for future use
        setIsGenerating(false);  // Reset generation state
        setIsLoading(false);

      } else {
        // Keep appending parts of the generated message
        accumulatedMessage += message;
        setGeneratedMessage((prevMessage) => prevMessage + message + "");
        setIsGenerating(true); // Mark that we're generating a response

      }
    };
  
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    setWs(socket); // Save the socket connection
  
    return () => {
      // Cleanup: Close WebSocket connection when component unmounts
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && ws) {
        const newMessage = { text: inputValue, sender: 'user', type: 'user_message', complete: true };
        console.log('message:', newMessage);

        setSendBtnEnabled(false);
        setIsLoading(true);
        
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        ws.send(JSON.stringify(newMessage));
        setInputValue("");
    }
  };

  // setSendBtnEnabled
  // onChange={(e) => setInputValue(e.target.value)}
  const handleNewInputValue = (e) => {

    let user_input_message = e.target.value;
    setInputValue(user_input_message);

    if (user_input_message.trim() !== "") {
      setSendBtnEnabled(true);
    } else {
      setSendBtnEnabled(false);
    }

  };


  return (

    <div className="flex flex-col h-4/5 dark:bg-gray-900 p-4">

      <span className="text-gray-500 dark:text-gray-400 text-xs pt-1 pl-1 pb-4 tracking-normal">
        <span className="font-bold">
          Note:
        </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-[#F3F4F6] dark:bg-gray-800">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.sender === "user"
                ? "self-end bg-blue-400 text-white"
                : "self-start bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            } p-3 rounded-lg w-full max-w-full break-words text-[13px]`}
          >
            {msg.text}
          </div>
        ))}
        
        {/* Display the streaming message here */}
        {isGenerating && (
          <div className="self-start bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full max-w-full break-words text-[13px]">
            {generatedMessage}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area - textarea */}
      <div className="flex items-center border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
        
        <textarea
          value={inputValue}
          // onChange={(e) => setInputValue(e.target.value)}
          onChange={(e) => handleNewInputValue(e)}
          className="text-[14px] flex-grow resize-none p-3 bg-[#F3F4F6] dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
          placeholder="type a message..."
          rows={1}
          disabled={isLoading}
        />
        
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !sendBtnEnabled} // Disable when loading or when send button is not enabled
          className={`${sendBtnEnabled && !isLoading ? 
            "w-[100px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all cursor-pointer" : 
            "w-[100px] py-2 text-[14px] bg-gray-500 cursor-not-allowed font-medium rounded-xl"
          }`}
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin className="text-white pr-2" />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className="text-white pr-1" />
          )}
          {isLoading ? "" : "Send"}
        </button>


        {/* <button
          onClick={handleSendMessage}
          // disabled={isLoading} // Disable button when loading
          disabled={sendBtnEnabled}
          className={`${sendBtnEnabled ? 
            "w-[100px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
            : 
            "w-[100px] py-2 text-[14px] bg-gray-500 cursor-not-allowed font-medium rounded-xl"
          }`}
          // className={`${(isLoading) ? "w-[100px] py-2 text-[14px] bg-blue-500 cursor-not-allowed font-medium rounded-xl" : "w-[100px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"}`}
          // className="w-[100px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"
        >

          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin className="text-white pr-2" />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className="text-white pr-1" />
          )}
          {isLoading ? "" : "Send"}

        </button> */}
        {/* sendBtnEnabled, setSendBtnEnabled */}


        {/* {
          inputValue.trim().length > 0 ? (

            <button
              onClick={handleSendMessage}
              disabled={isLoading} // Disable button when loading
              className={`${isLoading ? "w-[100px] py-2 text-[14px] bg-blue-500 cursor-not-allowed font-medium rounded-xl" : "w-[100px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"}`}
              // className="w-[100px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"
            >

              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="text-white pr-2" />
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} className="text-white pr-1" />
              )}
              {isLoading ? "" : "Send"}

            </button>

          ) : (

            <button
              onClick={handleSendMessage}
              disabled={true}
              className="w-[100px] mr-2 py-2 text-[14px] bg-gray-500 opacity-90 cursor-not-allowed font-medium rounded-xl"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white pr-2" />
              Send
            </button>

          )
        } */}

        {/* <button
          onClick={handleSendMessage}
          disabled={isLoading} // Disable button when loading
          className={`w-[110px] py-2 text-[14px] text-white font-medium rounded-xl transition-all 
            ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin className="text-white pr-2" />
          ) : (
            <FontAwesomeIcon icon={faPlay} className="text-white pr-1" />
          )}
          {isLoading ? "" : "Send"}
        </button> */}

      </div>

    </div>

  );
};

export default ChatInterface;