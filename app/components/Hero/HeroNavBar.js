// import { Button } from 'shadcdn';
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "../Utils/ThemeToggle";
import SparklesText from "@/components/ui/sparkles-text";

export default function HeroNavBar() {
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

                <h1 className="scroll-m-20 text-[19px] font-semibold tracking-tight">
                    Code Companion
                </h1>
                {/* <SparklesText text="Code Companion" /> */}

                {/* Right - Links */}
                <div className="flex space-x-10">
                    <a
                        href=""
                        className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                        about
                    </a>
                    <a
                        href="https://github.com/duggalr/code-companion"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                        github
                    </a>
                    <ThemeToggle />
                </div>
            </div>

        </nav>
        
    );
}