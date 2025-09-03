import React from "react";
import ResumeButton from "../UI/ResiumeButton";
import ContactButton from "../UI/ContactButton";

const Home: React.FC = () => {
  return (
        <div>
          <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/20 dark:bg-white/10">
            <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-white/100 animate-pulse" />
            <span className="text-stone-800 dark:text-stone-100 font-semibold">
              Hello I am
            </span>
          </div>
          <div className="sm:hidden items-center mt-6 justify-between ">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/20 dark:bg-white/10">
              <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-white/100 animate-pulse" />
              <span className="text-stone-800 dark:text-stone-100 font-semibold">
                Hello I am
              </span>
            </div>
            <h4 className="dark:text-[#fff] text-stone-900 text-lg mt-3 ml-2">
              <span className="dark:text-[#c8f31d] text-green-700 font-bold">
                Mahdi Jafari
              </span>
              , A passionate front-end developer crafting coding, learning daily
              growing constantly.
            </h4>
          </div>
          <div>
            <div className="hidden sm:flex text-hello dark:text-stone-50 text-stone-900 mt-6 max-w-[600px] sm:text-2xl font-semibold md:text-2xl lg:text-4xl xl:text-5xl">
              <div className="hero-section leading-loose">
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block dark:text-[#c8f31d] mt-1 text-green-700">
                    Mahdi Jafari ,
                  </div>
                  <div>a passionate </div>
                </div>
                <span className="border-part border-[1px] border-solid mt-1 dark:border-[#c8f31d] border-green-800">
                  Front-end Developer
                  <i></i>
                </span>
                <span className="mt-2">crafting code, learning daily, growing constantly.</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-10 sm:mb-0 -ml-1 mt-6 sm:mt-14 gap-2 lg:gap-8">
            <ContactButton />
            <ResumeButton />
          </div>
        </div>
  );
};

export default Home;
