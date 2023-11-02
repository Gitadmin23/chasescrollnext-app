import CustomText from '@/components/general/Text';
import { Box, Spinner, VStack } from '@chakra-ui/react';
import React from 'react'
import CommunityChatHeader from './Header';
import TextArea from './TextArea';
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import { URLS } from '@/services/urls';
import { IMediaContent, IMediaPost } from '@/models/MediaPost';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';
import MessageCard from './MessageCard';
import { IComment } from '@/models/Comment';
import { useCommunityPageState } from '@/components/Chat/state';

function MainArea() {
    const [posts, setPosts] = React.useState<IMediaContent[]>([]);
    const [len, setLen] = React.useState(posts?.length);

     const intObserver = React.useRef<IntersectionObserver>();


    const { userId: myId } = useDetails((state) => state)
    const { activeCommunity, setAll, messages, pageNumber, hasNext, activeMessageId, commentHasNext, commentPage, comments } = useCommunityPageState((state) => state);
    // queries
    const { isLoading, } = useQuery(['getMessages', activeCommunity?.id, pageNumber], () => httpService.get(`${URLS.GET_GROUP_MESSAGES}`, {
        params: {
            groupID: activeCommunity?.id,
            page: pageNumber
        }
    }), {
        enabled: activeCommunity !== null,
        onSuccess: (data) => {
            const item: PaginatedResponse<IMediaContent> = data.data;
            if (item?.content?.length > 0) {
                if (item.content[0].sourceId !== activeCommunity?.id) {
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


       React.useEffect(() => {
        if (posts?.length !== len) {
            setLen(posts?.length);
            document.querySelector('#lastMsg')?.scrollIntoView({ behavior: 'smooth' });
        }
       }, [posts, len])

    if (activeCommunity === null) {
        return (
            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'DM-Medium'} color='brand.chasescrollButtonBlue'>Start conversations</CustomText>

                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'DM-Medium'} color='brand.chasescrollButtonBlue'>Gist with friends</CustomText>
            </VStack>
        )
    }
  return (
    <VStack width='100%' height="100%" overflow={'hidden'} borderRadius={'20px'} spacing={0} className='chat-area'>

        <CommunityChatHeader />

        <Box width='100%' height={'100%'} overflowX={'hidden'}   overflowY={'auto'}>
            <VStack spacing={6} paddingX={['10px', '30px']} paddingY='40px' alignItems={'flex-start'} width={'100%'} height={'100%'}>
            {activeCommunity !== null && messages.length > 0 && messages.map((item, index) => {
                return (
                    <>
                        { index === messages.length - 1 ? (
                            <MessageCard id='lastMsg' ref={lastChildRef} key={index.toString()} message={item} />
                        ):(
                            <MessageCard  id={undefined} key={index.toString()} message={item} />
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

        <TextArea />
    </VStack>
  )
}

export default MainArea