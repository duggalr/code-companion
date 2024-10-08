import ShimmerButton from "@/components/ui/shimmer-button";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import SparklesText from "@/components/ui/sparkles-text";
// import { BackgroundBeams } from "../ui/background-beams";
// import RetroGrid from "@/components/ui/retro-grid";
// import { WavyBackground } from "../ui/wavy-background";
import { BackgroundLines } from "../ui/background-lines";


export default function HeroPrimary() {
  return (
    
    // bg-gray-50
    <section className="min-h-screen flex flex-col items-center py-16 px-4">

        {/* <BackgroundBeams /> */}

        {/* <RetroGrid /> */}
        
        {/* <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Sanjana Airlines, <br /> Sajana Textiles.
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Get the best advices from our experts, including expert artists,
            painters, marathon enthusiasts and RDX, totally free.
        </p>
        </BackgroundLines> */}

        <div className="max-w-4xl mx-auto text-center mt-0"> {/* Added margin to avoid overlap with Navbar */}
            
            {/* TODO: test */}
            {/* <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Join the waitlist
                </h1>
                <p></p>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                Welcome to MailJet, the best transactional email service on the web.
                We provide reliable, scalable, and customizable email solutions for
                your business. Whether you&apos;re sending order confirmations,
                password reset emails, or promotional campaigns, MailJet has got you
                covered.
                </p>
                <input
                type="text"
                placeholder="hi@manuarora.in"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
                />
            </div> */}
            
            {/* <h1 className="scroll-m-20 text-[49px] font-bold tracking-tight mt-0">
                Online REPL with an AI Tutor
            </h1> */}
            {/* <SparklesText text="Online REPL with an AI Tutor" /> */}

            {/* <BackgroundLines className="flex items-center justify-center w-full flex-col px-4"> */}

            <BackgroundLines>
                <h1 className="scroll-m-20 text-[49px] font-bold tracking-tight mt-0">
                    Online REPL with an AI Tutor
                </h1>
            </BackgroundLines>
            {/* </BackgroundLines> */}

            <p className="text-[21px] text-muted-foreground pt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet nulla mauris.
            </p>

            <div className="mt-6 flex items-center justify-center">
                <ShimmerButton className="shadow-2xl">
                    <span
                    className="whitespace-pre-wrap text-center text-base font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10"
                    >
                    Visit IDE &nbsp; &#8594;
                    </span>
                </ShimmerButton>
            </div>

            <div className="relative mt-8">
                <HeroVideoDialog
                    className="dark:hidden block"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video"
                />
                <HeroVideoDialog
                    className="hidden dark:block"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                />
            </div>

        </div>

    </section>
    
  );
}
