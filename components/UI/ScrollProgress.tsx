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
      className={`progress-wrap ${isActive ? "active-progress" : ""}`}
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "60px",
        height: "60px",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      <svg
        className="progress-circle"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          ref={pathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          stroke="#4ade80" 
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default ScrollProgress;
