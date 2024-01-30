import React, { useEffect } from "react"; 
import { Icon } from "@iconify/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MAIN } from "@/constants";
import '../../../tailwind.css'

const Main = () => {
  const getLastWord = (string: any) => {
    const words = string.split(" ");
    return words[words.length - 1];
  };

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
      {MAIN.map((item: any, index: number) => {
        // const lastWord = getLastWord(item.title);
        const words = item.title.split(" ");
        const subtext = item.text.split(" ");

        return (
          <div
            key={index}
            className={`flex  items-center  gap-x-11  w-full  gap-y-10 lg:justify-between text-xl ${
              index % 2 === 1
                ? " flex-col lg:flex-row-reverse"
                : "flex-col lg:flex-row"
            }`}
          >
            <div className=" max-w-[500px] lg:max-w-[666px] w-full">
              <img
                data-aos="fade-up"
                className="object-cover w-full"
                src={item.img}
                alt={item.img}
              />
            </div>
            <div className=" max-w-[700px] text-center items-center lg:items-start lg:text-left flex flex-col gap-4 lg:gap-8 w-full">
              <h3 className="text-3xl lg:text-4xl font-bold ">
                {words.map((word: any, wordIndex: number) => (
                  <span key={wordIndex}>
                    {wordIndex === words.length - 1 ? (
                      <span className="text-chaseBlue">{word}</span>
                    ) : (
                      <>{word} </>
                    )}
                  </span>
                ))}
              </h3>
              <p className={` text-center text-[#4B4E61] lg:text-left w-full ${item.textWidth} `}  >
                {subtext.map((word: any, wordIndex: number) => (
                  <span key={wordIndex}>
                    { (word === "Create,") ? (
                      <><br/><br/>{word} </>
                    ) :(word === "events" || word === "secure") ? (
                      <span className="font-bold">{word} </span>
                    ): (
                      <>{word} </>
                    )}
                  </span>
                ))}  
              </p>
              <div className=" flex flex-col gap-y-4 w-fit lg:gap-y-6 ">
                {item.bullets.map((points: any, index: number) => (
                  <div key={index} className="flex items-center  gap-3">
                    <div className=" w-fit " >
                      <Icon
                        icon="icon-park-solid:check-one"
                        color="#12BC42"
                        width="24"
                        height="24"
                      />
                    </div>
                    <p className=" text-xl text-left " >{points}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
