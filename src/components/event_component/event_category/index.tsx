import useSearchStore from '@/global-state/useSearchData';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import React from 'react'
import { useQuery } from 'react-query';

interface Props { }

function EventCategory(props: Props) {
    const { } = props

    const [data, setData] = React.useState([] as any) 
    const toast = useToast()

    const { event_category, setEventCategory } = useSearchStore((state) => state);

    // react query
    const { isLoading, isRefetching } = useQuery(['event_type'], () => httpService.get(URLS.EVENT_TYPE), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data.data);
        }
    })

    const clickHandler =(item: string)=> {
        setEventCategory(item)
    }

    return (
        <Flex pb={"8"} flexDirection={"column"} overflowX={"hidden"} >
            <Box width={"full"} overflowX={"auto"} >
                <Flex gap={"4"} width={"fit-content"} py={"4"} >
                    <Button onClick={()=> setEventCategory("All Event")} width={"150px"} height={"45px"} fontSize={"sm"} fontWeight={"semibold"} bg={!event_category ? "brand.chasescrollBlue" : "#98929214"} color={!event_category ? "white" : ""} >All Event</Button>
                    {data?.map((item: any) => {
                        return (
                            <Button onClick={()=> clickHandler(item)} key={item} width={"180px"} height={"45px"} fontSize={"sm"} fontWeight={"semibold"} bg={event_category === item ? "brand.chasescrollBlue" : "#98929214"} borderColor={"brand.chasescrollBlue"} borderWidth={"1px"} color={event_category === item ? "white" : "brand.chasescrollBlue"} >{item?.split("_")?.join(" ")}</Button>
                        )
                    })}
                </Flex>
            </Box>
        </Flex>
    )
}

export default EventCategory
