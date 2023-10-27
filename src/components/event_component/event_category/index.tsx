import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import React from 'react'
import { useQuery } from 'react-query';

interface Props { }

function EventCategory(props: Props) {
    const { } = props

    const [data, setData] = React.useState([] as any)
    const [type, setType] = React.useState("All Event")
    const toast = useToast()

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

    return (
        <Flex pb={"8"} flexDirection={"column"} overflowX={"hidden"} >
            <Box width={"full"} overflowX={"auto"} >
                <Flex gap={"4"} width={"fit-content"} py={"4"} >
                    <Button width={"235px"} height={"45px"} fontWeight={"semibold"} bg={type === "All Event" ? "brand.chasescrollBlue" : "#98929214"} color={type === "All Event" ? "white" : ""} >All Event</Button>
                    {data?.map((item: any) => {
                        return (
                            <Button key={item} width={"235px"} height={"45px"} fontWeight={"semibold"} bg={type === item ? "brand.chasescrollBlue" : "#98929214"} color={type === item ? "white" : ""} >{item?.split("_")?.join(" ")}</Button>
                        )
                    })}
                </Flex>
            </Box>
        </Flex>
    )
}

export default EventCategory
