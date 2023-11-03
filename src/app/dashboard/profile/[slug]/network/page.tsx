"use client"
import ConnectedUser from '@/components/profile_component/connected_user'
import RequestUser from '@/components/profile_component/request_user'
import { Box, Button, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

function Network({ params }: { params: { slug: string } }) {

    const [tab, setTab] = useState(false)

    return (
        <Flex flexDirection={"column"} alignItems={"center"} width={"full"} py={"4"} >
            <Flex bg={"#EFEFF0"} p={"1"} rounded={"md"} >
                <Button onClick={()=> setTab(false)} _hover={{}} width={"150px"} height={"43px"} bgColor={!tab ? "white" : "#EFEFF0"} color={!tab ? "brand.chasescrollBlue" : "gray.400"} >
                    Connects
                </Button>
                <Button onClick={()=> setTab(true)} _hover={{}} width={"150px"} height={"43px"} bgColor={tab ? "white" : "#EFEFF0"} color={tab ? "brand.chasescrollBlue" : "gray.400"} >
                    Requests
                </Button>
            </Flex>
            <Box width={"fit-content"} pt={"4"} >
                {!tab && (
                    <ConnectedUser user_index={params?.slug} />
                )}
                {tab && (
                    <RequestUser />
                )}
            </Box>
        </Flex>
    )
}

export default Network
