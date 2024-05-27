import { CategoryRightIcon } from '@/components/svg';
import useSearchStore from '@/global-state/useSearchData';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Select, useToast } from '@chakra-ui/react';
import React from 'react'
import { useQuery } from 'react-query';

interface Props {
    selector?: boolean
}

function EventCategory(props: Props) {
    const {
        selector
    } = props

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

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    return (
        <>
            {!selector && (
                <Flex flexDirection={"column"} overflowX={"hidden"} h={"50px"} justifyContent={"center"} alignItems={"center"} position={"relative"} >
                    <Box ref={ref} width={"full"} overflowX={"auto"} scrollBehavior={"smooth"} sx={
                        {
                            '::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }}>
                        <Flex gap={"9"} width={"fit-content"} pr={"100px"} height={"fit-content"} >

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

                    <Box h={"50px"} justifyContent={"center"} as='button' onClick={() => scroll(400)} pos={"absolute"} w={"fit-content"} right={"0px"} top={"0px"} >
                        <CategoryRightIcon />
                    </Box>
                </Flex>
            )}
            {selector && (
                <Select
                     color={"#5465E0"} backgroundColor={"#F2F4FF"}
                    focusBorderColor={"#F2F4FF"}
                    height={"50px"}
                    fontSize={"sm"}
                    rounded={"50px"}
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
            )}
        </>
    )
}

export default EventCategory
