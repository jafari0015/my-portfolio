"use client"; 
import { FC } from "react";
import { Link } from "react-scroll";
const Contact: FC = () => {
  return (
    <div>
      <Link to="contact" smooth={true} duration={1000}>
        <button className="px-4 rounded-md py-[9px]  sm:px-7 sm:py-3 border-[1px] dark:border-[#c8f31d] font-semibold 
                         border-green-700 dark:text-stone-50 text-base text-stone-950">
          Get in touch
        </button>
      </Link>
    </div>
  );
};

export default Contact;
