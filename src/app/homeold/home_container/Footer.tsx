"use client"
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Icon } from "@iconify/react"; 
import Link from "next/link";
import { useRouter } from "next/router";
import '../../tailwind.css'
import CopyRightText from "@/components/sharedComponent/CopyRightText";
import { Text } from "@chakra-ui/react";

const Footer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [pathname, setPathname] = useState("");
  // const router = useRouter()

  const handleMenuToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleToggleEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };
  
  const isActive = (path: any) => {
    return location.pathname === path;
  };

  // const getNavLinkClassName = (path: any, transparent: any, isScrolled: any) => {
  //   let className = "";

  //   if (isActive(path)) {
  //     className += "w-auto text-chaseBlue";
  //     if (transparent && !isScrolled) {
  //       className += " text-white";
  //     }
  //   } else {
  //     className += "text-black hover:text-bienPrimary";
  //     if (transparent && !isScrolled) {
  //       className += " text-white";
  //     }
  //   }

  //   return className;
  // };



  const getNavLinkClassName = (path: any, transparent: any, isScrolled: any) => {
    let className = "";

    if (pathname === path) {
      className += "w-auto text-[#5D70F9] font-semibold ";
      if (transparent && !isScrolled) {
        className += " text-white";
      }
    } else {
      className += "text-white hover:text-[#5D70F9]";
      if (transparent && !isScrolled) {
        className += " text-white";
      }
    }

    return className;
  };

  // const CustomLink = ({ path, transparent, isScrolled, children }) => {
  //   const className = getNavLinkClassName(path, transparent, isScrolled);

  //   return (
  //     <NavLink to={path} className={className} activeClassName="text-red-500">
  //       {children}
  //     </NavLink>
  //   );
  // };

  const CustomLink = (props : any) => {
    const className = getNavLinkClassName(props.path, props.transparent, props.isScrolled);
    const handleClick = () => { 
      setPathname(props.path)
    };
    return (
      <Link
        href={props.path}

        onClick={handleClick}
        className={className}
        // activeClassName="text-red-500" 
      >
        {props.children}
      </Link>
    );
  };

  useEffect(()=> {
    setPathname(window.location.pathname)
  }, [pathname])
  
  return (
    <div className="bg-black pt-20 pb-6 text-white flex flex-col items-center w-full justify-center">
      <div className="max-w-[1200px] w-full flex flex-col lg:flex-row gap-4 gap-y-14 items-center lg:justify-between">
        <div className="flex flex-col lg:justify-evenly gap-8 w-full max-w-[534px]">
          <div className="flex flex-row gap-1 self-center lg:self-start w-fit items-center">
            <img className="max-w-[60px] w-full" src={"/assets/logo.png"} alt="logo" />
            <p className="text-3xl lg:text-5xl font-bold w-full">Chasescroll</p>
          </div>

          <div className="flex justify-between lg:flex-row flex-col gap-4 lg:px-0 px-6 w-full">
            <CustomLink path="/home" transparent={false} isScrolled={false}>
              Home
            </CustomLink> 
            <CustomLink path="/home/about" transparent={false} isScrolled={false}>
              About us
            </CustomLink>
            <CustomLink path="/home/privacy-poilcy" transparent={false} isScrolled={false}>
              Policy
            </CustomLink>
            <CustomLink path="/home/terms" transparent={false} isScrolled={false}>
              Terms & Condition
            </CustomLink>
            <CustomLink path="/home/contact" transparent={false} isScrolled={false}>
              Contact us
            </CustomLink>
          </div>
        </div> 
      </div>
      <hr className="w-full mt-14 mb-8 border-b-1 border-white" />
      <div className="max-w-[1200px] w-full flex lg:flex-row flex-col-reverse items-center  "> 
        <p className=" lg:absolute inset-auto text-white lg:mt-0 mt-8 " > 
          <CopyRightText />
        </p>
        <div className="flex gap-[35px] w-full justify-center lg:justify-end">
          <a target="_blank" href="https://twitter.com/chasescroll">
            <Icon className="text-[35px]" icon="mdi:twitter" color="white" />
          </a>
          <a target="_blank" href=" https://www.facebook.com/chase.scroll/ ">
            <Icon
              className="text-[35px]"
              icon="ic:baseline-facebook"
              color="white"
            />
          </a>
          <a target="_blank" href=" https://www.linkedin.com/company/chasescroll/">
            <Icon className="text-[35px]" icon="mdi:linkedin" color="white" />
          </a>
          <a target="_blank" href="  https://www.instagram.com/chasescroll_/  ">
            <Icon
              className="text-[35px]"
              icon="ri:instagram-fill"
              color="white"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
