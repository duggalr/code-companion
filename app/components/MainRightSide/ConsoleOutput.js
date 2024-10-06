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
      <div className="flex flex-col h-full p-4 space-y-4 mt-12" style={{ backgroundColor: "#f3f3f3" }}>
        
        {/* Run Button */}
        <button
          // onClick={handleRun}
          className="w-[110px] py-2 bg-blue-600 text-[14px] text-white opacity-90 font-medium rounded-xl hover:bg-blue-700 transition-all"
        >
          <FontAwesomeIcon
            icon={faPlay}
            className="text-white opacity-90 group-hover:opacity-100 pr-2"
          />
          Run Code
        </button>

        {/* Console Output Box */}
        {/* <div
        // h-1/4 flex-grow 
          className="h-1/2 overflow-y-auto p-4 border border-gray-300 dark:border-gray-600 bg-gray-150 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md">
          {output ? (
            <pre className="whitespace-pre-wrap break-words">{output}</pre>
          ) : (
            <p className="text-gray-400">&gt; Console output will appear here...</p>
          )}
        </div> */}

      </div>
    );

};
  
export default ConsoleOutput;