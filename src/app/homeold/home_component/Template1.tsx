import React, { useEffect } from "react";
// import googlePlay from "../assets/icons/google-play.svg";
// import appleStore from "../assets/icons/app-store.svg";
// import img from "../assets/home-footer-img1.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Template1 = ({ containerClassName }: any) => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration in milliseconds
      delay: 200, // Delay between animations in milliseconds
      once: true, // Whether to animate elements only once
    });
    AOS.refresh();
  }, []);

  return (
    <div className={` rounded-[32px] py-8 lg:pb-0 lg:pl-8 justify-center flex items-center w-full ${containerClassName}`}>
      <div className="w-full lg:max-w-[566px] flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
        <h1 className=" text-3xl lg:text-[36px] font-bold leading-[126.7%]">
          <span className="text-chaseBlue">Chasescroll </span>
          Available for mobile and Desktop
        </h1>
        <p className="max-w-[400px] font-medium w-full text-lg leading-[145.7%]">
          Chasescroll Mobile available on all Mobile Stores and Desktop web
        </p>
        <div className="flex gap-[29px]">
          <a href="#">
            <img data-aos="fade-up" src={"/assets/icons/google-play.svg"} alt="googlePlay" />
          </a>
          <a href="#">
            <img data-aos="fade-up" src={"/assets/icons/app-store.svg"} alt="appleStore" />
          </a>
        </div>
      </div>
      <div className="hidden lg:flex h-full w-full">
        <img
          data-aos="fade-up"
          className="w-full object-contain"
          src={"/assets/home-footer-img1.png"}
          alt=""
        />
      </div>
    </div>
  );
};

export default Template1;
