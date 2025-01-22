import useCustomTheme from '@/hooks/useTheme';
import { IMediaContent, IComment } from '@/models/MediaPost'
import { Flex, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { IoHeart } from 'react-icons/io5';
import { FiTrash2 } from 'react-icons/fi';
import { IUser } from '@/models/User';
import useComment from '@/hooks/useComment';
import LoadingAnimation from '../sharedComponent/loading_animation';
import { useRouter } from 'next/navigation';
import { textLimit } from '@/utils/textlimit';

interface IProps {
    data: IMediaContent,
    showInput: any,
    setReply: any,
    replyData: any
}

export default function CommentList({
    data,
    showInput,
    setReply,
    replyData
}: IProps) {


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor,
        inputBorderColor
    } = useCustomTheme();

    const [replyCountData, setReplyCountData] = useState(0)
    const [showAction, setShowAction] = useState("")
    const [showText, setShowText] = useState("")
    const [showReplies, setShowReplies] = useState("")
    const [showActionReply, setShowActionReply] = useState("")

    const [showReply, setShowReply] = useState("")

    const { setPostID, commentsData, hasNextPage, likeComment, deleteComment, likeSubComment, deleteSubComment, isLoading, isRefetching } = useComment()

    useEffect(() => {
        setPostID(data?.id)
    }, [])

    const Id = localStorage.getItem('user_id');

    const clickReplyHandler = (data: IComment, user: IUser) => {
        setReply({
            user: user,
            data: data
        })

        setShowReply(data?.id)

        showInput(true)
    }

    const router = useRouter()

    return (
        <Flex w={"full"} maxW={"578px"} py={"4"} bg={mainBackgroundColor} flexDir={"column"} alignItems={"start"} >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} >
                <Flex w={"full"} gap={"4"} bg={mainBackgroundColor} flexDirection={"column"} >
                    {commentsData?.map((item, index) => {
                        return (
                            <Flex onMouseOver={() => setShowAction(item?.id)} onMouseLeave={() => setShowAction("")} key={index} flexDirection={"column"} gap={"6"}  >
                                <Flex w={"full"} gap={"4"} >
                                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} w={"fit-content"} >
                                        <UserImage border="1.3px" font={"14px"} size={"33px"} image={item?.user?.data?.imgMain?.value} data={item?.user} />
                                    </Flex>
                                    <Flex flexDirection={"column"} w={"full"} maxW={["fit-content", "200px", "300px"]}  >
                                        <Flex flexDir={"column"} bg={secondaryBackgroundColor} w={"full"} maxW={["fit-content", "200px", "300px"]} rounded={"16px"} py={"2"} px={"3"} >
                                            <Text role='button' onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} fontWeight={"500"} >{textLimit(item?.user?.username, 15)}</Text>
                                            <Text color={bodyTextColor} fontSize={"14px"} >{(item?.comment?.length > 100 && showText !== item?.id) ? textLimit(item?.comment, 100) : item?.comment} {item?.comment?.length > 100 && <p style={{ color: primaryColor, fontWeight: "bold" }} role='button' onClick={() => setShowText((prev) => prev === item?.id ? "" : item?.id)} >{item?.id === showText ? "show less" : "show more"}</p>}</Text>
                                            <Flex w={"full"} justifyContent={"space-between"} mt={"2"} >
                                                <Text fontSize={"12px"}>{moment(item?.timeInMilliseconds).fromNow()}</Text>
                                            </Flex>
                                        </Flex>
                                        <Flex w={"full"} mt={"1"} maxW={["fit-content", "200px", "300px"]} gap={"6"} px={"3"} >
                                            <Text as={"button"} onClick={() => setShowReply((prev) => prev === item?.id ? "" : item?.id)} fontSize={"12px"}>{item?.subComments?.totalElements} reply</Text>
                                            <Text fontSize={"12px"} as={"button"} >{item?.likeCount} likes</Text>
                                        </Flex>
                                    </Flex>
                                    <Flex w={"fit-content"} >
                                        <Flex w={"90px"} >
                                            {showAction === item?.id && (
                                                <Flex w={"90px"} h={"fit-content"}  >
                                                    <Flex bg={"white"} borderRadius={'10px'} padding='5px' gap={"2"} shadow={'md'}  >
                                                        {likeComment?.isLoading ? (
                                                            <Spinner color={mainBackgroundColor} size={"sm"} />
                                                        ) : (
                                                            <IoHeart
                                                                onClick={() => likeComment.mutate(item?.id)}
                                                                cursor='pointer' fontSize='20px' color={
                                                                    item?.likeStatus === 'LIKED' ? 'red' : 'grey'} width={'20px'} height={'20px'} />
                                                        )}
                                                        <Image onClick={() => clickReplyHandler(item, item?.user)} role={"button"} src='/assets/images/message.png' alt='message' width={'20px'} height={'20px'}
                                                        //  onClick={() => clickHandler()} 
                                                        />
                                                        {item?.user?.userId === Id && (
                                                            <Flex as={"button"} >
                                                                {deleteComment?.isLoading ? (
                                                                    <Spinner color={mainBackgroundColor} size={"sm"} />
                                                                ) : (
                                                                    <FiTrash2
                                                                        onClick={() => deleteComment.mutate(item?.id)}
                                                                        fontSize='20px' color={'red'} cursor='pointer' />
                                                                )}
                                                            </Flex>
                                                        )}
                                                    </Flex>
                                                </Flex>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Flex>
                                {showReply === item?.id && (
                                    <Flex w={"full"} flexDir={"column"} gap={"4"} pl={"40px"} >
                                        {item?.subComments?.content?.map((subitem, subindex) => {
                                            return (
                                                <Flex key={subindex} w={"full"} onMouseOver={() => setShowActionReply(subitem?.id)} onMouseLeave={() => setShowActionReply("")} gap={"4"} >
                                                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} w={"fit-content"} >
                                                        <UserImage border="1.3px" font={"14px"} size={"33px"} image={subitem?.user?.data?.imgMain?.value} data={subitem?.user} />
                                                    </Flex>
                                                    <Flex flexDirection={"column"} w={"full"} maxW={["fit-content", "200px", "300px"]}  >
                                                        <Flex flexDir={"column"} bg={secondaryBackgroundColor} w={"full"} maxW={["fit-content", "200px", "300px"]} rounded={"16px"} py={"2"} px={"3"} >
                                                            <Text role='button' onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} fontWeight={"500"} >{textLimit(item?.user?.username, 15)}</Text>
                                                            {/* <Text color={bodyTextColor} fontSize={"14px"} >{subitem?.comment}</Text> */}

                                                            <Text color={bodyTextColor} fontSize={"14px"} >{(subitem?.comment?.length > 100 && showReplies !== subitem?.id) ? textLimit(subitem?.comment, 100) : subitem?.comment} {subitem?.comment?.length > 100 && <p style={{ color: primaryColor, fontWeight: "bold" }} role='button' onClick={() => setShowReplies((prev) => prev === subitem?.id ? "" : subitem?.id)} >{subitem?.id === showReplies ? "show less" : "show more"}</p>}</Text>
                                                            <Flex w={"full"} justifyContent={"space-between"} mt={"2"} >
                                                                <Text fontSize={"12px"}>{moment(subitem?.timeInMilliseconds).fromNow()}</Text>
                                                                {/* <Text fontSize={"12px"} as={"button"} >{subitem?.likeCount} likes</Text> */}
                                                            </Flex>
                                                        </Flex>
                                                        <Flex w={"full"} mt={"1"} maxW={["fit-content", "200px", "300px"]} gap={"6"} px={"3"} >
                                                            {/* <Text fontSize={"12px"}>{moment(subitem?.timeInMilliseconds).fromNow()}</Text> */}
                                                            <Text fontSize={"12px"} as={"button"} >{subitem?.likeCount} likes</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex w={"fit-content"} >
                                                        <Flex w={"65px"} >
                                                            {showActionReply === subitem?.id && (
                                                                <Flex w={"65px"} h={"fit-content"} >
                                                                    <Flex bg="white" borderRadius={'10px'} padding='5px' gap={"2"} shadow={'md'}  >

                                                                        {likeSubComment?.isLoading ? (
                                                                            <Spinner color={mainBackgroundColor} size={"sm"} />
                                                                        ) : (
                                                                            <IoHeart
                                                                                onClick={() => likeSubComment.mutate(subitem?.id)}
                                                                                cursor='pointer' fontSize='20px' color={
                                                                                    subitem?.likeStatus === 'LIKED' ? 'red' : 'grey'} width={'20px'} height={'20px'} />
                                                                        )}
                                                                        {item?.user?.userId === Id && (
                                                                            <Flex as={"button"} >
                                                                                {deleteSubComment?.isLoading ? (
                                                                                    <Spinner color={mainBackgroundColor} size={"sm"} />
                                                                                ) : (
                                                                                    <FiTrash2
                                                                                        onClick={() => deleteSubComment.mutate(subitem?.id)}
                                                                                        fontSize='20px' color={'red'} cursor='pointer' />
                                                                                )}
                                                                            </Flex>
                                                                        )}
                                                                    </Flex>
                                                                </Flex>
                                                            )}
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                )}
                            </Flex>
                        )
                    })}
                    {(hasNextPage && commentsData?.length > 0) && (
                        <Text as={"button"} fontWeight={"500"} color={primaryColor} >View more comments</Text>
                    )}
                </Flex>
            </LoadingAnimation>
        </Flex>
    )
}
