import httpService from '@/utils/httpService';
import React from 'react' 
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from '@chakra-ui/react'
import useSettingsStore from '@/global-state/useSettingsState';

interface Props {  
    config: any,  
    setConfig: any,
	fund?: boolean,
	id?: any
}

function Fundpaystack(props: Props) {
    const {  config, setConfig, fund, id } = props

	const queryClient = useQueryClient() 
	
	const initializePayment: any = usePaystackPayment(config); 
    const toast = useToast()
	const { setAmount } = useSettingsStore((state) => state); 
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY; 

	const [orderCode, setOrderCode] = React.useState("")
	    // mutations 
	const payStackFundMutation = useMutation({
		mutationFn: (data: any) => httpService.get(`/payments/api/wallet/verifyFundWalletWeb?transactionID=${orderCode}`),
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

            queryClient.invalidateQueries(['event_ticket' + id])
            queryClient.invalidateQueries(['all-events-details' + id])

            window.location.reload()
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
		if(fund) {
			payStackMutation.mutate(reference?.reference)
		} else {
			payStackMutation.mutate(reference?.reference)
		}
	};    

	
	// you can call this function anything
	const onClose = () => {
	  // implementation for  whatever you want to do when the Paystack dialog closed.
	  console.log('closed')
	}

	React.useEffect(()=> { 
		if(config?.reference?.length !== 0) {  
			initializePayment(onSuccess, onClose) 
		} 
	}, [config?.reference])


	// React.useEffect(()=> { 
    //     if (orderCode) {  
	// 		if(fund) {
	// 			payStackMutation.mutate(orderCode);
	// 		}
    //         return;
    //     } 
    // }, [orderCode]);
 
    return (
        <></>
    )
}

export default Fundpaystack
