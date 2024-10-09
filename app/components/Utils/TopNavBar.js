import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCircleInfo, faCode, faInfo, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';


export default function TopNavBar () {

    useEffect(() => {}, []);

    return (

        // <ul
        // className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-700 dark:border-gray-700 dark:text-gray-400 bg-white dark:bg-neutral-900 pl-2 pr-4">
        
// <ul
        //     className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b-2 border-gray-300 bg-[#F5F5F5] dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
        // >

        // style={{ backgroundColor: "#F5F5F5" }}

        // text-gray-500 
        <ul
            // className="flex flex-wrap text-sm font-medium text-center border-b-2 border-gray-300 bg-[#F5F5F5] dark:bg-gray-900 dark:text-gray-300"
            className="flex flex-wrap text-sm font-medium text-center border-b-2 border-gray-300 bg-[#F3F4F6] dark:bg-gray-900 dark:text-gray-300"
            // className="flex flex-wrap text-sm font-medium text-center border-b-2 border-gray-300 bg-[#eff0f3] dark:bg-gray-900 dark:text-gray-300"
        >
                
            <li>
                {/* className="inline-block pt-2.5 pl-2 rounded-t-lg text-[16px] text-black dark:text-gray-100 cursor-pointer tracking-normal" */}
                <a
                href="http://localhost:3000/landing"
                // className="inline-block pt-2.5 pl-2 pb-2 rounded-t-lg text-[16px] text-black cursor-pointer tracking-tight"
                className="inline-block pt-2.5 pl-2 pb-2 rounded-t-lg text-[16px] cursor-pointer tracking-tight "
                // style={{ color: "#2E2E2E" }}
                // style={{ color: "black" }}
                >
                    <FontAwesomeIcon
                        icon={faLaptopCode}
                        size="sm"
                        className="pr-1 pl-2"
                    />
                    Code Companion
                </a>
            </li>
            <div className="ml-auto flex items-center space-x-6">
                {/* <a href="#" className="p-2.5 text-black font-normal dark:text-gray-300 text-[14px]"> */}
                    {/* <FontAwesomeIcon
                        icon={faCircleInfo}
                        size="sm"
                        className="pr-1 pl-2"
                    /> */}
                    {/* <FontAwesomeIcon 
                        icon={faInfo}
                        size="sm"
                        className="pr-2 pl-0"
                    /> */}
                    {/* about
                </a> */}

                <a href="https://github.com/duggalr/code-companion" className="p-2.5 pr-4 text-black font-normal dark:text-gray-300 text-[14px]">
                    {/* <FontAwesomeIcon 
                        icon={faGithub}
                        size="sm"
                        className="pr-2 pl-0"
                    /> */}
                    github
                </a>

                {/* <a href="#" className="p-2.5 text-black dark:text-gray-400">
                    Link 2
                </a> */}
                <ThemeToggle />
            </div>
        </ul>

    );

}