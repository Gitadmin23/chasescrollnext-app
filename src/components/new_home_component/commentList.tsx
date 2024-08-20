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
    const [showActionReply, setShowActionReply] = useState("")

    const [showReply, setShowReply] = useState("")

    const { setPostID, commentsData, hasNextPage, likeComment, deleteComment, likeSubComment, deleteSubComment } = useComment()

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
    

    return (
        <Flex w={"full"} maxW={"578px"} pt={"4"} flexDir={"column"} alignItems={"start"} >
            <Flex w={"full"} gap={"4"} flexDirection={"column"} >
                {commentsData?.map((item, index) => {
                    return (
                        <Flex onMouseOver={() => setShowAction(item?.id)} onMouseLeave={() => setShowAction("")} key={index} flexDirection={"column"} gap={"6"}  >
                            <Flex w={"full"} gap={"4"} >
                                <Flex w={"fit-content"} >
                                    <UserImage border="1.3px" font={"14px"} size={"33px"} image={item?.user?.data?.imgMain?.value} data={item?.user} />
                                </Flex>
                                <Flex flexDir={"column"} bg={inputBorderColor} minW={"300px"} rounded={"16px"} py={"2"} px={"3"} >
                                    <Text fontWeight={"500"} >{item?.user?.username}</Text>
                                    <Text color={bodyTextColor} fontSize={"14px"} >{item?.comment}</Text>
                                    <Flex w={"full"} justifyContent={"space-between"} mt={"2"} >
                                        <Text fontSize={"12px"}>{moment(item?.timeInMilliseconds).fromNow()}</Text>
                                        <Text as={"button"} onClick={() => setShowReply((prev) => prev === item?.id ? "" : item?.id)} fontSize={"12px"}>{item?.subComments?.totalElements} reply</Text>
                                        <Text fontSize={"12px"} as={"button"} >{item?.likeCount} likes</Text>
                                    </Flex>
                                </Flex>
                                {showAction === item?.id && (
                                    <Flex w={"100px"} h={"fit-content"} >
                                        <Flex bg="white" borderRadius={'10px'} padding='5px' gap={"2"} shadow={'md'}  >
                                            {likeComment?.isLoading ? (
                                                <Spinner size={"sm"} />
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
                                                        <Spinner size={"sm"} />
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
                            {showReply === item?.id && (
                                <Flex w={"full"} flexDir={"column"} gap={"4"} pl={"40px"} >
                                    {item?.subComments?.content?.map((subitem, subindex) => {
                                        return (
                                            <Flex key={subindex} w={"full"} onMouseOver={() => setShowActionReply(subitem?.id)} onMouseLeave={() => setShowActionReply("")} gap={"4"} >
                                                <Flex w={"fit-content"} >
                                                    <UserImage border="1.3px" font={"14px"} size={"33px"} image={subitem?.user?.data?.imgMain?.value} data={subitem?.user} />
                                                </Flex>
                                                <Flex flexDir={"column"} bg={inputBorderColor} minW={"300px"} rounded={"16px"} py={"2"} px={"3"} >
                                                    <Text fontWeight={"500"} >{subitem?.user?.username}</Text>
                                                    <Text color={bodyTextColor} fontSize={"14px"} >{subitem?.comment}</Text>
                                                    <Flex w={"full"} justifyContent={"space-between"} mt={"2"} >
                                                        <Text fontSize={"12px"}>{moment(subitem?.timeInMilliseconds).fromNow()}</Text>
                                                        <Text fontSize={"12px"} as={"button"} >{subitem?.likeCount} likes</Text>
                                                    </Flex>
                                                </Flex>

                                                {showActionReply === subitem?.id && (
                                                    <Flex w={"100px"} h={"fit-content"} >
                                                        <Flex bg="white" borderRadius={'10px'} padding='5px' gap={"2"} shadow={'md'}  >

                                                            {likeSubComment?.isLoading ? (
                                                                <Spinner size={"sm"} />
                                                            ) : (
                                                                <IoHeart
                                                                    onClick={() => likeSubComment.mutate(subitem?.id)}
                                                                    cursor='pointer' fontSize='20px' color={
                                                                        subitem?.likeStatus === 'LIKED' ? 'red' : 'grey'} width={'20px'} height={'20px'} />
                                                            )}
                                                            {item?.user?.userId === Id && (
                                                                <Flex as={"button"} >
                                                                    {deleteSubComment?.isLoading ? (
                                                                        <Spinner size={"sm"} />
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
                                        )
                                    })}
                                </Flex>
                            )}
                        </Flex>
                    )
                })}
                {hasNextPage && (
                    <Text as={"button"} fontWeight={"500"} color={primaryColor} >View more comments</Text>
                )}
            </Flex>
        </Flex>
    )
}
