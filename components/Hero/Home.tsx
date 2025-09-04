import React from "react";
import ResumeButton from "../UI/ResiumeButton";
import ContactButton from "../UI/ContactButton";
import { motion } from "framer-motion";
const Home: React.FC = () => {
  return (
    <div>
      <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-lg rounded-full bg-stone-900/5 dark:bg-white/10">
        <span className="w-2 h-2 rounded-full bg-green-700 dark:bg-[#c8f31d] animate-pulse" />
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
        <div className="hidden sm:flex mt-6 max-w-4xl flex-col sm:text-2xl md:text-3xl lg:text-4xl xl:text-[53px] font-semibold leading-relaxed text-stone-900 dark:text-stone-50">
          <motion.div
            className="dark:text-[#c8f31d] text-green-700 mt-5 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Mahdi Jafari,
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            a passionate{" "}
            <span className="relative inline-block">
              <motion.span
                className="border-b-4 border-green-800 dark:border-[#c8f31d]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 2 }}
                transition={{ duration: 2, delay: 2 }}
              >
                Front-end Developer
              </motion.span>
            </span>
          </motion.div>

          <motion.div
            className="text-lg md:text-xl text-stone-700 dark:text-stone-300 mt-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            crafting code, learning daily, growing constantly.
          </motion.div>
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
