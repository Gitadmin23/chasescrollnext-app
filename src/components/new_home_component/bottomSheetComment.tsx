import useCustomTheme from '@/hooks/useTheme'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { count } from 'console'
import React, { useState } from 'react'
import { Sheet } from 'react-modal-sheet'
import ShareBtn from '../sharedComponent/new_share_btn'
import { HomeHeartIcon, HomeHeartFillIcon, HomeCommentIcon } from '../svg'
import CommentInput from './commentInput'
import CommentList from './commentList'
import { IMediaContent } from '@/models/MediaPost'
import useGetUser from '@/hooks/useGetUser'

export default function BottomSheetComment({ open, setOpen, content, liked, loadingLikes, count, likesHandle, numberComments }: {
    open: boolean, setOpen: any,
    content: IMediaContent,
    loadingLikes?: any,
    likesHandle?: any,
    liked?: any,
    numberComments?: string
    count?: any,
}) {


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();


    const { user } = useGetUser()
    const [show, setShow] = useState(true)
    const [replyData, setReplyData] = useState({} as any)

    return (

        <Sheet isOpen={open} onClose={() => setOpen(false)}>
            <Sheet.Container style={{ backgroundColor: mainBackgroundColor }} >
                <Sheet.Header />
                <Sheet.Content> 
                    <Flex w={"full"} flexDir={"column"} h={"full"} >
                        <CommentList mobile={true} replyData={replyData} setReply={setReplyData} data={content} showInput={setShow} />
                        {/* {show && ( */}
                        <Flex w={"full"} h={"fit-content"} mt={"auto"} bg={mainBackgroundColor} position={"sticky"} borderTopColor={borderColor} borderTopWidth={"1px"} bottom={"0px"} pt={"2"} pb={"3"} flexDir={"column"} gap={"0px"} alignItems={"start"} >
                            {/* <Flex w={"full"} borderTopWidth={"0px"} px={"2"} justifyContent={"space-between"} >
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
                            </Flex> */}
                            {/* {show && ( */}
                                <CommentInput setShow={setShow} replyData={replyData} data={content} user={user} />
                            {/* )} */}
                        </Flex>
                        {/* )} */}
                    </Flex>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    )
}
