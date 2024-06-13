"use client"
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import FooterLandingPage from './footer'
import HomeNavbar from './navbar'
import { useRouter } from 'next/navigation'

interface IProps {
    children: React.ReactNode
}

export default function LandingPageLayout({ children }: IProps) {

    const router = useRouter();
    const [isAtTop, setIsAtTop] = useState(true);
  
    const checkScrollTop = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', checkScrollTop);
      return () => {
        window.removeEventListener('scroll', checkScrollTop);
      };
    }, []);

  const stickyRef: any = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (stickyRef.current) {
        stickyRef.current.style.transform = `translateY(${scrollPosition}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [router]);

    useEffect(() => {
        const handleRouteChange = () => {
            if (typeof window !== 'undefined') {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    // behavior: 'smooth', // You can set this to 'auto' if you prefer instant scrolling
                });
            }
        };
        handleRouteChange()
    }, [router]);

    return (
        <Flex h={"100vh"} w={"full"} overflowX={"hidden"} scrollBehavior={"smooth"} overflowY={"auto"} flexDir={"column"} pos={"relative"} >
            <Flex ref={stickyRef} w={"full"} pos={"sticky"} zIndex={"100"} top={"0px"} >
                <HomeNavbar />
            </Flex>
            {children}
            <FooterLandingPage />
        </Flex>
    )
}
