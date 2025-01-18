import { IMediaContent } from '@/models/MediaPost'
import { Box, Flex, Spinner, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import VideoPlayer from '../general/VideoPlayer'
import { IMAGE_URL } from '@/services/urls'
import ImageSlider from '../modals/mediapostPages/ImageSlider'
import { HomeCommentIcon, HomeHeartFillIcon, HomeHeartIcon, NewSendIcon } from '../svg'
import ShareBtn from '../sharedComponent/new_share_btn'
import useCustomTheme from '@/hooks/useTheme'
import UserImage from '../sharedComponent/userimage'
import useGetUser from '@/hooks/useGetUser'
import CommentInput from './commentInput'
import CommentList from './commentList'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { CgMoreVertical } from 'react-icons/cg'
import { useRouter } from 'next/navigation'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

interface IProps {
    content: IMediaContent,
    loadingLikes?: any,
    likesHandle?: any,
    liked?: any,
    count?: any,
    numberComments?: string,
    close: any
}

export default function CommentSection(props: IProps) {

    const {
        content,
        loadingLikes,
        likesHandle,
        liked,
        count,
        numberComments,
        close
    } = props

    const { user } = useGetUser()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();

    const [show, setShow] = useState(true)
    const [replyData, setReplyData] = useState({} as any)
    const router = useRouter()

    return (
        <Flex w={"full"} h={["100vh", "100vh", "70vh"]} gap={"4"} bg={mainBackgroundColor} position={"relative"} overflowY={"hidden"} flex={"1"} justifyContent={"space-between"} alignItems={"center"} px={"4"} pt={"4"} >
            <Flex w={"full"} h={"full"} alignItems={"center"} flexDirection={"column"} pb={"4"} gap={"4"}  > 
                <Flex w={"full"} borderWidth={"0.5px"} rounded={"36px"} p={"4"} roundedTopRight={"0px"} borderColor={"#EEEEEE"} h={"full"} flexDir={"column"} >
                    {/* <Text >{content?.text}</Text> */}
                    {(content?.type === "WITH_IMAGE" || content?.type === "WITH_VIDEO_POST") &&
                        <Flex w={"full"} h={["236px", "236px", "236px", "full", "full"]} rounded={"16px"} roundedTopRight={"0px"}>
                            {content?.type === "WITH_VIDEO_POST" && (
                                <VideoPlayer
                                    src={`${IMAGE_URL}${content?.mediaRef}`}
                                    measureType="px"
                                />
                            )}
                            {content?.type === "WITH_IMAGE" && (
                                <ImageSlider links={content?.multipleMediaRef} type="feed" />
                            )}
                        </Flex>
                    } 
                </Flex> 
            </Flex>
            <Flex w={"full"} flexDir={"column"} h={"full"} position={"relative"} >
                <CommentList replyData={replyData} setReply={setReplyData} data={content} showInput={setShow} />
                {/* {show && ( */}
                <Flex w={"full"} h={"fit-content"} zIndex={"60"} mt={"auto"} bg={mainBackgroundColor} position={"sticky"} borderTopColor={borderColor} borderTopWidth={"1px"} bottom={"0px"} pt={"2"} pb={"3"} flexDir={"column"} gap={"0px"} alignItems={"start"} >
                    <Flex w={"full"} borderTopWidth={"0px"} px={"2"} justifyContent={"space-between"} >
                        <Flex w={"fit-content"} alignItems={"center"} gap={"2px"} >
                            {!loadingLikes ?
                                <Flex
                                    width={"24px"}
                                    h={"30px"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    as={"button"}
                                    onClick={() => likesHandle(content?.id)}
                                >
                                    {liked !== "LIKED" && (
                                        <HomeHeartIcon color={bodyTextColor} />
                                    )}
                                    {liked === "LIKED" && <HomeHeartFillIcon />}
                                </Flex> :
                                <Flex
                                    width={"24px"}
                                    h={"30px"}
                                    justifyContent={"center"}
                                    alignItems={"center"}>
                                    <Spinner size={"sm"} />
                                </Flex>
                            }
                            <Text fontSize={"12px"} fontWeight={"bold"} >{count}</Text>
                        </Flex>
                        <Flex as={"button"} onClick={() => { setShow((prev) => !prev), setReplyData({} as any) }} w={"fit-content"} alignItems={"center"} gap={"2px"} >
                            <Flex
                                width={"24px"}
                                h={"30px"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                color={bodyTextColor}
                            >
                                <HomeCommentIcon color={bodyTextColor} />
                            </Flex>
                            <Text fontSize={"12px"} fontWeight={"bold"} >{numberComments}</Text>
                        </Flex>
                        <Flex w={"fit-content"} alignItems={"center"} gap={"2px"} >
                            <ShareBtn type="POST" id={content?.id} />
                        </Flex>
                    </Flex>
                    {/* {(show) && ( */}
                        <CommentInput setShow={setShow} replyData={replyData} data={content} user={user} />
                    {/* )} */}
                </Flex>
                {/* )} */}
            </Flex>
        </Flex>
    )
} 
