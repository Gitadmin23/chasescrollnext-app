import { CancelIcon } from '@/components/svg'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

function Layout({ children }: {
    children: ReactNode
}) {

    return (
        <Box width={"full"} h={"100vh"} position={"relative"} overflowY={"hidden"} >
            <Box width={"full"} bgColor={"white"} height={"74px"} top={"0px"} zIndex={"50"} position={"fixed"} >
                <Flex style={{boxShadow: "0px 1px 1px 0px #00000040"}} height={"74px"} width={"full"} alignItems={"center"} px={"6"} justifyContent={"start"} position={"relative"} >

                    <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' /> 
                </Flex>
            </Box>
            <Box overflow={"hidden"} h={"100vh"}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout
