import { MessageIcon } from '@/components/svg';
import { Chat } from '@/models/Chat';
import { WEBSITE_URL } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useMutation } from 'react-query';

interface Props { 
    profile?: any,
    userId: string | number
}

function ChatBtn(props: Props) {
    const {  
        userId
    } = props

    const router = useRouter()

    const { isLoading: chatCreationLoading, mutate } = useMutation({
        mutationFn: () => httpService.post(`/chat/chat`, {
            type: 'ONE_TO_ONE',
            typeID: userId,
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
            router.push(`/dashboard/chats?activeID=${obj?.chatID}`)
            // sendMessage.mutate(obj)
        }

    }); 

    return (
        <Box as='button' disabled={chatCreationLoading} onClick={()=> mutate()} > 
            {chatCreationLoading && <Spinner colorScheme="black" />}
            {!chatCreationLoading && 
            <MessageIcon />}
        </Box>
    )
}

export default ChatBtn
