import CommunityImage from '@/components/sharedComponent/community_image'
import JoinOrLeaveCommunityBtn from '@/components/sharedComponent/join_leave_community_btn'
import { Box, Flex, Text } from '@chakra-ui/react' 
import React from 'react'

interface Props {
    data: any
}

function CommunityCard(props: Props) {
    const {
        data
    } = props

    return (
        <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"} py={"3"} px={"5"} >
            <Flex gap={"3"} >
                <Box width={"fit-content"} >
                    <CommunityImage data={data} size={20} />
                </Box>
                <Box>
                    <Text fontSize={["16px", "20px"]} fontWeight={"medium"} >{data.data.name}</Text>
                    <Text mb={"2px"} fontSize={["12px"]} fontWeight={"medium"} color={"#2E2B2BAB"} >{data.data.description}</Text> 
                    <Box rounded={"2px"} bg={data.data.isPublic ? "brand.chasescrollPalePurple" : "#FBCDCD"} fontWeight={"semibold"} color={data.data.isPublic ? "brand.chasescrollBlue" : "#E90303"} fontSize={"10px"} py={"1"} display={"flex"} justifyContent={"center"} width={"50px"} >
                        {data.data.isPublic ? 'Public' : 'Private'}
                    </Box>
                </Box>
            </Flex>
            <JoinOrLeaveCommunityBtn data={data} />
        </Flex>
    )
}

export default CommunityCard