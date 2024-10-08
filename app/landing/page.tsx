"use client";
import HeroNavBar from '../components/Hero/HeroNavBar';
import HeroPrimary from '../components/Hero/HeroPrimary';

export default function Home() {
    return (
        <div>
            <HeroNavBar />
            <HeroPrimary />
        </div>
    );
}

// "use client";  // Add this at the top
// import { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button"


// export default function LandingPage() {

//     useEffect(() => {}, []);

//     return (
        
//         // <div>
//         //     <h1>Welcome to the Testing Page!</h1>
//         //     <p>This is a different route from the homepage.</p>
//         //     <Button>Click me</Button>
//         //     <Button variant="secondary">Secondary</Button>
//         //     <Button variant="destructive">Destructive</Button>
//         // </div>

//         <section className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-4">
//             <div className="max-w-4xl mx-auto text-center">
//                 <h1 className="text-5xl font-bold text-gray-900">
//                 Elevate Your Coding Experience
//                 </h1>
//                 <p className="mt-6 text-xl text-gray-600">
//                 Code Companion: Your personal AI tutor to help you code smarter and faster.
//                 </p>
//                 {/* <Button className="mt-8 px-6 py-3 text-lg font-semibold" >
//                 Get Started
//                 </Button> */}
//             </div>
//         </section>

//     );

// }