"use client";  // Add this at the top
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


const ConsoleOutput = ({ codeState }) => {

    const [output, setOutput] = useState(""); // To hold the output of the code
    const [pyodide, setPyodide] = useState(null);
  
    // // Load Pyodide asynchronously
    // useEffect(() => {
    //   const loadPyodide = async () => {
    //     const pyodide = await window.loadPyodide();
    //     setPyodide(pyodide);
    //   };
    //   loadPyodide();
    // }, []);

    // Load Pyodide asynchronously
    useEffect(() => {
      console.log('current-window:', window);

      // const loadPyodide = async () => {
      //   const pyodideModule = await import('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/');
      //   const pyodideInstance = await pyodideModule.loadPyodide();
      //   setPyodide(pyodideInstance);
      // };
      // loadPyodide();
    }, []);

    // // Leveraging Pyodide: https://pyodide.org/en/stable/
    // const _runPython = async (python_code) => {
    //   if (pyodide) {
    //     console.log('pyodide:', pyodide);
    //     try {
    //       // Run the Python code in Pyodide and update the output
    //       const result = pyodide.runPython(python_code);
    //       setOutput(result);
    //     } catch (error) {
    //       setOutput(`Error: ${error}`);
    //     }
    //   }
    // };


    const [code, setCode] = useState('');
    const [taskId, setTaskId] = useState(null);

    // TODO: implement function to send request to fastapi to run code
    const _sendCodeExecutionRequest = async function(code){
      
      const FASTAPI_URL = 'http://127.0.0.1:8000/execute_user_code';
      try {
        const payload = {
          language: 'python',
          code: code
        };
        const response = await axios.post(FASTAPI_URL, payload);
        console.log('code-response:', response);

        // Get the task ID from the response
        const { task_id } = response.data;
        setTaskId(task_id);

        // Poll for the result
        pollForResult(task_id);

      }
      catch (error) {
        console.log('Error:', error);
      }

    };


    const pollForResult = async (taskId) => {
      try {
        const resultUrl = `http://127.0.0.1:8000/result/${taskId}`;
        
        // Poll the FastAPI server for result until the task completes
        const interval = setInterval(async () => {
          const resultResponse = await axios.get(resultUrl);
          const { status, output } = resultResponse.data;
  
          if (status === 'Task completed') {
            setOutput(output);
            clearInterval(interval);
          }
        }, 2000); // Poll every 2 seconds
      } catch (error) {
        console.error('Error polling for result:', error);
      }
    };
    
    const handleRun = () => {
      console.log('Current Code:', codeState);
      const result = _sendCodeExecutionRequest(codeState);
      setOutput(result);
    };

    return (
      // <div className="p-4 text-sm font-mono text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 overflow-y-auto h-full">
      //   <pre>{output || "No output yet..."}</pre>
      // </div>

      // bg-gray-100
      // bg-white
      // dark:bg-gray-800 
      // <div className="flex flex-col h-full p-4 space-y-4 mt-0" style={{ backgroundColor: "#f3f3f3" }}>
      <div 
        // className="flex flex-col h-full mt-2 ml-4 bg-[#f3f3f3] dark:bg-gray-900"
        className="flex flex-col h-full mt-2 ml-4 bg-[#F3F4F6] dark:bg-gray-900"
        // style={{ backgroundColor: "#f3f3f3" }}
      >
        
        {/* Run Button */}
        {/* <button
          // onClick={handleRun}
          // bg-blue-600
          className="w-[110px] mt-4 py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"
        >
          <FontAwesomeIcon
            icon={faPlay}
            className="text-white opacity-90 group-hover:opacity-100 pr-2"
          />
          Run Code
        </button>

        <span className="text-gray-400 text-xs pt-2 pl-1 tracking-normal text-right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut est lorem. 
        </span> */}


        {/* Console Output Box */}
        <span className="text-gray-500 dark:text-gray-400 text-xs pt-3 pl-1 pb-2 tracking-normal">
          <span className="font-bold">
            Note:
          </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </span>
        
        <div
          // h-1/4 flex-grow 
          // className="h-1/2 overflow-y-auto p-4 border border-gray-300 dark:border-gray-600 bg-gray-150 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md">
          // className="mt-2 pt-1 pl-2 h-1/2 w-[95%] overflow-y-auto rounded-xl border border-gray-300 bg-gray-100 dark:bg-gray-300 text-gray-900"
          // bg-gray-100

          // className="mt-2 pt-1 pl-2 h-1/2 w-[95%] overflow-y-auto rounded-xl border border-gray-300 dark:border-gray-600 bg-[#f3f3f3] dark:bg-gray-800 text-gray-900"
          className="mt-2 pt-1 pl-2 h-1/2 w-[95%] overflow-y-auto rounded-xl border border-gray-300 dark:border-gray-600 bg-[#f4f5f6] dark:bg-gray-800 text-gray-900"
        >
          {output ? (
            <pre className="whitespace-pre-wrap break-words">{output}</pre>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 pt-2 pl-1 text-[14px] tracking-normal font-normal">
              <span className="text-blue-400">&gt;&gt;</span> console output will appear here...
            </p>
            // <div>
            //   <p className="text-gray-400 pt-4 pl-1 text-[14px]">
            //     <span className="text-blue-300">&gt;</span> Console output will appear here...
            //   </p>
            // </div>
          )}
        </div>

        {/* TODO: add pyodide and get the running code complete with the chat completion today** <-- full focus */}

        <div className="flex items-center justify-start space-x-4 mt-4">
          <button
            onClick={handleRun}
            // bg-blue-600
            className="w-[110px] py-2 text-[14px] bg-blue-500 text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-white opacity-90 group-hover:opacity-100 pr-2"
            />
            Run Code
          </button>
          
        </div>

        {/* <span className="text-gray-400 text-xs pt-2 pl-1 tracking-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut est lorem. 
        </span> */}

      </div>
    );

};
  
export default ConsoleOutput;