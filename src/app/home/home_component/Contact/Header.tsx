import React from "react";
import Card from "./Card";
import { Icon } from "@iconify/react";
import '../../../tailwind.css'

const Header = () => {
  return (
    <div className=" flex flex-col mb-32 gap-16 w-full">
      <div className=" flex flex-col gap-6 w-full text-center">
        <p className=" text-base font-bold ">Contact us</p>
        <h3 className=" text-3xl lg:text-[54px] font-bold ">
          We’d love to hear from <span className=" text-chaseBlue ">you</span>{" "}
        </h3>
        <p className=" text-xl font-normal text-[#667085] ">
          Our friendly team is always here to chat.
        </p>
      </div>
      <div>
        <Card />
      </div>
      <div className="text-center flex flex-col gap-[30px] py-[64px] bg-[#F8F9FC] ">
        <h3 className=" text-3xl lg:text-[54px] font-bold ">
          More ways to stay <span className=" text-chaseBlue ">connected</span>{" "}
        </h3>
        <p className=" text-[30px] text-[#101828B2] ">
          Meet the teams behind our products and explore our vision for the
          future.
        </p>
        <div className=" flex justify-center gap-1 items-center text-chaseBlue ">
          <p className=" text-xl font-medium "> Get started</p>
          <Icon icon="ph:arrow-circle-right-light" color="#3c41f0" />
        </div>
      </div>
    </div>
  );
};

export default Header;
