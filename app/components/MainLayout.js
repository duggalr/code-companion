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
    const [consoleOutput, setConsoleOutput] = useState("");
  
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
            <CodeEditor />
        </ResizableBox>
  
        {/* Right Side */}
        <div
            // className="flex flex-col flex-1 h-full bg-[#F5F5F5] dark:bg-gray-900"
            className="flex flex-col flex-1 h-full bg-[#F3F4F6] dark:bg-gray-900"
        >
            <ConsoleChatTabs consoleOutput={consoleOutput} />
        </div>
  
      </div>
  
    );
};
  
export default MainLayout;