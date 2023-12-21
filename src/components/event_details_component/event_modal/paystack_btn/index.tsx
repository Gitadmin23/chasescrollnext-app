import { PayStackLogo } from '@/components/svg'
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'; 
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import usePaystackStore from '@/global-state/usePaystack';
// import useModalStore from '@/global-state/useModalSwitch';
// import { useRouter } from 'next/navigation';

interface Props {
    selectedCategory: {
        ticketType: string
    },
    ticketCount: any,
    datainfo: {
        id: any
    }
}

function PayStackBtn(props: Props) {
    const {
        selectedCategory,
        ticketCount,
        datainfo
    } = props 

    const queryClient = useQueryClient()
    const toast = useToast() 
 
    const { configPaystack, setPaystackConfig } = usePaystackStore((state) => state);

    const createTicket = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_TICKET, data),
        onSuccess: (data: any) => {  
            setPaystackConfig({
                ...configPaystack,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
        },
        onError: (error) => {
            // console.log(error);
            toast({
                title: 'Error',
                description: "Error Creating Ticket",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });  

    const clickHandler = React.useCallback(() => {
        createTicket.mutate({
            eventID: datainfo?.id,
            ticketType: selectedCategory,
            numberOfTickets: ticketCount
        })
    }, [createTicket])

    return (
        <Flex onClick={clickHandler} as={"button"} width={"full"} justifyContent={(createTicket?.isLoading) ? "center" : "start"} px={"4"} mt={"6"} borderColor={"#D0D4EB"} borderWidth={"1px"} gap={"3"} py={"8"} bg={"#F4F5FA"} rounded={"lg"} alignItems={"center"} >
            <LoadingAnimation fix_height={true} loading={(createTicket?.isLoading)} >
                <PayStackLogo />
            </LoadingAnimation>
        </Flex>
    )
}

export default PayStackBtn
