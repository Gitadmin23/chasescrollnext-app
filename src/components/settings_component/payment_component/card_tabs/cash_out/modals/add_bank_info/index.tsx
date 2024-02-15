import httpService from '@/utils/httpService';
import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query';
import { useToast, Box, Text, Select, Input, Flex } from '@chakra-ui/react';
import CustomButton from '@/components/general/Button';
import axios from "axios"
import { GreenTick } from '@/components/svg';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import AccountList from './account_list';

interface Props {
    close: any,
    setAccountName: any,
    accountName: string,
    withdraw: any,
    transferRecipient: string,
    setTransferRecipient: any,
    loading?: boolean
}

function AddBankInfo(props: Props) {
    const {
        close,
        setAccountName,
        accountName,
        withdraw,
        setTransferRecipient,
        loading
    } = props


    const [bankName, setBankName] = React.useState("")
    const [accountNumber, setAccountNumber] = React.useState("")
    // const [transferRecipient, setTransferRecipient] = React.useState("")
    const [data, setData] = React.useState([] as any)
    const toast = useToast()

    // react query
    const { isLoading, isRefetching } = useQuery(['get-bank-list'], () => axios.get("https://api.paystack.co/bank"), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data?.data?.data);

            console.log(data);
            
        }
    })

    // mutations 
    const payStackMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/payments/account/onboardPaystack`, data),
        onSuccess: (data: any) => {
            // queryClient.invalidateQueries(['EventInfo'+id]) 

            toast({
                title: 'Success',
                description: "Bank Details Added",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            setTransferRecipient(data?.data?.transferRecipient)
            setAccountName(data?.data?.accountName)
            // close(false)
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

    React.useEffect(() => {
        if (accountNumber.length >= 10 && bankName) {
            payStackMutation.mutate({
                account_number: accountNumber,
                bank_code: bankName
            })
        }
    }, [accountNumber, bankName])

    return (
        <Box width={"full"} padding={"6"} >
            <AccountList withdraw={withdraw} setTransferRecipient={setTransferRecipient} />
            <Text>Bank Name</Text>
            <Select onChange={(e) => setBankName(e.target.value)} placeholder="Select Bank" >
                {data?.map((item: any, index: number) => {
                    return (
                        <option key={index} value={item?.code} >{item?.name}</option>
                    )
                })}
            </Select>
            <Text mt={"3"}>Account Number</Text>
            <Input type='number' onChange={(e) => setAccountNumber(e.target.value)} placeholder="0000000000" />
            <LoadingAnimation loading={payStackMutation?.isLoading} >
                {accountName &&
                    <Flex alignItems={"center"} gap={"2"} mt={"4"} color={"#00F562"}  >
                        <GreenTick />
                        {accountName}
                    </Flex>
                }
            </LoadingAnimation>
            <CustomButton isLoading={loading} isDisabled={loading} onClick={withdraw} text='Transfer' mt={"5"} />
        </Box >
    )
}

export default AddBankInfo 
