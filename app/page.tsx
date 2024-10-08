"use client";  // Add this at the top
import { useEffect, useState } from 'react';
import Image from "next/image";
// import ThemeToggle from './components/Utils/ThemeToggle';
// import TopNavBar from './components/TopNavBar';
// import ResizableCodeEditor from './components/ResizableCodeEditor';
// import ResizableConsole from './components/ResizableConsole';
import TopNavBar from  './components/Utils/TopNavBar';
import MainLayout from './components/MainLayout';


export default function Home() {

    const [theme, setTheme] = useState('light');

    useEffect(() => {}, []);

    return (
       
        //  className="bg-white"
        <main>

            <TopNavBar />
            <MainLayout />

        </main>

    );

}