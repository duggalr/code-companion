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
      {/* <div className="flex border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"> */}
      {/* <div className="flex border-b border-gray-300 dark:border-gray-600">
        <button
          // className={`px-4 py-2 text-sm font-medium border-b-0 border-r-0 ${
          //   activeTab === "console" ? "bg-white text-gray-900" : "text-gray-500"
          // } hover:bg-white focus:outline-none`}
          // ${activeTab === "console"? "border-b-2 border-blue-300" : ""}

          className={`px-4 py-3 text-sm font-medium border-b-0 border-r-0 hover:bg-gray-200 focus:outline-none ${activeTab === "console"? "border-b-2 border-sky-600" : ""}`}
          onClick={() => setActiveTab("console")}
        >
          Console
        </button>
        <button
          // className={`px-4 py-2 text-sm font-medium ${
          //   activeTab === "chat" ? "bg-white text-gray-900" : "text-gray-500"
          // } hover:bg-white focus:outline-none`}
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === "chat" ? "border-b-2 border-gray-300" : ""
          } hover:bg-gray-200 focus:outline-none`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
      </div> */}

      {/* Tab Menu */}
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px">
              <li class="me-2">
                  <a href="" class="inline-block p-0 px-6 pb-2 pt-3 text-gray-700 border-b-2 border-gray-300 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">
                    Console
                  </a>
              </li>
              <li class="me-2">
                  <a href="" class="inline-block p-0 px-6 pb-2 pt-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                    Chat
                  </a>
              </li>
          </ul>
      </div>

      {/* Content */}
      {/* bg-white dark:bg-gray-800 */}
      <div className="flex-grow overflow-auto">
        {activeTab === "console" && <ConsoleOutput output={consoleOutput} />}
        {/* {activeTab === "chat" && <ChatInterface />} */}
      </div>

    </div>

  );
};

export default ConsoleChatTabs;