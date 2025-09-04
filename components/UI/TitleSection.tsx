import React from "react";

interface TitleSectionProps {
  title: string;
  text: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title, text }) => {
  return (
    <div>
      <h1 className="text-stone-900 dark:text-stone-100 flex items-center  justify-center sm:justify-start sm:pl-8 text-2xl  sm:text-start sm:text-4xl gap-2 mt-20 mb-10 font-bold">
        {title}
        <span className="dark:text-[#c8f31d] text-green-700">{text}</span>
      </h1>
    </div>
  );
};

export default TitleSection;
