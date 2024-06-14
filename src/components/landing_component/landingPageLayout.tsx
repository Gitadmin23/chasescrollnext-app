"use client"
import { Box, Flex, Grid } from '@chakra-ui/react'
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
        <Box overflow={"hidden"} w={"full"} > 
            <Grid h="100vh" w={"full"} overflow={"hidden"} >
                <Flex w={"full"} position={"fixed"} zIndex={"100"} top={"0px"} >
                    <HomeNavbar />
                </Flex>
                <Flex w="full" h="full" pt={["64px", "64px", "101.03px"]} overflow={"hidden"} bg={"white"}> 
                    <Flex w={"full"} flexDirection={"column"} overflowX={"hidden"} overflowY={"auto"} >
                        {children}
                        <FooterLandingPage />
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    )
}
