"use client"
import React, { useEffect } from "react"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { ABOUT_MAIN } from "@/constants";
import '../../../tailwind.css'

const Main = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration in milliseconds
      delay: 200, // Delay between animations in milliseconds
      once: true, // Whether to animate elements only once
    });
    AOS.refresh();
  }, []);
  return (
    <div className="mt-32 flex flex-col gap-y-[100px] lg:gap-y-[180px]">
      {/* FORMER DESIGN */} 
      <div className=" flex flex-col gap-20 lg:gap-40 items-center text-center  ">
        {ABOUT_MAIN.map((item: any, index: number) => (
          <div
            className="max-w-[887px] w-full flex flex-col gap-4 justify-center"
            key={item.id}
          >
            <h5 className=" font-bold text-2xl">{item.tag}</h5>
            <h3 className=" text-3xl lg:text-4xl text-chaseBlue font-bold">{item.title}</h3>
            <p className="text-[22px] text-[#4B4E61] ">
              {index === 0 ? (
                <>
                  {item.text.split(" ").map((word: any, wordIndex: number) => (
                    <span key={wordIndex}>
                      {wordIndex === 1 ? (
                        <span className="font-bold">{word} </span>
                      ) : (
                        <>{word} </>
                      )}
                    </span>
                  ))}
                </>
              ) : (
                item.text
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
