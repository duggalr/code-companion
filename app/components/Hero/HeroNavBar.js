// import { Button } from 'shadcdn';
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import ThemeToggle from "../Utils/ThemeToggle";
import { Pacifico } from 'next/font/google';

const pacifico_font = Pacifico({
    subsets: ['latin'],
    weight: ['400']
});


export default function HeroNavBar() {

    // const [theme, setTheme] = useState('light');
    // useEffect(() => {
    //   // Check localStorage to get the current theme
    //   const storedTheme = localStorage.getItem('theme') || 'light';
    //   setTheme(storedTheme);
    // }, []);
    // const imageSrc = theme === 'dark' ? '/code_two.png' : '/light_mode_image.png';

    return (

        <nav className="p-4 dark:bg-zinc-950">
            
            <div className="container mx-auto flex justify-between items-center">

                <h1 className={`${pacifico_font.className} scroll-m-20 text-[25px] font-normal tracking-widest flex items-center text-zinc-900 dark:text-gray-200`}>
                    {/* <FontAwesomeIcon
                        icon={faCode}
                        className="pr-3 text-[23px] dark:text-gray-200 w-[40px]"
                    /> */}
                    {/* <Image src={`/programming_one.png`} width="32" height="32" /> Code Companion */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8 pr-2 fill-zinc-900 dark:fill-white">
                        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
                    </svg>
                    Companion
                </h1>

                {/* Right - Links */}
                <div className="flex space-x-10">
                    {/* <a
                        href=""
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 text-sm"
                    >
                        about
                    </a> */}
                    <a
                        href="https://github.com/duggalr/code-companion"
                        target="_blank"
                        rel="noopener noreferrer"
                        // className="text-gray-600 hover:text-gray-800 dark:text-gray-300 text-sm"
                        className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 text-sm space-x-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" className="mr-1 fill-zinc-900 dark:fill-white">
                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                        </svg>
                        github
                    </a>
                    <ThemeToggle />
                </div>
            </div>

        </nav>
        
    );
}