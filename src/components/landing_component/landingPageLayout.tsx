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

    const contentRef: any = useRef(null);

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToTop()
    }, [router])

    return (
        <Flex ref={contentRef} minH={"100vh"} w={"full"} overflowX={"hidden"} scrollBehavior={"smooth"} overflowY={"auto"} flexDir={"column"} pos={"relative"} >
            <Flex w={"full"} pos={"sticky"} zIndex={"100"} top={"0px"} >
                <HomeNavbar />
            </Flex>
            {children}
            <FooterLandingPage />
        </Flex>
    )
}
