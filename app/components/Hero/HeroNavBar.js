// import { Button } from 'shadcdn';
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import SparklesText from "@/components/ui/sparkles-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import ThemeToggle from "../Utils/ThemeToggle";


// TODO: start here by finalizing the current UI (likely icons and favicon and images, etc...)
// proceed to adding all functionality

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

                {/* TODO: */}
                <h1 className="scroll-m-20 text-[27px] font-semibold tracking-wider font-caveat flex items-center text-zinc-900 dark:text-gray-200">
                    <FontAwesomeIcon
                        icon={faCode}
                        className="pr-3 text-[23px] dark:text-gray-200 w-[40px]"
                    />
                    Code Companion
                </h1>
                
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