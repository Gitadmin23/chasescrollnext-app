"use client"
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react"; 
import { useParams, useRouter } from 'next/navigation'  

// import logo from "../assets/logo.png"; 
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import ButtonGroup from "../home_component/Navbar/ButtonGroup";

const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const location = useLocation();
  const router = useRouter() 
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [pathname, setPathname] = useState("");


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuVisible((prevIsMenuVisible) => !prevIsMenuVisible);
  };

  const handleToggleEnter = () => {
    setIsMenuOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: any) => {
    return pathname === path;
  };

  const getNavLinkClassName = (path: any, transparent: any, isScrolled: any) => {
    let className = "";

    if (pathname === path) {
      className += "w-auto text-[#5D70F9] font-semibold ";
      if (transparent && !isScrolled) {
        className += " text-white";
      }
    } else {
      className += "text-black hover:text-[#5D70F9]";
      if (transparent && !isScrolled) {
        className += " text-white";
      }
    }

    return className;
  };

  const CustomLink = (props : any) => {
    const className = getNavLinkClassName(props.path, props.transparent, props.isScrolled);
    const handleClick = () => {
      setIsMenuVisible(false);
      setPathname(props.path)
    };

    return (
      <Link
        href={props.path}
        className={className}
        // activeClassName="text-red-500"
        onClick={handleClick}
      >
        {props.children}
      </Link>
    );
  };

  useEffect(()=> {
    setPathname(window.location.pathname)
  }, [router])

  return (
    <div className=" sticky z-50 top-0 w-full mx-auto max-w-[1440px] bg-white border-b-2">
      <div className="px-4 xl:px-0 max-w-[1200px] w-full mx-auto py-5 flex gap-8 justify-between items-center">
        <div role="button" onClick={() => router.push("/")} className="flex flex-row gap-1 max-w-[197px] w-full items-center">
          <img className="max-w-[60px] w-full" src={"/assets/logo.png"} alt="logo" />
          <p className="text-2xl font-normal w-full">Chasescroll</p>
        </div>

        <div className="hidden text-[15px] lg:flex justify-between max-w-[534px] w-full">
          <CustomLink path="/" transparent={false} isScrolled={false}>
            Event
          </CustomLink>
          <CustomLink path="/home" transparent={false} isScrolled={false}>
            Home
          </CustomLink>
          <CustomLink path="/home/about" transparent={false} isScrolled={false}>
            About us
          </CustomLink>
          <CustomLink path="/home/privacy_poilcy" transparent={false} isScrolled={false}>
            Policy
          </CustomLink>
          <CustomLink path="/home/terms" transparent={false} isScrolled={false}>
            Terms & Condition
          </CustomLink>
          <CustomLink path="/home/contact" transparent={false} isScrolled={false}>
            Contact us
          </CustomLink>
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

                <div role="button"
                    onClick={onClose}>

                    <CustomLink path="/" transparent={false} isScrolled={false}>
                      Event
                    </CustomLink>
                  </div>
                  <div role="button"
                    onClick={onClose}>

                    <CustomLink path="/home" transparent={false} isScrolled={false}>
                      Home
                    </CustomLink>
                  </div>
                  <div role="button"
                    onClick={onClose}>

                    <CustomLink
                      path="/home/about"
                      transparent={false}
                      isScrolled={false}
                    >
                      About us
                    </CustomLink>
                  </div>
                  <div role="button"
                    onClick={onClose}> 
                  <CustomLink path="/home/privacy_poilcy"
                    onClick={onClose} transparent={false} isScrolled={false}>
                    Policy
                  </CustomLink>
                  </div>
                  <div role="button"
                    onClick={onClose}>
                  <CustomLink path="/home/terms"
                    onClick={onClose} transparent={false} isScrolled={false}>
                    Terms & Condition
                  </CustomLink>
                  </div>
                  <div role="button"
                    onClick={onClose}>
                  <CustomLink
                    path="/home/contact"
                    onClick={onClose}
                    transparent={false}
                    isScrolled={false}
                  >
                    Contact us
                  </CustomLink>
                  </div>
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
