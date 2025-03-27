import { IDonationList } from '@/models/donation'
import { formatNumber } from '@/utils/numberFormat'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import CircularProgressBar from '../sharedComponent/circleGraph'
import useCustomTheme from '@/hooks/useTheme'
import { formatNumberWithK } from '@/utils/formatNumberWithK'

export default function DonationGraph({ item, rounded, IsEvent, isPicked }: { item: IDonationList, rounded?: string, IsEvent?: boolean, isPicked?: boolean }) {

    const {
        bodyTextColor, borderColor
    } = useCustomTheme()

    return (
        <Flex w={"full"} borderWidth={(IsEvent || isPicked) ? "0px" : "1px"} borderTopWidth={"1px"} alignItems={"center"} borderColor={borderColor} rounded={rounded ? rounded : (IsEvent || isPicked) ? "0px" : "8px"} h={["fit-content", "fit-content", (isPicked || IsEvent) ? "fit-content" : "90px"]} px={rounded ? "20px" : (IsEvent || isPicked) ? "0px" : "8px"} pt={(IsEvent || isPicked) ? "5px" : "0px"} justifyContent={"space-between"} >
            <Flex flexDirection={"column"} >
                <Text fontSize={isPicked ? "10px" : ["10px", "12px", "14px"]} color={bodyTextColor} >Target</Text>
                <Text fontWeight={"600"} fontSize={isPicked ? "10px" : ["14px", "14px", "14px"]} >{formatNumberWithK(item?.goal, true)}</Text>
            </Flex>
            <Flex flexDirection={"column"} >
                <Text fontSize={isPicked ? "10px" : ["10px", "12px", "14px"]} color={bodyTextColor} >Amount </Text>
                <Text fontWeight={"600"} fontSize={isPicked ? "10px" : ["14px", "14px", "14px"]} >{formatNumberWithK(item?.total, true)}</Text>
            </Flex>
            <Flex display={["none", "none", "flex"]} >
                <CircularProgressBar isEvent={IsEvent || isPicked} size={(IsEvent || isPicked) ? 35 : 67} strokeWidth={(IsEvent || isPicked) ? 3 : 10} progress={((Number(item?.total) === 0) && (Number(item?.goal) === 0)) ? 0 : (Number(item?.total) / Number(item?.goal)) * 100 > 100 ? 100 : Number(((Number(item?.total) / Number(item?.goal)) * 100)?.toFixed(2))} />
            </Flex>
            <Flex display={["flex", "flex", "none"]} >
                <CircularProgressBar isEvent={IsEvent || isPicked} size={(IsEvent || isPicked)  ? 35 : 67} strokeWidth={(IsEvent || isPicked)  ? 3 : 10} progress={((Number(item?.total) === 0) && (Number(item?.goal) === 0)) ? 0 : (Number(item?.total) / Number(item?.goal)) * 100 > 100 ? 100 : Number(((Number(item?.total) / Number(item?.goal)) * 100)?.toFixed(2))} />
            </Flex>
        </Flex>
    )
}
