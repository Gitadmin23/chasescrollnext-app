"use client"
import ChangeAdmin from '@/components/Community/settingComponent/ChangeAdmin';
import EditCommunity from '@/components/Community/settingComponent/EditCommunity';
import SendMessage from '@/components/Community/settingComponent/SendMessage';
import { Box, Flex, Text } from '@chakra-ui/react';
import { People } from 'iconsax-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

export default function CommunitySettings() {

    const page = useParams();

    const [edit, setEdit] = useState(false)

    return (
        <Flex width={"full"} flexDir={"column"} py={"8"} alignItems={"center"} overflowY={"auto"} >
            <Flex maxW={"400px"} w={"full"} gap={"8"} flexDir={"column"} >
                <Flex mb={"6"} w={"full"} justifyContent={"space-between"} >
                    <Box />
                    <Text fontSize={"17px"} fontWeight={"bold"} lineHeight={"22px"} letterSpacing={"-0.41px"} >Community Settings</Text>
                    <Text fontSize={"sm"} color='#1732F7' fontWeight={"medium"} lineHeight={"18.23px"} >Save</Text>
                </Flex>
                <EditCommunity />
                <SendMessage />
                <ChangeAdmin />
            </Flex>
        </Flex>
    )
}
