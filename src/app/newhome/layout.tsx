import HomeNavbar from "@/components/landing_component/navbar"
import { Flex } from "@chakra-ui/react"
import React from "react"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <Flex h={"100vh"} w={"full"} overflowY={"auto"} flexDir={"column"} pos={"relative"} >
            <Flex w={"full"} pos={"sticky"} zIndex={"50"} top={"0px"} >
                <HomeNavbar />
            </Flex>
                {children}
        </Flex>
    )
  }