import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check if the user has a preferred theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    // dark:bg-gray-800
    <button
      onClick={toggleTheme}
      className="pt-0 pr-4 rounded-full text-gray-900 dark:text-gray-100 focus:outline-none transition-colors duration-300"
    >
      <FontAwesomeIcon
        icon={faMoon}
        size="md"
        className={theme === 'light' ? 'text-gray-900' : 'text-white'}
      />
    </button>
  );
}