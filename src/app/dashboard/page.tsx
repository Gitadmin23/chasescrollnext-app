"use client"
import { CreatePost, PostCard, UpcomingEvent } from '@/components/new_home_component'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useHome from '@/hooks/useHome'
import useCustomTheme from '@/hooks/useTheme'
import { IMediaContent } from '@/models/MediaPost'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export default function Home() {

    const { postData, refetchingPost, loadingPost, postRef } = useHome()

    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    return (
        <Flex w={"full"} height={"full"} bgColor={secondaryBackgroundColor} >
            <Flex w={["full", "full", "full", "55%", "full"]} h={"full"} flexDir={"column"} >
                <CreatePost />
                <Flex w={"full"} h={"full"} flexDir={"column"} overflowY={"auto"} >
                    <LoadingAnimation loading={loadingPost} refeching={refetchingPost} >
                        <Flex w={["full", "full", "full", "full", "619px"]} height={"fit-content"} gap={"5"} px={["4", "4", "4", "4", "8"]} py={"8"} flexDir={"column"} >
                            {postData?.map((item: IMediaContent, index: number) => {
                                if (index === postData?.length - 1) {
                                    return (
                                        <Box key={index} w={"full"} h={"full"} ref={postRef} >
                                            <PostCard {...item} />
                                            {(index + 1) % 6 === 0 && (
                                                <Flex display={["flex", "flex", "flex", "none", "none"]} w={"full"} >
                                                    <UpcomingEvent />
                                                </Flex>
                                            )}
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={index} w={"full"} h={"full"} >
                                            <PostCard {...item} />
                                            {(index + 1) % 6 === 0 && (
                                                <Flex display={["flex", "flex", "flex", "none", "none"]}  w={"full"} >
                                                    <UpcomingEvent />
                                                </Flex>
                                            )}
                                        </Box>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Flex>
            </Flex>
            <Flex h={"full"} borderLeftColor={borderColor} borderLeftWidth={"1px"} w={["fit-content", "fit-content", "fit-content", "45%", "75%"]} display={["none", "none", "none", "flex", "flex"]} >
                <Flex w={"full"} >
                    <UpcomingEvent />
                </Flex>
            </Flex>
        </Flex>
    )
}
