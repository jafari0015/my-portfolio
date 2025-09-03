"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ToggleButton from "../Dark-Light/ToggleButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-6 pb-4 sm:mt-4  -mt-16 flex justify-between items-center bg-transparent">
      <h1 className="text-2xl font-bold text-stone-800 dark:text-white">
        MAHDI
      </h1>

      <ul className="hidden md:flex gap-6">
        {["Front Page", "About", "Work", "Blog", "Contact"].map((item, idx) => (
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

      {isOpen && (
        <div className="absolute mt-20 left-0 w-full bg-white dark:bg-stone-900/10 backdrop-blur-lg border dark:border-b-[#c5f31d] 
                      border-b-green-700  shadow-md md:hidden z-50">
          <div className="absolute top-4 left-4">
            <ToggleButton />
          </div>
          <FiX
            onClick={() => setIsOpen(false)}
            className="text-3xl absolute right-4 top-4 dark:text-stone-50 text-stone-900 cursor-pointer"
          />
          <ul className="flex flex-col items-center gap-4 py-6">
            {["Front Page", "About", "Work", "Blog", "Contact"].map(
              (item, idx) => (
                <li key={idx}>
                  <Link
                    href="/"
                    className="block text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] font-semibold hover:text-green-700 transition-all duration-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
