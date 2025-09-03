import React, { memo } from 'react'
import profile from "@/public/profile_image/mahdi-jafari.jpg"
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { FaFacebookSquare } from "react-icons/fa";

interface SocialLinks {
    _id: string;
    icon: string;
    url: string;     
};
const ProfileCard = memo(function ProfileCard({socialLinks}: {socialLinks: SocialLinks[]}) {
    const iconsMap = { 
        FaLinkedinIn: <FaLinkedinIn />,
        FaGithub: <FaGithub />,
        SlSocialInstagram: <SlSocialInstagram />,
        FaFacebookSquare: <FaFacebookSquare />,
 };

    return (
        <div className='relative rounded-xl mt-20 sm:mt-0 xl:pr-10'>
            <div className='rounded-xl border-[1px] border-stone-400 dark:border-stone-700 
                            border-solid px-8 py-8 bg-transparent'>
                <div className='lg:w-64 md:w-52'>
                    <img src={profile.src} className='rounded-xl' alt="Mahdi Jafari" />
                </div>
                <div className='text-center mt-6 dark:text-[#fff] text-stone-900'>
                  <h3 className='text-xl font-semibold'>Mahdi Jafari </h3>
                  <p className='text-base uppercase dark:text-[#c8f31d] text-green-700'>Availabe for serverces </p>
                </div>

                <div className='flex items-center justify-center gap-2 mt-6 '>
                    {socialLinks.map((link) => (
                        <a
                            key={link._id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto  px-3 py-3 dark:text-stone-100  border-[1px] rounded-md dark:border-stone-700  border-stone-400 text-stone-800
                                     dark:hover:bg-white dark:hover:text-stone-950 transition-all cursor-pointer  duration-500 hover:scale-105 hover:bg-black hover:text-stone-50"                            >
                            {iconsMap[link.icon as keyof typeof iconsMap] && 
                            React.cloneElement(iconsMap[link.icon as keyof typeof iconsMap], { className: "pointer-events-none" })
                            }

                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
});
export default ProfileCard