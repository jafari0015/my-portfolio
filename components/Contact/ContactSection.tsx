import React from "react";
import ContactPlatform from "./ContactPlatform";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
interface IconType {
  title: string;
  icon: string;
  text: string;
  target: string;
  link: string;
}
interface ContactSectionProps {
  iconsPlatform: IconType[];
}

const ContactSection: React.FC<ContactSectionProps> = ({ iconsPlatform }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <section id="contact" className="mt-20">
        <p className="dark:text-stone-100 text-stone-900 max-w-[600px] xl:ml-6 mt-14 font-sans">
          Whether you want to discuss project cooperation, technical
          consultation, or simply want to exchange technical topics, please feel
          free to contact me at any time.
        </p>
        <div className=" lg:flex items-center justify-around lg:gap-5 xl:gap-10 ">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ContactPlatform iconsPlatform={iconsPlatform} />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
