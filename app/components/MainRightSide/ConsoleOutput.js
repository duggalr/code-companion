import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";


const ConsoleOutput = ({ output }) => {

    // const [output, setOutput] = useState(""); // To hold the output of the code

    // Simulate running the code and getting an output
    const handleRun = () => {
      const result = runPythonCode(); // Call the function that runs Python code
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
      <div className="flex flex-col h-full mt-2 ml-4" style={{ backgroundColor: "#f3f3f3" }}>
        
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


        <span className="text-gray-400 text-xs pt-3 pl-1 pb-0 tracking-normal">
          <span className="font-bold">
            Note:
          </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </span>
        {/* Console Output Box */}
        <div
        // h-1/4 flex-grow 
          // className="h-1/2 overflow-y-auto p-4 border border-gray-300 dark:border-gray-600 bg-gray-150 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md">
          className="mt-2 pt-0 pl-2 h-1/2 w-[95%] overflow-y-auto rounded-xl border border-gray-300 bg-gray-100 text-gray-900"
        >
          {output ? (
            <pre className="whitespace-pre-wrap break-words">{output}</pre>
          ) : (
            <p className="text-gray-400 pt-2 pl-1 text-[14px]">
              <span className="text-blue-400">&gt;&gt;</span> console output will appear here...
            </p>
            // <div>
            //   <p className="text-gray-400 pt-4 pl-1 text-[14px]">
            //     <span className="text-blue-300">&gt;</span> Console output will appear here...
            //   </p>
            // </div>
          )}
        </div>

        <div className="flex items-center justify-start space-x-4 mt-4">
          <button
            // onClick={handleRun}
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