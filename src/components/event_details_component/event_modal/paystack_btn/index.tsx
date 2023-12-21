import { PayStackLogo } from '@/components/svg'
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import usePaystackStore from '@/global-state/usePaystack';
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
// import useModalStore from '@/global-state/useModalSwitch';
// import { useRouter } from 'next/navigation';

interface Props {
    selectedCategory: any,
    ticketCount: any,
    datainfo: any
}

function PayStackBtn(props: Props) {
    const {
        selectedCategory,
        ticketCount,
        datainfo
    } = props

    const queryClient = useQueryClient()
    const toast = useToast()
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const { configPaystack, setPaystackConfig } = usePaystackStore((state) => state);
    const [config, setConfig] = React.useState({} as any)

    const createTicket = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_TICKET, data),
        onSuccess: (data: any) => {
            setConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderId
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

    // console.log(config);
    

    return (
        <Flex onClick={clickHandler} as={"button"}  flexDir={"column"} width={"full"} justifyContent={(createTicket?.isLoading) ? "center" : "start"} px={"4"} mt={"6"} borderColor={"#D0D4EB"} borderWidth={"1px"} gap={"3"} py={"8"} bg={"#F4F5FA"} rounded={"lg"} alignItems={"center"} >
            {/* {!config?.email && ( */}
                <LoadingAnimation fix_height={true} loading={(createTicket?.isLoading)} >
                    <PayStackLogo />
                </LoadingAnimation>
            {/* )} */}
            {/* {config?.email && (
                <Fundpaystack id={datainfo?.id} config={config} setConfig={setPaystackConfig} />
            )} */}
            {/* <Fundpaystack id={datainfo?.id} config={config} setConfig={setPaystackConfig} /> */}
        </Flex>
    )
}

export default PayStackBtn
