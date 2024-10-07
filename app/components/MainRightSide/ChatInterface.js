import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const ChatInterface = () => {
  // Initial messages with some placeholder text
  const [messages] = useState([
    { text: "Hello, how can I help you?", sender: "bot" },
    { text: "I have a question about the console.", sender: "user" },
    { text: "Sure! Ask away.", sender: "bot" },
    // { text: "How do I run Python code here?", sender: "user" },
    // { text: "You can type it in the editor and press the 'Run' button.", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");

  // Keep the input box always visible at the bottom
  const messagesEndRef = useRef(null);
  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      // Add a new user message (this is just for UI demonstration)
      messages.push({ text: inputValue, sender: "user" });
      setInputValue("");
    }
  };

  return (

    // bg-gray-100
    <div className="flex flex-col h-full dark:bg-gray-800 p-4">
      
      {/* Messages area with border */}
      <div className="flex-grow overflow-y-auto p-6 space-y-3 border border-gray-300 dark:border-gray-600 rounded-xl" style={{ backgroundColor: "#f3f3f3" }}>
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${
                msg.sender === "user"
                  ? "self-end bg-blue-400 text-white"
                  : "self-start bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              } p-3 rounded-lg w-full max-w-full break-words`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No messages yet...</p>
        )}
        {/* Dummy div to ensure scroll goes to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - textarea */}
      <div className="flex flex-col border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
          className="resize-none p-3 bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          placeholder="Type a message..."
          rows={3} // Make it taller
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 self-end"
        >
          Send
          {/* &nbsp;
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-white opacity-90 group-hover:opacity-100 pr-0"
          /> */}
        </button>
      </div>
    </div>

  );
};

export default ChatInterface;