// import { Button } from 'shadcdn';
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import SparklesText from "@/components/ui/sparkles-text";
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
                {/* Left - Logo */}
                {/* <div className="text-lg font-bold"> */}
                {/* <Link href="/"> */}
                    {/* <a>Code Companion</a> */}
                {/* </Link> */}
                {/* </div> */}

                {/* <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Code Companion
                </h2> */}

                {/* <h1 className="scroll-m-20 text-[26px] font-semibold tracking-wider font-dancing text-sky-950">
                <Image src={`/programming_one.png`} width="32" height="32" /> Code Companion
                </h1> */}
                {/* <Image src={`/code_two.png`} width="22" height="22" alt="icon" className="mr-2" /> */}

                {/* pacifico_font, dancing_script_font */}

                {/* <h1 className="scroll-m-20 text-[27px] font-semibold tracking-wider font-caveat flex items-center text-zinc-900 dark:text-gray-200"> */}
                {/* font-semibold */}
                <h1 className={`${pacifico_font.className} scroll-m-20 text-[27px] font-normal tracking-widest flex items-center text-zinc-900 dark:text-gray-200`}>
                    {/* <FontAwesomeIcon
                        icon={faCode}
                        className="pr-3 text-[23px] dark:text-gray-200 w-[40px]"
                    /> */}

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8 pr-2 fill-zinc-900 dark:fill-white">
                        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
                    </svg>
                    Code Companion
                </h1>

                {/* <h1 className={`${dancing_script_font.className} scroll-m-20 text-[30px] font-semibold tracking-widest flex items-center text-zinc-900 dark:text-gray-200`}>
                    Code Companion
                </h1>
                <h1 className={`${pacifico_font.className} scroll-m-20 text-[30px] font-semibold tracking-widest flex items-center text-zinc-900 dark:text-gray-200`}>
                    Code Companion
                </h1>
                <h1 className={`${indie_flower_font.className} scroll-m-20 text-[30px] font-semibold tracking-widest flex items-center text-zinc-900 dark:text-gray-200`}>
                    Code Companion
                </h1> */}


                {/* TODO: finalize font here and proceed from there to finalizing all UI and on to functinoality */}
                {/* <p className={irish_grover_font.className}>Code Companion</p>
                <h1 className={dancing_script_font.className}>Code Companion</h1>
                <p className={caveat_font.className}>Code Companion</p> */}
                
                {/* <h2 className="font-dancing text-5xl font-bold uppercase">
                    Hello World!
                </h2> */}

                {/* <SparklesText text="Code Companion" /> */}

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
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 text-sm"
                    >
                        github
                    </a>
                    <ThemeToggle />
                </div>
            </div>

        </nav>
        
    );
}