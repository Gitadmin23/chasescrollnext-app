import useSearchStore from '@/global-state/useSearchData';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Select, useToast } from '@chakra-ui/react';
import React from 'react'
import { useQuery } from 'react-query';

interface Props { }

function EventCategory(props: Props) {
    const { } = props

    const [data, setData] = React.useState([] as string[]);
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

    const clickHandler = (item: string) => {
        if (item === "All Event") {
            setEventCategory("")
        } else {
            setEventCategory(item)
        }
    }

    const handleChange = (item: string) => {
        setEventCategory(item)
    }

    return (
        <Flex pb={"4"} flexDirection={"column"} overflowX={"hidden"} position={"relative"} >
            <Box width={"full"} overflowX={"auto"} >
                <Flex gap={"9"} width={"fit-content"} pr={"260px"} py={"4"}  >

                    <Button onClick={() => clickHandler("")} width={"80px"} _hover={{ backgroundColor: "white" }} rounded={"none"} borderBottom={!event_category ? "1px" : ""} fontSize={"16px"} lineHeight={"150%"} fontWeight={!event_category ? "bold" : "normal"} height={"30px"} bg={"#FFF"} color={!event_category ? "brand.chasescrollBlue" : "#626262"} >All Event</Button>
                    {data?.sort((a: string, b: string) => {
                        if (a > b) {
                            return 1
                        } else {
                            return -1;
                        }
                        return 0;
                    }).map((item: any) => {

                        return (
                            <Button onClick={() => clickHandler(item)} key={item} _hover={{ backgroundColor: "white", borderBottom: "1px" }} rounded={"none"} width={"fit-content"} height={"30px"} fontSize={"sm"} fontWeight={event_category === item ? "bold" : "normal"} bg={"#FFF"} borderBottomColor={"brand.chasescrollBlue"} borderBottom={event_category === item ? "1px" : "0px"} textColor={event_category === item ? "brand.chasescrollBlue" : "#626262"} >{item?.split("_")?.join(" ")}</Button>
                        )
                    })}
                </Flex>
            </Box>

            <Box pos={"absolute"} w={"fit-content"} right={"0px"} top={"4px"} >
                <Select
                    borderWidth={"1px"} color={"#5465E0"} backgroundColor={"#EFF1FE"}
                    focusBorderColor={"#E2E8F0"}
                    height={"50px"}
                    fontSize={"sm"}
                    width={["150px", "auto", "auto"]}
                    onChange={(e) => handleChange(e.target.value)}
                    value={event_category}
                    placeholder='Select Event Type' >
                    {data?.sort((a: string, b: string) => {
                        if (a > b) {
                            return 1
                        } else {
                            return -1;
                        }
                        return 0;
                    })?.map((type: any, index: number) => (
                        <option style={{ fontSize: "12px" }} key={index} value={type}>
                            {type.split("_").join(" ")}
                        </option>
                    ))}
                </Select>
            </Box>
        </Flex>
    )
}

export default EventCategory
