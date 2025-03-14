import httpService from '@/utils/httpService';
import React, { useState } from 'react'
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "react-query";
import { Button, Flex, Text, useColorMode, useToast } from '@chakra-ui/react'
import useSettingsStore from '@/global-state/useSettingsState';
import { useRouter } from 'next/navigation';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import CustomButton from '@/components/general/Button';
import { SuccessIcon } from '@/components/svg';
import useCustomTheme from "@/hooks/useTheme";
import useStripeStore from '@/global-state/useStripeState';
import useModalStore from '@/global-state/useModalSwitch';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';

interface IMessage {
    donation: boolean,
    booking: boolean,
    product: boolean,
    rental: boolean,
    service: boolean, 
}

interface Props {
    config: any,
    setConfig: any,
    fund?: boolean,
    id?: any, 
    message: IMessage 
}

function Fundpaystack(props: Props) {
    const { config, setConfig, fund, id, message } = props;

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


    const [loading, setLoading] = useState(true)

    const initializePayment: any = usePaystackPayment(config);
    const toast = useToast()
    const { setAmount } = useSettingsStore((state) => state);
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const { push } = useRouter()

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
            setLoading(false)
            setOpen(false)
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
        onSuccess: (data: any) => { 
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
            setLoading(false) 
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
        setOpen(true)
        setLoading(true)
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
    }

    React.useEffect(() => {
        if (config?.reference?.length !== 0) {
            initializePayment(onSuccess, onClose)
        }
    }, [config?.reference]) 

    const { setModalTab } = useStripeStore((state: any) => state);
    const { setShowModal } = useModalStore((state) => state);

    const clickHandler = () => {
        setOpen(false)
        setModalTab(5)
        setShowModal(true)
    } 

    const closeHandler = () => {
        if(message?.product) {
            setOpen(true)
        } else  {
            setOpen(false)
        }
    }

    return (
        <>
            <ModalLayout open={open} close={closeHandler} bg={secondaryBackgroundColor} closeIcon={message?.product ? false : true} >
                <LoadingAnimation loading={loading} >
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{message?.service ? "Booking Successful" : message?.rental ? "Rental Purchase Successful" : message?.product ? "Product Purchase Successful" : message?.donation ? "Donated Successful" : "Ticket Purchase Successful"}</Text>
                        <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{(message?.product || message?.service || message?.rental) ? "Thank you!" : message?.donation ? `Thank you! Your generous donation makes a real difference. We’re so grateful for your support!` : `Congratulations! you can also find your ticket on the Chasescroll app, on the details page click on the view ticket button.`}</Text>
                        {(!message?.donation && !message?.product  && !message?.service && !message?.rental) && (
                            <CustomButton onClick={() => clickHandler()} color={primaryColor} text={'View Order'} w={"full"} backgroundColor={"#F7F8FE"}  />
                        )}
                        {(message?.product) && (
                            <CustomButton onClick={() => push(`/dashboard/kisok/details-order/${id}`)} color={primaryColor} text={'View Order'} w={"full"} backgroundColor={"#F7F8FE"} />
                        )}
                        {(message?.rental) && (
                            <CustomButton onClick={() => setOpen(false)} color={primaryColor} text={'Close'} w={"full"} backgroundColor={"#F7F8FE"} />
                        )}
                    </Flex>
                </LoadingAnimation>
            </ModalLayout> 
        </>
    )
}

export default Fundpaystack
