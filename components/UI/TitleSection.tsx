import React from "react";

interface TitleSectionProps {
  title: string;
  text: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title, text }) => {
  return (
    <div>
      <h1 className="text-stone-900 dark:text-stone-100 text-center sm:text-start text-4xl flex gap-2 mt-20 mb-10 font-bold">
        {title}
        <span className="dark:text-[#c8f31d] text-green-700">{text}</span>
      </h1>
    </div>
  );
};

export default TitleSection;
