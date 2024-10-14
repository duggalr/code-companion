import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlay } from "@fortawesome/free-solid-svg-icons";


const ChatInterface = () => {

  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", sender: "bot", complete: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState(""); // State to track the streaming message
  const [isGenerating, setIsGenerating] = useState(false); // Track whether we're currently generating a response
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Keep the input box always visible at the bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [ws, setWs] = useState(null);

  let accumulatedMessage = "";

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

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        ws.send(JSON.stringify(newMessage));
        setInputValue("");
    }
  };


  return (

    // bg-gray-100
    <div className="flex flex-col h-4/5 dark:bg-gray-900 p-4">
      
      {/* <span className="text-gray-400 text-xs pt-1 pl-1 pb-2 tracking-normal">
        <span className="font-bold">
          Note:
        </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span> */}

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
          onChange={(e) => setInputValue(e.target.value)}
          // className="text-[14px] flex-grow resize-none p-3 bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          className="text-[14px] flex-grow resize-none p-3 bg-[#F3F4F6] dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
          placeholder="type a message..."
          rows={1} // Keep the textarea at one row
        />

        <button
          onClick={handleSendMessage}
          className="w-[100px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"
        >
          <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-white opacity-90 group-hover:opacity-100 pr-2"
            />
          Send
        </button>

      </div>

    </div>

  );
};

export default ChatInterface;