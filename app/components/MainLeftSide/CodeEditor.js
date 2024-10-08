import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
    const [editorCode, setEditorCode] = useState("\ndef hello_world():\n    return 'Hello World'\n\nhello_world()\n");

    const handleEditorDidMount = (editor, monaco) => {
        // Define the light theme
        monaco.editor.defineTheme('minimalistLight', {
            
            // base: 'vs', // inherit from vs (light theme)
            // inherit: true,
            // rules: [
            //     { token: 'comment', foreground: 'a0a0a0', fontStyle: 'italic' }, 
            //     { token: 'keyword', foreground: '4A90E2' }, 
            //     { token: 'identifier', foreground: '333333' }, 
            //     { token: 'string', foreground: 'E67E22' }, 
            //     { token: 'number', foreground: '8E44AD' }, 
            //     { token: 'delimiter', foreground: '95A5A6' }, 
            //     { token: 'type', foreground: '2ECC71' }, 
            // ],
            // colors: {
            //     'editor.background': '#F9FAFB', 
            //     'editor.foreground': '#2C3E50', 
            //     'editorLineNumber.foreground': '#95A5A6', 
            //     'editorCursor.foreground': '#E74C3C', 
            //     'editor.selectionBackground': '#D6EAF8', 
            //     'editor.inactiveSelectionBackground': '#EBF5FB', 
            //     'editor.lineHighlightBackground': '#e7eaeb', 
            //     'editorBracketMatch.background': '#82E0AA', 
            //     'editorWhitespace.foreground': '#D5D8DC', 
            // }
           
            // base: 'vs-dark', // inherit from vs-dark (dark theme)
            // inherit: true,
            // rules: [
            //     { token: 'comment', foreground: '6A737D', fontStyle: 'italic' }, 
            //     { token: 'keyword', foreground: '569CD6' }, 
            //     { token: 'identifier', foreground: 'D4D4D4' }, 
            //     { token: 'string', foreground: 'CE9178' }, 
            //     { token: 'number', foreground: 'B5CEA8' }, 
            //     { token: 'delimiter', foreground: '808080' }, 
            //     { token: 'type', foreground: '4EC9B0' }, 
            // ],
            // colors: {
            //     'editor.background': '#1E1E1E', 
            //     'editor.foreground': '#D4D4D4', 
            //     'editorLineNumber.foreground': '#858585', 
            //     'editorCursor.foreground': '#AEAFAD', 
            //     'editor.selectionBackground': '#264F78', 
            //     'editor.inactiveSelectionBackground': '#2C2C2C', 
            //     'editor.lineHighlightBackground': '#2D2D30', 
            //     'editorBracketMatch.background': '#515A6B', 
            //     'editorWhitespace.foreground': '#3B3B3B', 
            // }


            base: 'vs-dark', // inherit from vs-dark (dark theme)
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A737D', fontStyle: 'italic' }, 
                { token: 'keyword', foreground: '007ACC' }, // Lighter blue for keywords
                { token: 'identifier', foreground: 'D4D4D4' }, 
                { token: 'string', foreground: 'CE9178' }, 
                { token: 'number', foreground: 'B5CEA8' }, 
                { token: 'delimiter', foreground: '808080' }, 
                { token: 'type', foreground: '4EC9B0' }, 
            ],
            colors: {
                'editor.background': '#252526', // Slightly lighter dark background
                'editor.foreground': '#D4D4D4', 
                'editorLineNumber.foreground': '#A0A0A0', // Lighter line number color
                'editorCursor.foreground': '#FFFFFF', // White cursor for better visibility
                'editor.selectionBackground': '#A7C6ED', // Softer selection background
                'editor.inactiveSelectionBackground': '#2C2C2C',
                'editor.lineHighlightBackground': '#2D2D30', 
                'editorBracketMatch.background': '#515A6B', 
                'editorWhitespace.foreground': '#3B3B3B', 
            }

        });

        // Define the dark theme
        monaco.editor.defineTheme('minimalistDark', {
            
            // base: 'vs-dark', // inherit from vs-dark (dark theme)
            // inherit: true,
            // rules: [
            //     { token: 'comment', foreground: '6A737D', fontStyle: 'italic' }, 
            //     { token: 'keyword', foreground: '569CD6' }, 
            //     { token: 'identifier', foreground: 'D4D4D4' }, 
            //     { token: 'string', foreground: 'CE9178' }, 
            //     { token: 'number', foreground: 'B5CEA8' }, 
            //     { token: 'delimiter', foreground: '808080' }, 
            //     { token: 'type', foreground: '4EC9B0' }, 
            // ],
            // colors: {
            //     'editor.background': '#1E1E1E', 
            //     'editor.foreground': '#D4D4D4', 
            //     'editorLineNumber.foreground': '#858585', 
            //     'editorCursor.foreground': '#AEAFAD', 
            //     'editor.selectionBackground': '#264F78', 
            //     'editor.inactiveSelectionBackground': '#2C2C2C', 
            //     'editor.lineHighlightBackground': '#2D2D30', 
            //     'editorBracketMatch.background': '#515A6B', 
            //     'editorWhitespace.foreground': '#3B3B3B', 
            // }

            base: 'vs-dark', // inherit from vs-dark (dark theme)
            inherit: true,
            rules: [
                { token: 'comment', foreground: 'A6C4DB', fontStyle: 'italic' }, 
                { token: 'keyword', foreground: 'C6C6FF' }, 
                { token: 'identifier', foreground: 'D4D4D4' }, 
                { token: 'string', foreground: '79C0FF' }, 
                { token: 'number', foreground: 'B5CEA8' }, 
                { token: 'delimiter', foreground: '808080' }, 
                { token: 'type', foreground: 'A2D3E0' }, 
            ],
            colors: {
                'editor.background': '#1C2631', // Dark blue background
                'editor.foreground': '#D4D4D4', 
                'editorLineNumber.foreground': '#4E7A9A', 
                'editorCursor.foreground': '#AEAFAD', 
                'editor.selectionBackground': '#3D5A7F', 
                'editor.inactiveSelectionBackground': '#2C2C2C', 
                'editor.lineHighlightBackground': '#2D2D30', 
                'editorBracketMatch.background': '#516B80', 
                'editorWhitespace.foreground': '#3B3B3B', 
            }
            
        });

        // Set the initial theme based on localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        monaco.editor.setTheme(savedTheme === 'dark' ? 'minimalistDark' : 'minimalistLight');

        // Listen for theme change event
        const handleThemeChange = (e) => {
            const newTheme = e.detail;
            monaco.editor.setTheme(newTheme === 'dark' ? 'minimalistDark' : 'minimalistLight');
        };

        window.addEventListener('themeChange', handleThemeChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('themeChange', handleThemeChange);
        };
    };

    return (
        <div className="h-full w-full border-r-2 border-gray-300">
            <Editor
                height="100%"
                width="100%"
                defaultLanguage="python"
                value={editorCode}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    selectOnLineNumbers: true,
                }}
                onChange={(value) => setEditorCode(value ?? "")}
                onMount={handleEditorDidMount} // Hook into editor lifecycle
            />
        </div>
    );
};

export default CodeEditor;