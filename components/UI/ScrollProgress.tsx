"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollProgress: React.FC = () => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = length - (scrollTop * length) / scrollHeight;

      path.style.strokeDashoffset = `${progress}`;
      setIsActive(scrollTop > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-[30px] right-[30px] w-[30px] h-[30px] md:w-[40px] md:h-[40px] cursor-pointer z-50"
    >
      <svg
        className="w-full h-full absolute top-0 left-0 stroke-green-800 dark:stroke-[#c8f31d]"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          ref={pathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {isActive && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             text-green-700 dark:text-[#c8f31d] text-2xl pointer-events-none"
        >
          <MdKeyboardArrowUp className="w-5 md:w-10" />
        </div>
      )}
    </div>
  );
};

export default ScrollProgress;
