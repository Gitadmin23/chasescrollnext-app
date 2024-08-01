"use client"
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CommunityList } from "../newcommunity"
import CustomButton from '../general/Button'
import CommunityTab from './components/CommunityTab'
import MainArea from './chat/MainArea'
import FindCommunity from './findCommunity'
import { useCommunityPageState } from '@/components/Community/chat/state';
import CommunityRequest from './communityRequest'
import { IoArrowBack } from 'react-icons/io5'
import useCustomTheme from '@/hooks/useTheme'

export default function Mainscreen() {

    const [activeTab, setActiveTab] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const { activeCommunity } = useCommunityPageState((state) => state);
    const handleTabChange = React.useCallback((tab: number) => {
        setActiveTab(tab);
    }, [activeTab])

    const clickHander = () => {
        setShow(false)
        setActiveTab(0)
    }

    useEffect(() => {
        if (!activeCommunity) {
            setShow(false)
        }
    }, [activeCommunity])


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();


    return (
        <Flex w={"full"} h={"full"} bgColor={mainBackgroundColor}  >
            <Flex width={["full", "full", "350px", "350px", "350px"]} display={[show ? "none" : "flex", show ? "none" : "flex", "flex", "flex", "flex"]} minHeight={"full"} borderRightWidth={"1px"} borderRightColor={borderColor} >
                <CommunityList tab={activeTab} setTab={setActiveTab} setShow={setShow} />
            </Flex>
            <Flex width={["full", "full", "full"]} display={[!show ? "none" : "full", !show ? "none" : "full", "flex", "flex", "flex"]} flex={"1"} flexDir={"column"} minHeight={"full"} >
                <Flex display={["none", "none", "flex", "flex", "flex"]} w={"full"} h={"fit-content"}  >
                    <Flex w={"full"} h={"72px"} px={"6"} gap={"6"} borderBottomWidth={"1px"} borderBottomColor={borderColor} alignItems={"center"}  >
                        <CommunityTab activeTab={activeTab} setActiveTab={handleTabChange} />
                    </Flex>
                </Flex>
                <Flex display={[activeTab === 0 ? "none" : "flex", activeTab === 0 ? "none" : "flex", "none", "none", "none"]} w={"full"} h={"fit-content"}  >
                    <Flex w={"full"} h={"72px"} px={"6"} gap={"6"} borderBottomWidth={"1px"} borderBottomColor={borderColor} alignItems={"center"}  >
                        <Box onClick={() => clickHander()} as='button' display={["block", "block", "none", "none", "none"]} >
                            <IoArrowBack size={"20px"} />
                        </Box >
                        <Text lineHeight={"36px"} fontSize={"20px"} fontWeight={"700"} >{activeTab === 1 ? "Find Community" : "Request"}</Text>
                    </Flex>
                </Flex>
                <Flex w={"full"} h={"full"} >
                    {activeTab === 0 && (
                        <MainArea setShow={setShow} />
                    )}
                    {activeTab === 1 && (
                        <FindCommunity />
                    )}
                    {activeTab === 2 && (
                        <CommunityRequest />
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
