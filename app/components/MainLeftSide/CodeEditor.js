import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
    const [editorCode, setEditorCode] = useState("\ndef hello_world():\n    return 'Hello World'\n\nhello_world()\n");

    const handleEditorDidMount = (editor, monaco) => {
        // Define a modern, minimalistic light theme
        monaco.editor.defineTheme('minimalistLight', {
            base: 'vs', // inherit from vs (light theme)
            inherit: true,
            rules: [
                { token: 'comment', foreground: 'a0a0a0', fontStyle: 'italic' }, // soft gray for comments
                { token: 'keyword', foreground: '4A90E2' }, // modern blue for keywords
                { token: 'identifier', foreground: '333333' }, // dark gray for identifiers (function names, variables)
                { token: 'string', foreground: 'E67E22' }, // warm orange for strings
                { token: 'number', foreground: '8E44AD' }, // deep purple for numbers
                { token: 'delimiter', foreground: '95A5A6' }, // soft gray for punctuation
                { token: 'type', foreground: '2ECC71' }, // green for types/classes
            ],
            colors: {
                // 'editor.background': '#F9FAFB', // soft white background (#F9FAFB)
                
                // 'editor.background': '#ECECEC',
                // 'editor.foreground': '#2C3E50', // dark slate text color
                // 'editorLineNumber.foreground': '#BDC3C7', // light gray for line numbers
                // 'editorCursor.foreground': '#E74C3C', // modern red for the cursor
                // 'editor.selectionBackground': '#D6EAF8', // subtle blue selection
                // 'editor.inactiveSelectionBackground': '#EBF5FB', // even lighter blue for inactive selection
                // 'editor.lineHighlightBackground': '#ECF0F1', // light gray for line highlight
                // 'editorBracketMatch.background': '#AED6F1', // soft blue for matching brackets
                // 'editorWhitespace.foreground': '#EAECEE', // faint gray for whitespaces

                // 'editor.background': '#efefef', // Light gray background for contrast

                'editor.background': '#efefef', // Light gray background for contrast
                'editor.foreground': '#2C3E50', // Darker text for clarity
                'editorLineNumber.foreground': '#95A5A6', // Light gray for line numbers
                'editorCursor.foreground': '#E74C3C', // Red cursor for better visibility
                'editor.selectionBackground': '#D6EAF8', // Subtle blue for selection
                'editor.inactiveSelectionBackground': '#EBF5FB', // Lighter blue for inactive selection
                'editor.lineHighlightBackground': '#e7eaeb', // Light gray for line highlight
                'editorBracketMatch.background': '#82E0AA', // Light green for bracket matching
                'editorWhitespace.foreground': '#D5D8DC', // Faint gray for whitespaces
            }
        });

        monaco.editor.setTheme('minimalistLight');
    };

    return (
        <div className="h-full w-full border-r-2 border-gray-300">
            <Editor
                height="100%"
                width="100%"
                defaultLanguage="python"
                theme="minimalistLight"
                value={editorCode}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    selectOnLineNumbers: true,
                }}
                onChange={(value, e) => setEditorCode(value ?? "")}
                onMount={handleEditorDidMount} // Hook into editor lifecycle
            />
        </div>
    );
};

export default CodeEditor;