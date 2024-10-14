import { useState } from "react";
import { ResizableBox } from "react-resizable";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import Skulpt from "skulpt";
import CodeEditor from './MainLeftSide/CodeEditor';
import ConsoleChatTabs from "./MainRightSide/ConsoleChatTabs";


const MainLayout = () => {
    const [leftWidth, setLeftWidth] = useState(window.innerWidth / 2); // Initial width for editor
    // const [consoleOutput, setConsoleOutput] = useState("");

    // TODO: Parent State
    const [editorCode, setEditorCode] = useState("\ndef hello_world():\n    return 'Hello World'\n\nhello_world()\n");
    
    const [chatMessages, setChatMessages] = useState([
        { text: "Hello, how can I help you?", sender: "bot", complete: true },
    ]);
    const [generatedMessage, setGeneratedMessage] = useState(""); // State to track the streaming message
    const [isGeneratingMessage, setIsGeneratingMessage] = useState(false); // Track whether we're currently generating a response

    const [consoleOutput, setConsoleOutput] = useState(null); // To hold the output of the code

    return (
  
        // f5f5f5
        // f3f3f3
      <div className="flex h-screen pt-0">
        {/* style={{ backgroundColor: "#f3f3f3" }} */}
        
        {/* Left Side */}
        <ResizableBox
            width={leftWidth} // Left side width is controlled by ResizableBox
            height={Infinity}
            axis="x"
            minConstraints={[window.innerWidth * 0.25, Infinity]} // Min width 25% of window
            maxConstraints={[window.innerWidth * 0.75, Infinity]} // Max width 75% of window
            onResizeStop={(e, data) => setLeftWidth(data.size.width)} // Store the new width
            className="relative"
            resizeHandles={["e"]}
            handle={
                // className="w-2 bg-gray-500 hover:bg-gray-700 cursor-ew-resize h-full absolute right-0 top-0 group-hover:w-4 transition-all duration-300 flex items-center justify-center"
                <div
                    className="w-[4px] bg-blue-400 dark:bg-blue-800 dark:hover:bg-blue-500 hover:bg-blue-500 cursor-ew-resize h-full absolute right-0 top-0 group-hover:w-4 transition-all duration-300 flex items-center justify-center"
                    style={{ touchAction: "none" }}
                >
                {/* <FontAwesomeIcon
                    icon={faArrowsAltH}
                    className="text-black opacity-75 group-hover:opacity-100"
                /> */}
                </div>
            }
        >
            <CodeEditor codeState={editorCode} setCodeState={setEditorCode} />
        </ResizableBox>
  
        {/* Right Side */}
        <div
            // className="flex flex-col flex-1 h-full bg-[#F5F5F5] dark:bg-gray-900"
            className="flex flex-col flex-1 h-full bg-[#F3F4F6] dark:bg-gray-900"
        >
            <ConsoleChatTabs
                codeState={editorCode}
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                generatedMessage={generatedMessage}
                setGeneratedMessage={setGeneratedMessage}
                isGeneratingMessage={isGeneratingMessage}
                setIsGeneratingMessage={setIsGeneratingMessage}
                consoleOutput={consoleOutput}
                setConsoleOutput={setConsoleOutput}
            />
        </div>
  
      </div>
  
    );
};
  
export default MainLayout;