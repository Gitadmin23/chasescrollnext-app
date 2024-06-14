"use client"
import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import FooterLandingPage from './footer'
import HomeNavbar from './navbar'
import { useRouter } from 'next/navigation'

interface IProps {
    children: React.ReactNode
}

export default function LandingPageLayout({ children }: IProps) {

    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [router])

    return (
        <Flex h={"auto"} w={"full"} overflow={"hidden"} scrollBehavior={"smooth"} flexDir={"column"} pos={"relative"} >
            <Flex w={"full"} position={"static"} top={"0px"} insetX={"0px"} zIndex={"100"} >
                <HomeNavbar />
            </Flex>
            <Flex h={"auto"} w={"full"} overflowY={"auto"} overflowX={"hidden"} scrollBehavior={"smooth"} flexDir={"column"} >
                {/* <Box w={"full"} height={["64px", "64px", "101.03px"]} /> */}
                {children}
                <FooterLandingPage />
            </Flex>
        </Flex>
    )
}
