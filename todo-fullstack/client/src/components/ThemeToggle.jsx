import React from 'react';

export default function ThemeToggle({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:opacity-80 transition-all text-sm font-medium flex items-center gap-2"
      aria-label="Toggle theme"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}