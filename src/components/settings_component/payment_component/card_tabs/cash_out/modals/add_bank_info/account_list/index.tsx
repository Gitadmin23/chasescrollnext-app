import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import { RoundArrow } from '@/components/svg';
import httpService from '@/utils/httpService';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

interface Props { 
    withdraw: any,
    loading?: any
}

function AccountList(props: Props) {
    const { 
        withdraw,
        loading
    } = props

    const toast = useToast()
    const [data, setData] = useState([] as any)

    const ref: any = React.useRef(null); 

    const scroll = (scrolloffset : any ) =>{
        ref.current.scrollLeft += scrolloffset 
    };        
    // react query
    const { isLoading, isRefetching } = useQuery(['my-bank-list'], () => httpService.get("/payments/account/paystackBankAccounts"), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data?.data?.content);

        }
    })

    return (
        <Flex flexDir={"column"} width={"full"} >
            <Text lineHeight={"13.02px"} fontSize={"10px"} color={"#626262"} >Recent Transaction</Text>
            <LoadingAnimation loading={isLoading} length={data?.length} >
                <Flex ref={ref} w={"full"} overflowX={"auto"} scrollBehavior={"smooth"} pt={"4"} pb={"1"} mb={"2"} >
                    <Flex w={"auto"} gap={"4"} >
                        {data?.map((item: any, index: number) => {
                            return (
                                <Box key={index} disabled={loading} onClick={() => withdraw(item?.transferRecipient)} as='button' flexWrap={"nowrap"} >
                                    <Box position={"relative"} width={"fit-content"} >
                                        <Text lineHeight={"18.23px"} fontSize={"14px"} fontWeight={"bold"} color={"#121212"} >{item?.accountName}</Text>
                                        <Text lineHeight={"18.23px"} top={"0px"} mt={"-18.23px"} opacity={"0"} fontSize={"14px"} fontWeight={"bold"} color={"#121212"} >Otuekong_Archibong</Text>
                                    </Box>
                                    <Text color={"#B6B6B6"} fontSize={"14px"} fontWeight={"normal"} >{item?.bankName}</Text>
                                </Box>
                            )
                        })} 
                    </Flex>
                </Flex>
            </LoadingAnimation>
            <Flex gap={"2"} width={"full"} justifyContent={"end"} >
                <Box as='button' onClick={() => scroll(-200)} transform={"rotate(180deg)"} >
                    <RoundArrow />
                </Box>
                <Box as='button' onClick={() => scroll(200)} >
                    <RoundArrow />
                </Box>
            </Flex>
        </Flex>
    )
}

export default AccountList
