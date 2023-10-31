import { useCommunityPageState } from '@/app/dashboard/community/chat/state'
import CustomText from '@/components/general/Text';
import { Box, VStack } from '@chakra-ui/react';
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

function MainArea() {
    const [posts, setPosts] = React.useState<IMediaContent[]>([]);

    const { userId: myId } = useDetails((state) => state)
    const { activeCommunity } = useCommunityPageState((state) => state);
    const { isLoading, } = useQuery(['getMessages', activeCommunity?.id], () => httpService.get(`${URLS.GET_GROUP_MESSAGES}`, {
        params: {
            groupID: activeCommunity?.id,
        }
    }), {
        enabled: activeCommunity !== null,
        onSuccess: (data) => {
            const item: PaginatedResponse<IMediaContent> = data.data
            console.log(data.data);
            if (posts.length > 0) {
                const arr = [...posts, ...item.content];
                setPosts(uniqBy(arr, 'id'));
            }
            setPosts(uniqBy(item.content, 'id'));
        },
        onError: (error: any) => {}
    })
    if (activeCommunity === null) {
        return (
            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'DM-Medium'} color='brand.chasescrollButtonBlue'>Start Conversations</CustomText>

                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'DM-Medium'} color='brand.chasescrollButtonBlue'>Gist with friends</CustomText>
            </VStack>
        )
    }
  return (
    <VStack width='100%' height="100%" overflow={'hidden'} borderRadius={'20px'} spacing={0}>
        <CommunityChatHeader />
        <Box flex={1} width='100%' height={'100%'} bg='whitesmoke' overflowX={'hidden'} overflowY={'auto'}>
            <VStack spacing={6} paddingX={['10px', '30px']} paddingY='40px' alignItems={'flex-start'} width={'100%'} height={'100%'}>
            {posts.length > 0 && posts.map((item, index) => {
                return (
                    <MessageCard key={index.toString()} message={item} />
                )
            })}
            </VStack>
        </Box>
        <TextArea />
    </VStack>
  )
}

export default MainArea