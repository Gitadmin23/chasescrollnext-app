import CustomText from '@/components/general/Text';
import { Box, Spinner, VStack } from '@chakra-ui/react';
import React from 'react'
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

function MainArea() {
  const [messagess, setMessages] = React.useState<ChatMessage[]>([]);
  const [len, setLen] = React.useState(messagess?.length);

   const intObserver = React.useRef<IntersectionObserver>();
  const { activeChat, pageNumber, setAll, messages, hasNext } = useChatPageState((state) => state);

   // queries
   const { isLoading, } = useQuery(['getMessages', activeChat?.id, pageNumber], () => httpService.get(`${URLS.CHAT_MESSGAE}`, {
    params: {
        chatID: activeChat?.id,
        page: pageNumber
    }
}), {
    enabled: activeChat !== null,
    onSuccess: (data) => {
        const item: PaginatedResponse<ChatMessage> = data.data;
        if (item?.content?.length > 0) {
            if (item.content[0].id !== activeChat?.id) {
                setAll({ messages: item.content });
            } else {
                if (messages.length > 0) {
                    const arr = [...messages, ...item?.content];
                    setAll({ messages: uniqBy(arr, 'id'), hasNext: item.last ? false:true });
    
                } else {
                    setAll({ messages: uniqBy(item?.content, 'id'),  hasNext: item.last ? false:true });
                }
            }
        }
      
    },
    onError: (error: any) => {}
});

const lastChildRef = React.useCallback((post: any) => {
    if (isLoading) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && hasNext) {
        setAll({ pageNumber: pageNumber + 1});
        //setPageNumber(prev => prev + 1); 
      }
    });
    if (post) intObserver.current.observe(post);
   }, [isLoading, setAll, pageNumber, hasNext]);



    if (activeChat === null) {
        return (
            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>Start Conversations</CustomText>

                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>Gist with friends</CustomText>
            </VStack>
        )
    }
  return (
    <VStack width='100%' height='100%' flex={1} bg='whitesmoke'>
      
      <ChatSectionHeader />

      {/* MESSAGE AREA */}

      <Box flex='1' width={'100%'} height={'100%'} overflow={'auto'} className='chat-area'>
        <VStack spacing={6} paddingX={['10px', '30px']} paddingY='40px' alignItems={'flex-start'} width={'100%'} height={'100%'}>
            {activeChat !== null && messages.length > 0 && messages.map((item, index) => {
                return (
                    <>
                        { index === messages.length - 1 ? (
                            <ChatBubble id='lastMsg' ref={lastChildRef} key={index.toString()} message={item} />
                        ):(
                            <ChatBubble  id={undefined} key={index.toString()} message={item} />
                        )}
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

      <TextArea />
    </VStack>
  )
}

export default MainArea