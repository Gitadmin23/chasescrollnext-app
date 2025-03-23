import React from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { IEventType } from '@/models/Event';

export default function ListRental({ updateRental, rental, item }: { updateRental: any, rental: Array<string>, item: IEventType }) {


    const { data: datarental, isLoading } = useQuery(
        ["getcategoryRental"],
        () => httpService.get(`/rental/categories`), {
    }
    );

    const { data: data, isLoading: loading } = useQuery(
        ["gettag", item?.id],
        () => httpService.get(`/tags/search`, {
            params:{
                eventID: item?.id
            }
        }), {
    }
    );

    console.log(data);
    

    const selectRentalHandler = (data: string) => {
        const clone = [...rental]
        if (rental?.includes(data)) {
            let index = clone.indexOf(data); // Find the index of the element 
            clone.splice(index, 1); // Removes the element at the found index  
            updateRental(clone)
        } else {
            updateRental([...clone, data])
        }
    }

    return (
        <LoadingAnimation loading={isLoading} length={datarental?.data?.length} >
            <Flex w={"full"} maxH={"300px"} flexDir={"column"} gap={"3"} bgColor={"#EAEBEDCC"} rounded={"16px"} overflowY={"auto"} pos={"relative"} >
                {datarental?.data?.map((item: string, index: number) => {
                    return (
                        <Flex key={index} as={"button"} onClick={() => selectRentalHandler(item)} w={"full"} h={"fit-content"} >
                            <Flex w={"full"} h={"53px"} gap={"3"} px={"4"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={"##EAEBEDCC"} alignItems={"center"} >
                                <Text textAlign={"left"} fontSize={["12px", "14px", "14px"]} >{item}</Text>
                                <Checkbox isChecked={rental?.includes(item) ? true : false} />
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </LoadingAnimation>
    )
}
