import React from "react";
import '../../../tailwind.css'

const ButtonGroup = ({ white, blue, active, ctaText, url, whitesecond, bluesecond }: any) => {
  const buttonClass = white
    ? `w-full h-[44px] rounded-lg flex px-4 justify-center items-center leading-[20px] font-medium bg-white text-black border-[#D0D4EB] border-2`
    : whitesecond
    ? `w-[152px] h-[44px] rounded-lg flex px-4 justify-center items-center leading-[20px] font-medium bg-white text-black border-[#D0D4EB] border-2`
    : blue
    ? `w-full h-[44px] rounded-lg flex justify-center items-center leading-[20px] font-medium bg-[#5D70F9] text-white border-[#5D70F9] border-2`
    : bluesecond
    ? `w-[152px] h-[44px] rounded-lg flex justify-center items-center leading-[20px] font-medium bg-[#5D70F9] text-white border-[#5D70F9] border-2`
    : active
    ? `w-full h-[44px] rounded-lg flex justify-center items-center leading-[20px] font-medium bg-white text-[#5D70F9] border-[#5D70F9] border-2`
    : "";

  return (
    <div className={` w-full `}>
      <a className={buttonClass} href={url}>
        {ctaText}
      </a>
    </div>
  );
};

export default ButtonGroup;
