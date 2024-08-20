import { Flex, Textarea, Box, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import UserImage from '../sharedComponent/userimage'
import { NewSendIcon } from '../svg'
import { IUser } from '@/models/User'
import useComment from '@/hooks/useComment'
import { IComment, IMediaContent } from '@/models/MediaPost'
import { textLimit } from '@/utils/textlimit'
import useCustomTheme from '@/hooks/useTheme'

interface IProps {
    user: IUser | null
    data: IMediaContent,
    replyData: {
        user: IUser,
        data: IComment
    },
    setShow: any
}

export default function CommentInput({ user, data, replyData, setShow }: IProps) {

    const { addComment, addCommentHandler, commentsInput, setCommentsInput, setPostID, addSubCommentHandler, subCommentsInput, setSubCommentsInput, createSubComment } = useComment()

    useEffect(() => {
        setPostID(data?.id)
    }, [])

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();

    const changeHandler = (item: string) => {
        if(replyData?.data?.id){
            setSubCommentsInput(item)
        } else {
            setCommentsInput(item)
        }
    }

    useEffect(()=> {
        if(addComment?.isSuccess || createSubComment?.isSuccess){
            setShow((prev: any) => !prev)
        }
    }, [addComment?.isSuccess, createSubComment?.isSuccess])

    return (
        <Flex w={"full"} height={"fit-content"} flexDir={"column"} px={"4"} gap={"3"} >
            {replyData?.data?.id && (
                <Text>replying to <span style={{ color: primaryColor, fontWeight: "bold" }} >{replyData?.user?.username}</span> {`"${textLimit(replyData?.data?.comment, 20)}"`}</Text>
            )}
            <Flex pos={"relative"} w={"full"} gap={"1"} h={"fit-content"} alignItems={"start"} p={"2"} rounded={"12px"} >
                <Box w={"fit-content"} >
                    <UserImage size={"36px"} fontWeight={"500"} font={"14px"} border={"1.5px"} image={user?.data?.imgMain?.value} data={user} />
                </Box>
                <Textarea
                    value={replyData?.data?.id ? subCommentsInput : commentsInput} onChange={(e) => changeHandler(e.target.value)}
                    h={"45px"} w={"full"} bgColor={"#F2F3FB"} borderWidth={"0px"} _hover={{ borderWidth: "0px" }} focusBorderColor='transparent' placeholder='Add your thought' _placeholder={{ color: "#00000033" }} />
                {!replyData?.data?.id && (
                    <Box as='button' w={"fit-content"} mt={"auto"} >
                        {addComment?.isLoading ?
                            <Spinner size={"sm"} /> :
                            <Box as='button' onClick={() => addCommentHandler({
                                postID: replyData?.data?.id ? replyData?.data?.id : data?.id,
                                comment: replyData?.data?.id ? subCommentsInput : commentsInput
                            })}  >
                                <NewSendIcon />
                            </Box>
                        }
                    </Box>
                )}
                {replyData?.data?.id && (
                    <Box as='button' w={"fit-content"} mt={"auto"} >
                        {createSubComment?.isLoading ?
                            <Spinner size={"sm"} /> :
                            <Box as='button' onClick={() => addSubCommentHandler({
                                commentID: replyData?.data?.id,
                                comment: subCommentsInput
                            })}  >
                                <NewSendIcon />
                            </Box>
                        }
                    </Box>
                )}
            </Flex>
        </Flex>
    )
}
