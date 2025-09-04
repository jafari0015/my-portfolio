"use client";

import React, { useState, useEffect } from "react";

const AboutMe: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = `1 // Hi there
2 const name = "Mahdi Jafari";
3 const role = "Frontend Developer";
4 
5 function introduceMyself() {
6  console.log("Hello! I'm " + name);
7  console.log("I build Web application and Mobile APP");
8 }
9 
10 introduceMyself();`;

  useEffect(() => {
    let index = 0;

    const type = () => {
      setText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          index = 0;
          setText("");
          interval = setInterval(type, 50);
        }, 3000);
      }
    };

    let interval = setInterval(type, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="backImage lightBackImage dark:text-[#c8f31d] text-green-700 font-mono p-8 md:max-w-full rounded-xl 
                    max-w-xl  shadow-lg mx-auto border-[1px] dark:border-stone-700 
                          border-stone-400 mt-10 xl:mt-0"
    >
      <pre className="text-[10px] leading-4 -ml-2 sm:text-base">{text}</pre>
    </div>
  );
};

export default AboutMe;
