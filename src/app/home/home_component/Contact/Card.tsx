import { CONTACT_CARDS } from "@/constants";
import React from "react"; 
import '../../../tailwind.css'

const Card = () => {
  return (
    <div className=" flex flex-wrap gap-28 justify-center ">
      {CONTACT_CARDS.map((item: any, index: number) => (
        <div className="flex flex-col items-center gap-5 text-center max-w-[284px] w-full ">
          <img src={item.icon} alt={item.text} />
          <p className=" text-xl font-semibold " >{item.title}</p>
          <h4 className="inter text-[#667085] " >{item.text}</h4>
          <div className=" flex flex-col gap-3 " >
            {item?.firstlabel && (
              <p className=" font-bold max-w-[210px] inter text-base text-[#101828B2] " >{item?.firstlabel}</p>
            )}
            {item.first && (
              <p className=" font-bold max-w-[210px] inter text-base text-[#101828B2] " >{item.first}</p>
            )}
            {item?.secondlabel && (
              <p className=" font-bold max-w-[210px] mt-3 inter text-base text-[#101828B2] " >{item?.secondlabel}</p>
            )}
            <p className=" font-bold max-w-[210px] inter text-base text-[#101828B2] " >{item.link}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
