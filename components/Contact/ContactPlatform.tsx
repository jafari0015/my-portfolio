import { RiGithubLine } from "react-icons/ri";
import { SlPhone } from "react-icons/sl";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import type { ReactElement } from "react";

interface IconType {
  title: string;
  icon: string;
  text: string;
  target: string;
  link: string;
}

interface IconsPlatformProps {
  iconsPlatform: IconType[];
}

const ContactPlatform: React.FC<IconsPlatformProps> = ({ iconsPlatform }) => {
  
  const iconMap: Record<string, ReactElement> = {
    CiMail: <CiMail />,
    SlPhone: <SlPhone />,
    CiLocationOn: <CiLocationOn />,
    RiGithubLine: <RiGithubLine />,
    FaInstagram: <FaInstagram />,
    FaLinkedinIn: <FaLinkedinIn />
  };

  return (
    <div className="backImage lightBackImage  p-6 rounded-2xl border-[1px] border-stone-300 lg:h-[360px] mt-10 dark:border-stone-700  lg:max-w-[650px] 2xl:max-w-[800px]">
      <h2 className="dark:text-stone-100 text-stone-900 text-2xl font-semibold text-center">
        Contact Via Platform 
      </h2>
      <div className="block sm:flex items-center justify-start py-4 lg:gap-6 xl:gap-12 md:gap-48 lg:mt-8 ">
        <div className="sm:grid sm:grid-cols-2  gap-x-6 sm:gap-y-2 gap-6 lg:gap-x-8">
          {iconsPlatform.map((item) => (
            <div className="flex items-center justify-start gap-4" key={item.title}>
              <div className="dark:text-stone-50 bg-transparent backdrop-blur-md text-2xl border-[1px] mt-3 dark:border-stone-700 px-2 rounded-lg py-2
                              dark:hover:text-stone-950 hover:scale-105 dark:hover:bg-white transition-all duration-500 cursor-pointer
                              border-stone-300 hover:bg-stone-900 hover:text-white">
                {iconMap[item.icon]}
              </div>
              <div>
                <h2 className="dark:text-stone-50 text-md font-semibold">{item.title}</h2>
                <p>
                  <a href={item.link} className="dark:text-neutral-300 text-sm">{item.text}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPlatform;
