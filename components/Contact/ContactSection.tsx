import React from "react";
import ContactPlatform from "./ContactPlatform";
import ContactForm from "./ContactForm";

interface IconType {
  title: string;
  icon: string;
  text: string;
  target : string;
  link: string;
};
interface ContactSectionProps {
  iconsPlatform : IconType[];
};

const ContactSection: React.FC<ContactSectionProps> = ({iconsPlatform}) => {
  return (
    <>
      <section id="contact" className="mt-20">
        <p className="dark:text-stone-100 text-stone-900 max-w-[600px] mt-14 font-sans">
          Whether you want to discuss project cooperation, technical
          consultation, or simply want to exchange technical topics, please feel
          free to contact me at any time.
        </p>
        <div className=" lg:flex items-center justify-around lg:gap-5 xl:gap-10 2xl:gap-32">
            <ContactPlatform  iconsPlatform={iconsPlatform}/>
            <ContactForm />
        </div>
      </section>
    </>
  );
};

export default ContactSection;
