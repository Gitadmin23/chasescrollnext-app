import { MessageIcon } from '@/components/svg';
import httpService from '@/utils/httpService';
import { Box, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useMutation } from 'react-query';

interface Props { 
    profile: any,
    userId: string | number
}

function ChatBtn(props: Props) {
    const { 
        profile,
        userId
    } = props


    const { isLoading: createChatLoading, mutate } = useMutation({
        mutationFn: () => httpService.post('/chat/chat', {
            image: `${profile?.data?.imgMain?.value}`,
            name: profile?.username,
            type: 'ONE_TO_ONE',
            typeID: userId,
            users: [
                userId,
            ]
        }),
        onSuccess: (data) => {
            // navigate(`/message?messageId=${data.data.id}`);
        },
        onError: (errror) => {
            // toast.error('An error occured whilw trying to initiate chat');
        }
    })

    return (
        <Box as='button' onClick={()=> mutate()} > 
            {createChatLoading && <Spinner colorScheme="black" />}
            {!createChatLoading && 
            <MessageIcon />}
        </Box>
    )
}

export default ChatBtn
