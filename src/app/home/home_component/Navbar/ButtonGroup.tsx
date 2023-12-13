import React from "react";
import '../../../tailwind.css'

const ButtonGroup = ({ white, blue, ctaText, url }: any) => {
  const buttonClass = white
    ? "w-[120px] py-[14px] rounded-lg flex justify-center bg-white text-black border-[#D0D4EB] border-2"
    : blue
    ? "w-[120px] py-[14px] rounded-lg flex justify-center bg-[#5D70F9] text-white border-[#5D70F9]"
    : "";

  return (
    <div className="flex gap-4">
      <a className={buttonClass} href={url}>
        {ctaText}
      </a>
    </div>
  );
};

export default ButtonGroup;
