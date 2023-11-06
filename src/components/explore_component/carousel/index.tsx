import { CustomCarousel } from '@/components/customCarousel';
import { IMAGE_URL } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Image, useToast, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React from 'react'
import { useQuery } from 'react-query';

interface Props { }

function ExploreCarousel(props: Props) {
    const { } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const router = useRouter()

    // react query
    const { isLoading, isRefetching } = useQuery(['get-top-events'], () => httpService.get('/events/get-top-events'), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data.data.content); 
        }
    }) 

    return (
        <Box width={"full"} position={"relative"} height={["300px", "300px", "480px"]} >
            {(!isLoading && !isRefetching) && ( 
                <CustomCarousel 
                    slides={
                        data?.map((item: any, index: any)=> {
                            return(  
                                <> 
                                    <Box onClick={()=> router.replace("/dashboard/event/details/" + item?.id)} key={index} role='button'  width={"full"} height={["224px", "224px", "420px"]} className="flex h-56 lg:h-80 flex-col pb-0 w-full relative rounded-[32px]"> 
                                        <Image style={{borderTopLeftRadius: "32px" }} objectFit="cover" alt={item?.currentPicUrl} width={"full"} height={"full"} src={IMAGE_URL + item?.currentPicUrl} />
                                        <Flex roundedBottom={"32px"} height={"50px"} bg={"brand.chasescrollBlue"} alignItems={"center"} fontWeight={"bold"} fontSize={["16px", "16px", "18px"]} color={"white"} py={"4"} justifyContent={"center"} >
                                            <Text>{item?.eventName}</Text>
                                        </Flex>
                                    </Box>
                                </>
                            )
                        })
                    }
                    autoplay={true} interval={5000} 
                />
            )}
        </Box>
    )
}

export default ExploreCarousel
