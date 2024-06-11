import { Flex } from '@chakra-ui/react'
import React from 'react'
import FooterLandingPage from './footer'
import HomeNavbar from './navbar'

interface IProps {
    children: React.ReactNode
}

export default function LandingPageLayout({ children }: IProps) {
    return (
        <Flex h={"100vh"} w={"full"} scrollBehavior={"smooth"} overflowY={"auto"} flexDir={"column"} pos={"relative"} >
            <Flex w={"full"} pos={"sticky"} zIndex={"100"} top={"0px"} >
                <HomeNavbar />
            </Flex>
            {children}
            <FooterLandingPage />
        </Flex>
    )
}
