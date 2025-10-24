import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem('darkMode', isDark.toString());
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="
        relative w-14 h-7 rounded-full transition-all duration-300
        bg-macos-border dark:bg-macos-blue
        hover:bg-macos-border-light dark:hover:bg-macos-blue-hover
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-macos-blue focus:ring-offset-2
        dark:focus:ring-offset-macos-dark-bg
      "
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Toggle circle */}
      <div
        className={`
          absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md
          transition-all duration-300 ease-in-out
          flex items-center justify-center
          ${isDark ? 'translate-x-7' : 'translate-x-0.5'}
        `}
      >
        {/* Icon */}
        {isDark ? (
          // Moon icon
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-macos-blue"
          >
            <path
              d="M13 7.5C12.5 10 10 12.5 7 13C10.5 13 13.5 10 13.5 6.5C13.5 4.5 12.5 2.5 11 1.5C12 3 13 5 13 7.5Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          // Sun icon
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-macos-yellow"
          >
            <circle cx="7" cy="7" r="3" fill="currentColor" />
            <path
              d="M7 0V2M7 12V14M14 7H12M2 7H0M11.5 11.5L10 10M4 4L2.5 2.5M11.5 2.5L10 4M4 10L2.5 11.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
