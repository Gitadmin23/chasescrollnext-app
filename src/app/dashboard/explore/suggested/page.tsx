"use client"
import UserList from '@/components/explore_component/userslist';
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { BsChevronLeft } from "react-icons/bs";

interface Props {}

function Suggested(props: Props) {
    const {} = props

    return (
        <Box  width={"full"} bg={"brand.chasescrollBgBlue"} overflowY={"auto"} >
            <Box width={"full"} top={"0px"} zIndex={"50"} position={"sticky"} > 
                <Flex height={"54px"} bg={"brand.chasescrollNavyLight"} width={"full"} alignItems={"center"} justifyContent={"center"} position={"relative"} >
                    <Link href='/dashboard/explore' display={"flex"}  px={"3"} height={"full"} left={"0px"} justifyContent={"center"} alignItems={"center"} position={"absolute"} zIndex={"10"} >
                        <BsChevronLeft size={"25px"} />
                    </Link>
                    <Text fontWeight={"medium"} fontSize={"28px"} >Suggestion</Text>
                </Flex>
            </Box>
            <Flex flexDirection={"column"} flex={1} width={"full"} >
                <UserList />
            </Flex>
        </Box>
    )
}

export default Suggested
