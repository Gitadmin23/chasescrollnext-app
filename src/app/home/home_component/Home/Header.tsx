"use client"
import React, { useEffect } from "react"; 
import AOS from "aos";
import "aos/dist/aos.css";   

const Header = ({ data }: any) => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration in milliseconds
      delay: 200, // Delay between animations in milliseconds
      once: true, // Whether to animate elements only once
    });
    AOS.refresh();
  }, []);

  const handleToast = () => {
    // toast.info('Coming soon');
  }

  return (
    <>
      {data.map((item: any, index: number) => {
        const words = item.title.split(" ");
        const subtext = item.text.split(" "); 
        return (
          <div className=" w-full relative " >
            <div className=" flex flex-col lg:flex-row justify-between gap-y-4 items-center lg:items-center lg:py-4 w-full">
              <div className="w-full max-w-[648px] flex flex-col gap-9 text-center lg:text-left items-center lg:items-start ">
                <h1 className=" text-3xl lg:text-[54px] font-bold leading-[126.7%] ">
                  {words.map((word: any, wordIndex: number) => (
                    <span key={wordIndex}>
                      {wordIndex === words.length - item.position ? (
                        <span className="text-chaseBlue">{word}</span>
                      ) : (
                        <>{word} </>
                      )}{" "}
                    </span>
                  ))}
                </h1>
                <p className=" max-w-[478px] w-full text-lg text-[#4B4E61] leading-[145.7%] ">
                  {subtext.map((word: any, wordIndex: any) => (
                    <span key={wordIndex}>
                      {(word === "plan," || word === "organise," || word === "execute") ? (
                        <span className="text-chaseBlue font-bold ">{word}</span>
                      ) : (word === "Chasescroll") ? (
                        <span className=" font-bold ">{word}</span>
                      ) : (
                        <>{word} </>
                      )}{" "}
                    </span>
                  ))}
                  {/* {item.text} */}
                </p>
                <div className=" flex gap-[29px] ">
                  <a 
                  // target="_blank"
                  className=" cursor-pointer "
                    onClick={handleToast}
                  // href="https://play.google.com/store/apps/details?id=com.chasescroll_android_app&hl=en&gl=US"
                  >
                    <img src={"/assets/icons/google-play.svg"} alt="googlePlay" />
                  </a>
                  <a 
                  // target="_blank"
                  className=" cursor-pointer "
                    onClick={handleToast}
                    // href="https://apps.apple.com/us/app/chasescroll/id1619999225"
                  >
                    <img src={"/assets/icons/app-store.svg"} alt="appleStore" />
                  </a>
                </div>
              </div>
              <div data-aos="fade-up" className="w-full right-0 max-w-[500px] top-8 flex ">
                <img src={item.img} alt="" className=" w-full " />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Header;
