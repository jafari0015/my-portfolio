"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ToggleButton from "../Dark-Light/ToggleButton";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Slide-in menu variants
  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", when: "beforeChildren", staggerChildren: 0.1 },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Individual menu item variants
  const menuItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  // Backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const menuItems = ["Front Page", "About", "Work", "Blog", "Contact"];

  return (
    <nav className="w-full pb-4 sm:mt-4 -mt-24 flex justify-between items-center bg-transparent relative z-50">
      <h1 className="text-2xl font-bold text-stone-800 dark:text-white">MAHDI</h1>

      <ul className="hidden md:flex gap-6">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href="/"
              className="text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] font-semibold hover:text-green-700 transition-all duration-500"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <button
        className="md:hidden text-3xl text-stone-800 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <HiOutlineMenuAlt3 />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black dark:bg-stone-900 z-40"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-stone-900/90 backdrop-blur-lg border-l border-stone-200 dark:border-[#c5f31d] shadow-md z-50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
            >
              <div className="absolute top-4 left-4">
                <ToggleButton />
              </div>
              <FiX
                onClick={() => setIsOpen(false)}
                className="text-3xl absolute right-4 top-4 dark:text-stone-50 text-stone-900 cursor-pointer"
              />
              <motion.ul className="flex flex-col items-center justify-start gap-4 py-20">
                {menuItems.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={menuItemVariants}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      href="/"
                      className="block text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] font-semibold hover:text-green-700 transition-all duration-500"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
