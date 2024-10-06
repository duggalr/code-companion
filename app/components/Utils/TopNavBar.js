import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCircleInfo, faCode, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';


export default function TopNavBar () {

    useEffect(() => {}, []);

    return (

        // <ul
        // className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-700 dark:border-gray-700 dark:text-gray-400 bg-white dark:bg-neutral-900 pl-2 pr-4">
        <ul
            className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b-2 border-gray-300"
            // style={{ backgroundColor: "#F5F5F5" }}
            style={{ backgroundColor: "#F5F5F5" }}
        >
            <li>
                {/* className="inline-block pt-2.5 pl-2 rounded-t-lg text-[16px] text-black dark:text-gray-100 cursor-pointer tracking-normal" */}
                <a href="" className="inline-block pt-2.5 pl-2 pb-2 rounded-t-lg text-[16px] text-black cursor-pointer tracking-tight">
                    <FontAwesomeIcon
                        icon={faLaptopCode}
                        size="sm"
                        className="pr-1 pl-2"
                    />
                    Code Companion
                </a>
            </li>
            <div className="ml-auto flex items-center space-x-6">
                <a href="#" className="p-2.5 text-black font-normal dark:text-gray-400 text-[14px]">
                    {/* <FontAwesomeIcon
                        icon={faCircleInfo}
                        size="sm"
                        className="pr-1 pl-2"
                    /> */}
                    about
                </a>
                {/* <a href="#" className="p-2.5 text-black dark:text-gray-400">
                    Link 2
                </a> */}
                <ThemeToggle />
            </div>
        </ul>

    );

}