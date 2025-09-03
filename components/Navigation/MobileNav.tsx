"use client";

import React, { useState, useEffect, memo } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FiX } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoGlobeOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import { GoWorkflow } from "react-icons/go";
import { PiBookOpenText } from "react-icons/pi";
import { FaRegMessage } from "react-icons/fa6";
import ToggleButton from "@/components/Navigation/DesktopNav";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const MobileNavbar: React.FC = memo(() => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { id: "home", label: "Front Page", icon: <IoGlobeOutline /> },
    { id: "about", label: "About", icon: <FaCode /> },
    { id: "work", label: "Work", icon: <GoWorkflow /> },
    { id: "article", label: "Article", icon: <PiBookOpenText /> },
    { id: "contact", label: "Contact", icon: <FaRegMessage /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sm:hidden fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        navScrolled ? "dark:bg-stone-900/5  backdrop-blur-lg bg-stone-200" : "bg-transparent"
      }`}
    >

      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex  dark:text-stone-100 text-xl font-medium mt-5 tracking-widest cursor-pointer transition-all duration-1000">
          <ScrollLink to="home" smooth duration={700}>
            MAHDI
          </ScrollLink>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-stone-800 dark:text-gray-100"
        >
          {isOpen ? <FiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 w-full bg-neutral-200/10 dark:bg-stone-900/5 backdrop-blur-lg border-b-2 dark:border-[#c8f31d] border-green-700 shadow-lg transform transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute top-4 left-4">
          <ToggleButton />
        </div>
        <FiX
          onClick={() => setIsOpen(false)}
          className="text-3xl absolute right-4 top-4 dark:text-stone-50 text-stone-900 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-6 py-8">
          {navItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              smooth
              duration={700}
              spy
              onSetActive={() => setActive(item.id)}
              onClick={() => setIsOpen(false)}
              className={`transition-all duration-300 z-10 ${
                active === item.id
                  ? "drop-shadow-[0_0_10px_#15803d] dark:drop-shadow-[0_0_10px_#c8f31d] text-green-700 dark:text-[#c8f31d]"
                  : "text-stone-900 dark:text-gray-400"
              } hover:drop-shadow-[0_0_10px_#15803d] dark:hover:drop-shadow-[0_0_10px_#c8f31d] hover:dark:text-[#c8f31d]`}
            >
              <div className="flex items-center justify-center gap-4">
                {item.icon}
                {item.label}
              </div>
            </ScrollLink>
          ))}
        </div>
      </div>
    </nav>
  );
});

MobileNavbar.displayName = "MobileNavbar";

export default MobileNavbar;
