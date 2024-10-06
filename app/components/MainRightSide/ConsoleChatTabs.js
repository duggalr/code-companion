import { useState } from "react";
import ConsoleOutput from "./ConsoleOutput";
import ChatInterface from "./ChatInterface";

const ConsoleChatTabs = ({ consoleOutput }) => {
  const [activeTab, setActiveTab] = useState("console");

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      {/* <div className="flex border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"> */}
      {/* TODO: */}
      <div className="flex border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-0 border-r-0 ${
            activeTab === "console" ? "bg-white text-gray-900" : "text-gray-500"
          } hover:bg-white focus:outline-none`}
          onClick={() => setActiveTab("console")}
        >
          Console
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "chat" ? "bg-white text-gray-900" : "text-gray-500"
          } hover:bg-white focus:outline-none`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-auto bg-white dark:bg-gray-800">
        {activeTab === "console" && <ConsoleOutput output={consoleOutput} />}
        {activeTab === "chat" && <ChatInterface />}
      </div>
    </div>
  );
};

export default ConsoleChatTabs;