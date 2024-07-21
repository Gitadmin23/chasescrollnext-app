import CustomText from '@/components/general/Text';
import { Box, Flex, Spinner, useColorMode, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react'
import { useCommunityPageState } from '../Community/chat/state';
import { useChatPageState } from './state';
import ChatSectionHeader from './ChatSectionHeader';
import TextArea from './Textarea';
import { ChatMessage } from '@/models/ChatMessage';
import { useQuery } from 'react-query';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { uniqBy } from 'lodash';
import ChatBubble from './ChatBubble';
import useCustomTheme from '@/hooks/useTheme';
import BlockBtn from '../sharedComponent/blockbtn';

function MainArea() {
    const [messagess, setMessages] = React.useState<ChatMessage[]>([]);
    const [len, setLen] = React.useState(messagess?.length);

    const intObserver = React.useRef<IntersectionObserver>();
    const { activeChat, pageNumber, setAll, messages, hasNext } = useChatPageState((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
    const divRef: any = useRef(null);


    // queries
    const { isLoading, isRefetching } = useQuery(['getMessages', activeChat?.id, pageNumber], () => httpService.get(`${URLS.CHAT_MESSGAE}`, {
        params: {
            chatID: activeChat?.id,
            page: pageNumber
        }
    }), {
        enabled: activeChat !== null,
        refetchInterval: 1000,
        onSuccess: (data) => {
            const item: PaginatedResponse<ChatMessage> = data.data;

            console.log(item);
            

            if (item?.content?.length > 0) {
                if (item.content[0].id !== activeChat?.id) {
                    divRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setAll({ messages: item.content });
                } else {
                    if (messages.length > 0) {
                        const arr = [...messages, ...item?.content];
                        setAll({ messages: uniqBy(arr, 'id'), hasNext: item.last ? false : true });

                    } else {
                        setAll({ messages: uniqBy(item?.content, 'id'), hasNext: item.last ? false : true });
                    }
                }
            }
        },
        onError: (error: any) => { }
    });

    const lastChildRef = React.useCallback((post: any) => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && hasNext) {
                setAll({ pageNumber: pageNumber + 1 });
                //setPageNumber(prev => prev + 1); 
            }
        });
        if (post) intObserver.current.observe(post);

    }, [isLoading, isRefetching, setAll, pageNumber, hasNext]); 

    if (activeChat === null) {
        return (
            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>Start Conversations</CustomText>

                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>Gist with friends</CustomText>
            </VStack>
        )
    }


    return (
        <VStack overflow={'hidden'} height='100%' width={'100%'} bg={mainBackgroundColor}>

            <ChatSectionHeader />

            {/* MESSAGE AREA */}

            <Box flex='1' width={'100%'} overflowY={'auto'} overflowX={'hidden'} className={colorMode === 'light' ? 'chat-area' : ''} bg={mainBackgroundColor}>
                <VStack spacing={6} paddingX={['10px', '10px']} paddingY='40px' alignItems={'flex-start'} width={'100%'} height={'100%'}>
                    {activeChat !== null && messages.length > 0 && messages.map((item, index) => {
                        return (
                            <>
                                {index === messages.length - 1 ? (
                                    <ChatBubble index={index} id='lastMsg' ref={lastChildRef} key={index.toString()} message={item} />
                                ) : (
                                    <ChatBubble index={index} id={undefined} key={index.toString()} message={item} />
                                )}

                                {/* {index === messages.length - 1 && (
                                    <div ref={divRef} />
                                )} */}
                            </>
                        )
                    })}
                    {
                        isLoading && (
                            <VStack width='100%' height='50px' justifyContent={'center'} alignItems={'center'}>
                                <Spinner size={'sm'} />
                            </VStack>
                        )
                    }
                </VStack>
            </Box>

            {/* TEXTAREA */}
            <Flex w={"full"} mt={"auto"} >
                <BlockBtn isChat={true} user_index={activeChat?.otherUser?.userId} />
            {/* <TextArea /> */}
            </Flex>
        </VStack>
    )
}

export default MainArea