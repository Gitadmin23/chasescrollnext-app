import React from "react";
import '../../../tailwind.css'

const ButtonGroup = ({ white, blue, ctaText, url }: any) => {
  const buttonClass = white
    ? "w-[152px] h-[44px] rounded-lg flex justify-center items-center leading-[20px] font-medium bg-white text-black border-[#D0D4EB] border-2"
    : blue
    ? "w-[152px] h-[44px] rounded-lg flex justify-center items-center leading-[20px] font-medium bg-[#5D70F9] text-white border-[#5D70F9] border-2"
    : "";

  return (
    <div className="">
      <a className={buttonClass} href={url}>
        {ctaText}
      </a>
    </div>
  );
};

export default ButtonGroup;
