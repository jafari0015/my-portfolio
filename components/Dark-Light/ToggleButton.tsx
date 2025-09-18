"use client";
import React, { useState, useEffect } from "react";

const ToggleButton = () => {
    const [theme, setTheme] = useState("dark");
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleClick = () => {
        setAnimating(true);

        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }, 300);

        setTimeout(() => {
            setAnimating(false);
        }, 800);
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className="p-2 rounded-full transition-all duration-500 hover:scale-110 relative z-20 overflow-hidden"
            >
                {theme === "dark" ? (
                    // 🌙 Moon
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-moon text-yellow-300"
                    >
                        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                    </svg>
                ) : (
                    // ☀️ Sun
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-stone-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                )}
            </button>

            {/* Ripple overlay */}
            {animating && (
                <span
                    className={`fixed inset-0 z-10 rounded-full ${theme === "dark" ? "bg-stone-50" : "bg-stone-900"
                        } animate-[spread_0.8s_ease-out]`}
                />
            )}

            <style jsx>{`
        @keyframes spread {
          0% {
            transform: scale(0);
            opacity: 0.6;
            border-radius: 50%;
          }
          100% {
            transform: scale(5);
            opacity: 0;
            border-radius: 50%;
          }
        }
      `}</style>
        </div>
    );
};

export default ToggleButton;
