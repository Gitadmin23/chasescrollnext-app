import useCustomTheme from '@/hooks/useTheme'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { count } from 'console'
import React, { useEffect, useRef, useState } from 'react'
import { Sheet } from 'react-modal-sheet'
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
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();


    const { user } = useGetUser()
    const [show, setShow] = useState(true)
    const [replyData, setReplyData] = useState({} as any)

    const containerRef: any = useRef(null);

    const scrollToInput = (event: any) => {
        console.log("scrollToInput", event)
        const inputElement = event.target;
        const container = containerRef.current;

        if (container && inputElement) {
            const inputRect = inputElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Check if the input is out of view
            if (inputRect.bottom > containerRect.bottom || inputRect.top < containerRect.top) {
                container.scrollTo({
                    top: inputElement.offsetTop - container.offsetTop,
                    behavior: "smooth",
                });
            }
        }
    };

    return (
        <Sheet isOpen={open}
            detent="content-height"
            onClose={() => setOpen(false)}>
            <Sheet.Container
                style={{
                    backgroundColor: mainBackgroundColor,
                    height: '100%',
                    position: 'relative'
                }}
            >
                <Sheet.Header />
                <Sheet.Content>
                    <Flex
                        w={"full"}
                        flexDir={"column"}
                        position={"relative"}
                        ref={containerRef}
                        h={"full"}
                        pb={"80px"} // Add padding to ensure content is visible above keyboard
                    >
                        <Flex w={"full"} h={"80px"} position={"sticky"} borderBottomWidth={"1px"} borderBottomColor={borderColor} top={"0px"} justifyContent={"center"} alignItems={"center"} >
                            <Text fontWeight={"500"} fontSize={"16px"} >Comments</Text>
                        </Flex>
                        <CommentList user={user} mobile={true} replyData={replyData} setReply={setReplyData} data={content} showInput={setShow} />
                        <Flex
                            w={"full"}
                            mt={"auto"}
                            h={"fit-content"}
                            bg={mainBackgroundColor}
                            zIndex={"30"}
                            position={"fixed"} // Change to fixed positioning
                            borderTopColor={borderColor}
                            borderTopWidth={"1px"}
                            bottom={"0px"}
                            left={"0px"} // Ensure proper alignment
                            right={"0px"} // Ensure proper alignment
                            pt={"2"}
                            pb={"3"}
                            flexDir={"column"}
                            gap={"0px"}
                            alignItems={"start"}
                        >
                            <CommentInput
                            handleFocus={scrollToInput}
                                open={open}
                                setShow={setShow}
                                replyData={replyData}
                                data={content}
                                user={user}
                                setReplyData={setReplyData}
                            />
                        </Flex>
                    </Flex>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    )
}
