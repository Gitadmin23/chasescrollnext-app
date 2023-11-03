import PeopleCard from '@/components/search_component/other_components/people_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

interface Props {
    user_index: string
}

function ConnectedUser(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)

    // react query
    const { isLoading, isRefetching } = useQuery(['get-joined-network'], () => httpService.get(URLS.GET_USER_CONNECTION_LIST + "" + user_index), {
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
        <Flex width={"400px"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <LoadingAnimation length={data?.length} loading={isLoading} refeching={isRefetching} >
                {data?.map((person: any, i: number) => {
                    return (
                        <Box key={i} width={"full"}>
                            <PeopleCard connects={true} person={person} />
                        </Box>
                    )
                })}
            </LoadingAnimation>
        </Flex>
    )
}

export default ConnectedUser
