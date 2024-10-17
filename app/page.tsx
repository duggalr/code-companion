"use client";  // Add this at the top
import { useEffect, useState } from 'react';
import HeroNavBar from './components/Hero/HeroNavBar';
import HeroPrimary from './components/Hero/HeroPrimary';

export default function Home() {

    const [theme, setTheme] = useState('light');

    useEffect(() => {}, []);

    return (
       
        <main>
            <HeroNavBar />
            <HeroPrimary />
        </main>

    );

}