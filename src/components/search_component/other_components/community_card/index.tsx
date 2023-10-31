import CommunityImage from '@/components/sharedComponent/community_image'
import JoinOrLeaveCommunityBtn from '@/components/sharedComponent/join_leave_community_btn'
import { Box, Flex, Text } from '@chakra-ui/react' 
import React from 'react'

interface Props {
    data: any,
    searchbar?: boolean
}

function CommunityCard(props: Props) {
    const {
        data,
        searchbar
    } = props

    return (
        <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"} py={"2"} >
            <Flex gap={"3"} width={"full"}  alignItems={"center"}  >
                <Box width={"fit-content"} >
                    <CommunityImage data={data} size={searchbar?  "50px" : 20} font={searchbar ? "16px": "30px"} />
                </Box>
                <Box>
                    <Text fontSize={searchbar ? "14px" :["16px", "20px"]} fontWeight={"medium"} >{data.data.name}</Text>
                    <Text mb={"2px"} fontSize={searchbar ? "10px" : ["12px"]} fontWeight={"medium"} color={"#2E2B2BAB"} >{data.data.description}</Text> 
                    <Box rounded={"2px"} bg={data.data.isPublic ? "brand.chasescrollPalePurple" : "#FBCDCD"} fontWeight={"semibold"} color={data.data.isPublic ? "brand.chasescrollBlue" : "#E90303"} fontSize={"10px"} py={"1"} display={"flex"} justifyContent={"center"} width={"50px"} >
                        {data.data.isPublic ? 'Public' : 'Private'}
                    </Box>
                </Box>
            </Flex>
            <JoinOrLeaveCommunityBtn width={searchbar ? "80px" : "120px"} height={searchbar ? "30px" : "45px"} data={data} />
        </Flex>
    )
}

export default CommunityCard