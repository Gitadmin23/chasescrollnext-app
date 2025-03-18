import React from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { Checkbox, Flex, Text } from '@chakra-ui/react';

export default function ListService({ selectService, service }: { selectService: any, service: Array<string> }) {


    const { isLoading, data: serviceData } = useQuery(['get-business-categories'], () => httpService.get('/business-service/categories'), {
        refetchOnMount: true,
        onError: (error: any) => { },
    });

    const selectServiceHandle = (data: string) => {
        const clone: any = [...service]
        if (service?.includes(data)) {
            let index = clone.indexOf(data);
            clone.splice(index, 1);
            selectService(clone)
        } else {
            selectService([...clone, data])
        }
    }

    return (
        <LoadingAnimation loading={isLoading} length={serviceData?.data?.length} >
            <Flex w={"full"} maxH={"300px"} flexDir={"column"} gap={"3"} bgColor={"#EAEBEDCC"} rounded={"16px"} overflowY={"auto"} pos={"relative"} >
                {serviceData?.data?.map((item: string, index: number) => {
                    return (
                        <Flex key={index} as={"button"} onClick={() => selectServiceHandle(item)} w={"full"} h={"fit-content"} >
                            <Flex w={"full"} h={"53px"} px={"4"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={"##EAEBEDCC"} alignItems={"center"} >
                                <Text fontSize={"14px"} >{item}</Text>
                                <Checkbox isChecked={service?.includes(item) ? true : false} />
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </LoadingAnimation>
    )
}
