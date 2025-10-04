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
import { motion, AnimatePresence } from "framer-motion";
import ToggleButton from "@/components/Dark-Light/ToggleButton";

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

  const sidebarVariants: any = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <nav
      className={`sm:hidden fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        navScrolled ? "dark:bg-stone-950 bg-stone-200" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex dark:text-stone-100 text-xl font-medium  mt-5 tracking-widest cursor-pointer transition-all duration-1000">
          <ScrollLink to="home" smooth duration={700}>
            MAHDI
          </ScrollLink>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl text-stone-800 dark:text-gray-100"
        >
          <HiOutlineMenuAlt3 />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="sidebar"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed top-0 right-0 h-full w-72 bg-neutral-200 dark:bg-stone-950  shadow-xl z-50"
            >
              <div className="absolute top-3 right-12">
                <ToggleButton />
              </div>
              <FiX
                onClick={() => setIsOpen(false)}
                className="text-3xl absolute right-4 top-4 dark:text-stone-50 text-stone-900 cursor-pointer"
              />
              <div className="flex flex-col items-start gap-6 py-16 pl-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <ScrollLink
                      to={item.id}
                      smooth
                      duration={700}
                      spy
                      onSetActive={() => setActive(item.id)}
                      onClick={() => setIsOpen(false)}
                      className={`transition-all duration-300 ${
                        active === item.id
                          ? "drop-shadow-[0_0_10px_#15803d] dark:drop-shadow-[0_0_10px_#c8f31d] text-green-700 dark:text-[#c8f31d]"
                          : "text-stone-900 dark:text-gray-400"
                      } hover:drop-shadow-[0_0_10px_#15803d] dark:hover:drop-shadow-[0_0_10px_#c8f31d] hover:dark:text-[#c8f31d]`}
                    >
                      <div className="flex items-center gap-4 text-lg">
                        {item.icon}
                        {item.label}
                      </div>
                    </ScrollLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
});

MobileNavbar.displayName = "MobileNavbar";

export default MobileNavbar;
