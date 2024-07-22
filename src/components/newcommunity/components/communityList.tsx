"use client"
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { ListHeader, useCommunity } from '..'
import { textLimit } from '@/utils/textlimit'
import { ICommunity } from '@/models/Communitty'
import { timeFormat } from '@/utils/dateFormat'
import { IMAGE_URL } from '@/services/urls'
import { useCommunityPageState } from '@/components/Community/chat/state';
import LoadingAnimation from '@/components/sharedComponent/loading_animation'

interface IProps {
    tab: number
    setTab?: any
}

export default function CommunityList({ tab, setTab }: IProps) {

    const { communites, loadingCommunity, refCommunity, refectingCommunity } = useCommunity()
    const { setAll, activeCommunity } = useCommunityPageState((state) => state);

    const ListCard = (item: ICommunity) => {
        return (
            <Box as='button' onClick={() => setAll({ activeCommunity: item, pageNumber: 0, messages: [], hasNext: false })} w={"full"} borderBottomWidth={"1px"} borderBottomColor={"#F1F1F1"} py={"5"} >
                <Flex rounded={"24px"} textAlign={"left"} px={"4"} gap={"3"} py={"3"} w={"full"} _hover={{ backgroundColor: "#FAFAFAF5" }} backgroundColor={activeCommunity?.id === item?.id ? "#FAFAFAF5" : "transparent"}  >
                    <Box w={"42px"} pos={"relative"} h={"42px"} bgColor={"ButtonText"} borderWidth={'2px'} borderBottomLeftRadius={'20px'} borderBottomRadius={'20px'} borderTopLeftRadius={'20px'}>
                        <Flex bgColor={"#5465E0"} color={"white"} pos={"absolute"} zIndex={"10"} justifyContent={"center"} alignItems={"center"} top={"-2"} right={"-2"} rounded={"full"} w={"21px"} h={"21px"} fontSize={"7px"} fontWeight={"700"}  >
                            +{item?.data?.memberCount}
                        </Flex>
                        <Image src={`${item?.data?.imgSrc?.includes("http") ? "" : IMAGE_URL}${item?.data?.imgSrc}`} alt='image' style={{ width: '100%', height: '100%', objectFit: "cover", borderRadius: "20px", borderTopRightRadius: "0px " }} />
                    </Box>
                    <Flex flexDir={"column"} flex={"1"} >
                        <Text fontWeight={"700"} lineHeight={"24px"} >{textLimit(item?.data?.name, 25)}</Text>
                        <Text fontSize={"14px"} mt={"2px"} >{textLimit(item?.data?.description, 40)}</Text>
                        <Flex color={"#101828B2"} alignItems={"center"} gap={"1"} >
                            <Box w={"8px"} h={"8px"} rounded={"full"} bgColor={"#5465E0"} />
                            <Text fontSize={"11px"} lineHeight={"13px"} letterSpacing={"0.07px"} >{timeFormat(item?.createdOn)}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        )
    }

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} >
            <ListHeader tab={tab} setTab={setTab} />
            <LoadingAnimation loading={loadingCommunity} refeching={refectingCommunity} length={communites?.length} >
                <Flex w={"full"} h={"full"} flex={"1"} overflowY={"auto"} px={"5"} flexDir={"column"}  >
                    {communites?.map((item: ICommunity, index: number) => {
                        if (communites?.length === index + 1) {
                            return (
                                <Box w={"full"} key={index} >
                                    <ListCard {...item} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box w={"full"} >
                                    <ListCard {...item} />
                                </Box>
                            )
                        }
                    })}
                </Flex>
            </LoadingAnimation>
        </Flex>
    )
}
