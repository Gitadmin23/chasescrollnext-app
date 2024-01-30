"use client"
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation'

// import logo from "../assets/logo.png"; 
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import ButtonGroup from "../home_component/Navbar/ButtonGroup";

const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const location = useLocation(); 
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [pathname, setPathname] = useState(window?.location?.pathname);  

  const clickHandler = (item: string) => {
    router.push(item)
    setPathname(item)
    onClose()
  }

  useEffect(() => {
    setPathname(window?.location?.pathname)
  }, [router])

  return (
    <div className=" sticky z-50 top-0 w-full mx-auto max-w-[1440px] bg-white border-b-2">
      <div className="px-4 xl:px-0 max-w-[1200px] w-full mx-auto py-5 flex gap-8 justify-between items-center">
        <div role="button" onClick={() => router.push("/")} className="flex flex-row gap-1 max-w-[197px] w-full items-center">
          <img className="max-w-[60px] w-full" src={"/assets/logo.png"} alt="logo" />
          <p className="text-2xl font-normal w-full">Chasescroll</p>
        </div>

        <div className="hidden text-[15px] lg:flex justify-between max-w-[534px] w-full">

          <p role={"button"} onClick={() => clickHandler("/")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Event</p>
          <p role={"button"} onClick={() => clickHandler("/home")} className={` ${pathname === "/home" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Home</p>
          <p role={"button"} onClick={() => clickHandler("/home/about")} className={` ${pathname === "/home/about" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >About us</p>
          <p role={"button"} onClick={() => clickHandler("/home/privacy_poilcy")} className={` ${pathname === "/home/privacy_poilcy" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Policy</p>
          <p role={"button"} onClick={() => clickHandler("/home/terms")} className={` ${pathname === "/home/terms" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Terms & Condition</p>
          <p role={"button"} onClick={() => clickHandler("/home/contact")} className={` ${pathname === "/home/contact" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Contact us</p>
          
        </div>
        <div className="hidden lg:flex gap-4">
          <ButtonGroup white ctaText="Login" url={"/auth"} />
          <ButtonGroup blue ctaText="Get Started" url={"/auth/signup"} />
        </div>
        {/* Hamburger Menu */}
        <div className="flex lg:hidden">
          <div className="lg:hidden flex items-center">
            <button
              onClick={onOpen}
              className="p-3 z-50 focus:outline-none"
            >
              {isMenuVisible ? (
                <Icon
                  className="text-2xl text-[#5D70F9]"
                  icon="line-md:menu-to-close-transition"
                />
              ) : (
                <Icon className="text-2xl" icon="mdi:hamburger-menu" />
              )}
            </button>
          </div>
          <Drawer
            isOpen={isOpen}
            placement='right'
            size={"sm"}
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent bg={"white"} >
              <DrawerCloseButton />

              <DrawerBody >
                <ul className="mt-20 flex flex-col items-center justify-start w-full gap-8 text-lg">

                  <p role={"button"} onClick={() => clickHandler("/")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Event</p>
                  <p role={"button"} onClick={() => clickHandler("/home")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Home</p>
                  <p role={"button"} onClick={() => clickHandler("/home/about")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >About us</p>
                  <p role={"button"} onClick={() => clickHandler("/home/privacy_poilcy")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Policy</p>
                  <p role={"button"} onClick={() => clickHandler("/home/terms")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Terms & Condition</p>
                  <p role={"button"} onClick={() => clickHandler("/home/contact")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Contact us</p>

                </ul>
              </DrawerBody>

              <DrawerFooter gap={"5"} >
                <ButtonGroup white
                  onClick={onClose} ctaText="Login" url={"/auth"} />
                <ButtonGroup blue
                  onClick={onClose} ctaText="Get Started" url={"/auth/signup"} />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
