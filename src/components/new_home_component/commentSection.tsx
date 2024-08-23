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
import { IoArrowBack } from 'react-icons/io5'

interface IProps {
    content: IMediaContent,
    loadingLikes?: any,
    likesHandle?: any,
    liked?: any,
    count?: any,
    close: any
}

export default function CommentSection(props: IProps) {

    const {
        content,
        loadingLikes,
        likesHandle,
        liked,
        count,
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

    const [show, setShow] = useState(false)
    const [replyData, setReplyData] = useState({} as any)
    const router = useRouter()

    return (
        <Flex w={"full"} h={["100vh", "100vh", "full"]} gap={"4"} bg={mainBackgroundColor} position={"relative"} flexDir={"column"} flex={"1"} justifyContent={"space-between"} alignItems={"center"} pt={"4"} >
            <Flex w={"full"} h={"full"} alignItems={"center"} flexDirection={"column"} pb={"4"} gap={"4"} px={"6"}  >
                {/* <Flex h={"fit-content"} flexDir={"column"} w={"full"} > */}
                <Flex alignItems={"center"} gap={"2"} h={"78px"} w={"full"} rounded={"full"} roundedTopRight={"0px"} borderWidth={"1px"} borderColor={borderColor} px={"4"} >
                    <IoArrowBack role="button" onClick={()=> close(false)} size={"25px"} />
                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${user?.userId}`)} gap={"3"} >
                        <UserImage size={"55px"} data={content?.user} image={content?.user?.data?.imgMain?.value} />
                        <Flex flexDir={"column"} alignItems={"start"}  >
                            <Text color={"#233DF3"} >{textLimit(capitalizeFLetter(content?.user?.firstName) + " " + capitalizeFLetter(content?.user?.lastName), 30)}</Text>
                            <Text fontSize={"14px"} >@{textLimit(content?.user?.username, 20)}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} maxW={"450px"} borderWidth={"0.5px"} rounded={"36px"} p={"4"} roundedTopRight={"0px"} borderColor={"#EEEEEE"} h={"auto"} flexDir={"column"} >
                    <Text >{content?.text}</Text>
                    {(content?.type === "WITH_IMAGE" || content?.type === "WITH_VIDEO_POST") &&
                        <Flex w={"full"} h={["236px", "236px", "236px", "250px", "250px"]} rounded={"16px"} roundedTopRight={"0px"}>
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
                    <Flex w={"full"} borderTopWidth={"0px"} pt={"4"} justifyContent={"space-between"} >
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
                            <Text>{count}</Text>
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
                            <Text>{content?.commentCount}</Text>
                        </Flex>
                        <Flex w={"fit-content"} alignItems={"center"} gap={"2px"} >
                            <ShareBtn type="POST" id={content?.id} />
                        </Flex>
                    </Flex>
                </Flex>
                <CommentList replyData={replyData} setReply={setReplyData} data={content} showInput={setShow} />
                {/* </Flex> */}
            </Flex>
            {show && (
                <Flex w={"full"} mt={"auto"} bg={mainBackgroundColor} position={"sticky"} borderTopColor={borderColor} borderTopWidth={"1px"} bottom={"0px"} pt={"4"} pb={"6"} flexDir={"column"} gap={"4"} alignItems={"start"} >
                    <CommentInput setShow={setShow} replyData={replyData} data={content} user={user} />
                </Flex>
            )}
        </Flex>
    )
} 
