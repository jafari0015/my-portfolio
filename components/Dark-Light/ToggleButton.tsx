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

        // change theme in the middle of the animation
        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }, 300);

        // stop animation after it's done
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-stone-50"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-stone-950"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <circle cx="12" cy="12" r="4"></circle>
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

            {/* Custom animation */}
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
