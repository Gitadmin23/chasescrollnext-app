import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import UserImage from '../userimage'
import { formatNumberWithK } from '@/utils/formatNumberWithK'
import useCustomTheme from "@/hooks/useTheme";
import CustomText from "@/components/general/Text";
import httpService from '@/utils/httpService';
import { IEventType } from '@/models/Event';
import { useQuery } from 'react-query';
import { IUser } from '@/models/User';

interface Props {
    event: IEventType,
    size?: any,
    border?: string,
    fontSize: number,
    refund?: boolean,
    color?: any
}

function DonateUsers(props: Props) {
    const {
        event,
        size,
        border,
        fontSize, 
    } = props

    const { primaryColor } = useCustomTheme();


    // react query
    const { isLoading, isRefetching, data } = useQuery(['donation', event?.id], () => httpService.get('/payments/orders?typeID' + event?.id, {
        params: {
            size: 10,
            page: 1, 
        }
    }))
 
    return (
        <>
            {/* {event?.interestedUsers?.length > 0 && ( */}
                <Flex alignItems={"center"} >
                    {data?.data?.content?.map((item: {
                        buyer: IUser
                    }, index: number) => {
                        if (index <= 2) {
                            return (
                                <Box key={index} ml={index === 0 ? "0px" : "-35px"} >
                                    <UserImage data={item?.buyer} size={size} image={item?.buyer?.data?.imgMain?.value} font={fontSize + "px"} border={border} />
                                </Box>
                            )
                        }
                    })}
                    {data?.data?.totalElements >= 3 &&
                        <Box roundedBottom={"64px"} width={size} fontWeight={"bold"} height={size} fontSize={(fontSize - 2) + "px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-35px"} display={'flex'} bgColor={"#3C41F0"} color={"#fff"} justifyContent={"center"} alignItems={"center"} >
                            {"+" + formatNumberWithK(data?.data?.totalElements - 3)}
                        </Box>
                    } 
                </Flex>
            {/* )} */}
        </>
    )
}

export default DonateUsers
