import { IDonationList } from '@/models/donation'
import { formatNumber } from '@/utils/numberFormat'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import CircularProgressBar from '../sharedComponent/circleGraph'
import useCustomTheme from '@/hooks/useTheme'

export default function DonationGraph( { item, rounded } : {item : IDonationList, rounded?: string}) {

    const {
        bodyTextColor, borderColor
    } = useCustomTheme()

    return (
        <Flex w={"full"} borderWidth={"1px"} alignItems={"center"} borderColor={borderColor} rounded={rounded ? rounded : "8px"} py={"3"} px={rounded ? "20px" : "8px"} justifyContent={"space-between"} >
            <Flex flexDirection={"column"} >
                <Text color={bodyTextColor} >Target</Text>
                <Text fontWeight={"600"} >{formatNumber(item?.goal)}</Text>
            </Flex>
            <Flex flexDirection={"column"} >
                <Text color={bodyTextColor} >Amount </Text>
                <Text fontWeight={"600"} >{formatNumber(item?.total)}</Text>
            </Flex>
            <CircularProgressBar progress={((Number(item?.total) === 0) && (Number(item?.goal) === 0)) ? 0 :(Number(item?.total) / Number(item?.goal)) * 100 > 100 ? 100 : Number(((Number(item?.total) / Number(item?.goal)) * 100)?.toFixed(2))} />
        </Flex>
    )
}
