import { MessageIcon } from '@/components/svg';
import { Chat } from '@/models/Chat';
import { WEBSITE_URL } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
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

    const router = useRouter()

    const { isLoading: chatCreationLoading, mutate } = useMutation({
        mutationFn: () => httpService.post(`/chat/chat`, {
            type: 'ONE_TO_ONE',
            users: [
                userId,
            ]
        }),
        onSuccess: (data) => {
            const chat = data?.data as Chat;
            const obj = {
                message: `${WEBSITE_URL}/share?type=ONE_TO_ONE&typeID=${userId}`,
                chatID: chat?.id,
            }
            router.replace(`/dashboard/chats?activeID=${obj?.chatID}`)
            // sendMessage.mutate(obj)
        }

    });

    // const { isLoading: createChatLoading, mutate } = useMutation({
    //     mutationFn: () => httpService.post('/chat/chat', {
    //         image: `${profile?.data?.imgMain?.value}`,
    //         name: profile?.username,
    //         type: 'ONE_TO_ONE',
    //         typeID: userId,
    //         users: [
    //             userId,
    //         ]
    //     }),
    //     onSuccess: (data) => {
    //         // navigate(`/message?messageId=${data.data.id}`);
    //     },
    //     onError: (errror) => {
    //         // toast.error('An error occured whilw trying to initiate chat');
    //     }
    // })

    return (
        <Box as='button' onClick={()=> mutate()} > 
            {chatCreationLoading && <Spinner colorScheme="black" />}
            {!chatCreationLoading && 
            <MessageIcon />}
        </Box>
    )
}

export default ChatBtn
