import httpService from '@/utils/httpService';
import React, { useState } from 'react'
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "react-query";
import {Button, Flex, Text, useColorMode, useToast} from '@chakra-ui/react'
import useSettingsStore from '@/global-state/useSettingsState';
import { useRouter } from 'next/navigation';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import CustomButton from '@/components/general/Button';
import { SuccessIcon } from '@/components/svg';
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    config: any,
    setConfig: any,
    fund?: boolean,
    id?: any
}

function Fundpaystack(props: Props) {
    const { config, setConfig, fund, id } = props;

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const queryClient = useQueryClient()

    const [open, setOpen] = useState(false)

    const initializePayment: any = usePaystackPayment(config);
    const toast = useToast()
    const { setAmount } = useSettingsStore((state) => state);
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const router = useRouter()

    // const [orderCode, setOrderCode] = React.useStates("")
    // mutations 
    const payStackFundMutation = useMutation({
        mutationFn: (data: any) => httpService.get(`/payments/api/wallet/verifyFundWalletWeb?transactionID=${data}`),
        onSuccess: (data) => {
            // queryClient.invalidateQueries(['EventInfo'+id]) 

            toast({
                title: 'Success',
                description: "Payment verified",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            queryClient.invalidateQueries(['get-wallet-balanceNGN'])
            setAmount("")
            setConfig({
                email: "",
                amount: 0,
                reference: "",
                publicKey: PAYSTACK_KEY,
            })
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: "Error Occurred",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const payStackMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/payments/verifyWebPaystackTx?orderCode=${data}`),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: "Payment verified",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            queryClient.invalidateQueries(['event_ticket'])
            queryClient.invalidateQueries(['all-events-details'])

            // router.push("/dashboard/event/my_event")
            setOpen(true)

            // window.location.reload()
            // setShowModal(false)
        },
        onError: () => {
            toast({
                title: 'Error',
                description: "Error Occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const onSuccess = (reference: any) => {
        if (fund) {
            payStackFundMutation.mutate(reference?.reference)
        } else {
            payStackMutation.mutate(reference?.reference)
        }
    };


    // you can call this function anything
    const onClose = () => {
        setConfig({
            email: "",
            amount: 0,
            reference: "",
            publicKey: PAYSTACK_KEY,
        })
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    React.useEffect(() => {
        if (config?.reference?.length !== 0) {
            initializePayment(onSuccess, onClose)
        }
    }, [config?.reference])

    // const clickHandler =()=> {
    //     initializePayment(onSuccess, onClose) 
    // }


    return (
        <>
            <ModalLayout open={open} close={setOpen} bg={secondaryBackgroundColor}>
                <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                    <SuccessIcon />
                    <Text fontSize={"24px"} color={bodyTextColor} lineHeight={"44.8px"} fontWeight={"500"} mt={"4"} >Ticket Purchase Successful</Text>
                    <Text fontSize={"12px"} color={bodyTextColor} maxW={"351px"} textAlign={"center"} mb={"4"} >{`Congratulations! You now have a ticket to this event. Kindly proceed to "My Events" to access it.`}</Text>
                    <CustomButton onClick={()=> setOpen(false)} color={"#12299C"} text='Close' w={"full"} backgroundColor={"white"} border={"1px solid #12299C75"} />
                </Flex> 
            </ModalLayout>
            {/* <Button onClick={()=> clickHandler()} bgColor={"blue.400"} color={"white"} >Pay</Button> */}
        </>
    )
}

export default Fundpaystack
