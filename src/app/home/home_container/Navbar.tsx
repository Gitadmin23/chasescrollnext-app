"use client"
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation'

// import logo from "../assets/logo.png"; 
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import ButtonGroup from "../home_component/Navbar/ButtonGroup";
import { HambergerMenu } from "iconsax-react";

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

        <div className="hidden text-[15px] font-bold lg:flex justify-between max-w-[534px] w-full">

          <p role={"button"} onClick={() => clickHandler("/")} className={` ${pathname === "/" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Event</p>
          <p role={"button"} onClick={() => clickHandler("/home")} className={` ${pathname === "/home" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Home</p>
          <p role={"button"} onClick={() => clickHandler("/home/about")} className={` ${pathname === "/home/about" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >About us</p>
          <p role={"button"} onClick={() => clickHandler("/home/privacy_poilcy")} className={` ${pathname === "/home/privacy_poilcy" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Policy</p>
          <p role={"button"} onClick={() => clickHandler("/home/terms")} className={` ${pathname === "/home/terms" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Terms & Condition</p>
          <p role={"button"} onClick={() => clickHandler("/home/contact")} className={` ${pathname === "/home/contact" ? "text-[#5D70F9]" : "text-black hover:text-[#5D70F9]"} `} >Contact us</p>

        </div>
        <div className="hidden lg:flex gap-4">
          <ButtonGroup whitesecond ctaText="Login" url={"/auth"} />
          <ButtonGroup bluesecond ctaText="Get Started" url={"/auth/signup"} />
        </div>
        {/* Hamburger Menu */}
        <div className="flex lg:hidden">
          <div className="lg:hidden flex items-center">
            <button
              onClick={onOpen}
              className="p-3 z-50 focus:outline-none"
            >
              {isMenuVisible ? (
                <HambergerMenu
                  size="30"
                  color="#5D70F9"
                />
              ) : (

                <HambergerMenu
                  size="30"
                  color="#000"
                />
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

                <Flex h={"full"} pt={"20"} flexDir={"column"} alignItems={"center"} justifyContent={"start"} w={"full"} gap={"8"} fontSize={"lg"} >
                  <Flex maxW={'220px'} width={"full"} flexDir={"column"} gap={"4"} >
                    <ButtonGroup white={pathname === "/" ? false : true} active={pathname === "/" ? true : false}
                      onClick={() => clickHandler("/")} ctaText="Event" url={"/"} />
                    <ButtonGroup white={pathname === "/home" ? false : true} active={pathname === "/home" ? true : false}
                      onClick={() => clickHandler("/home")} ctaText="Home" url={"/home"} />
                    <ButtonGroup white={pathname === "/home/about" ? false : true} active={pathname === "/home/about" ? true : false}
                      onClick={() => clickHandler("/home/about")} ctaText="About us" url={"/home/about"} />
                    <ButtonGroup white={pathname === "/home/privacy_poilcy" ? false : true} active={pathname === "/home/privacy_poilcy" ? true : false}
                      onClick={() => clickHandler("/home/privacy_poilcy")} ctaText="Policy" url={"/home/privacy_poilcy"} />
                    <ButtonGroup white={pathname === "/home/terms" ? false : true} active={pathname === "/home/terms" ? true : false}
                      onClick={() => clickHandler("/home/terms")} ctaText="Terms & Condition" url={"/home/terms"} />
                    <ButtonGroup white={pathname === "/home/contact" ? false : true} active={pathname === "/home/contact" ? true : false}
                      onClick={() => clickHandler("/home/contact")} ctaText="Contact us" url={"/home/contact"} />
                    {/* <Text as={"button"} onClick={() => clickHandler("/")} color={pathname === "/" ? "brand.chasescrollBlue" : "black"} >Event</Text>
                                        <Text as={"button"} onClick={() => clickHandler("/home")} color={pathname === "/home" ? "brand.chasescrollBlue" : "black"} >Home</Text>
                                        <Text as={"button"} onClick={() => clickHandler("/home/about")} color={pathname === "/home/about" ? "brand.chasescrollBlue" : "black"} >About us</Text>
                                        <Text as={"button"} onClick={() => clickHandler("/home/privacy_poilcy")} color={pathname === "/home/privacy_poilcy" ? "brand.chasescrollBlue" : "black"} >Policy</Text>
                                        <Text as={"button"} onClick={() => clickHandler("/home/terms")} color={pathname === "/home/terms" ? "brand.chasescrollBlue" : "black"} >Terms & Condition</Text>
                                        <Text as={"button"} onClick={() => clickHandler("/home/contact")} color={pathname === "/home/contact" ? "brand.chasescrollBlue" : "black"} >Contact us</Text> */}

                  </Flex>
                  {/* {!token && ( */}
                  <Flex gap={"3"} width={"full"} my={"auto"} display={"flex"} justifyContent={"center"}  >
                    <ButtonGroup white
                      width={"152px"}
                      onClick={onClose} ctaText="Login" url={"/auth"} />
                    <ButtonGroup blue
                      onClick={onClose} ctaText="Get Started" url={"/auth/signup"} />
                  </Flex>
                  {/* )} */}
                </Flex>
              </DrawerBody>

              {/* <DrawerFooter gap={"5"} >
                <ButtonGroup white
                  onClick={onClose} ctaText="Login" url={"/auth"} />
                <ButtonGroup blue
                  onClick={onClose} ctaText="Get Started" url={"/auth/signup"} />
              </DrawerFooter> */}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
