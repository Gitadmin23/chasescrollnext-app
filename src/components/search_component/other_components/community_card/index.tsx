import CommunityImage from '@/components/sharedComponent/community_image'
import JoinOrLeaveCommunityBtn from '@/components/sharedComponent/join_leave_community_btn'
import { Box, Flex, Text } from '@chakra-ui/react' 
import React from 'react'

interface Props {
    data: any,
    searchbar?: boolean,
    profile?: boolean
}

function CommunityCard(props: Props) {
    const {
        data,
        searchbar,
        profile
    } = props

    return (
        <Flex width={"full"} borderBottomWidth={searchbar ? "1px" : "0px"} justifyContent={"space-between"} alignItems={"center"} py={"2"} >
            <Flex gap={searchbar ? "3": "6"} width={"full"}  alignItems={"center"}  >
                <Box width={"fit-content"} >
                    <CommunityImage data={data} size={searchbar?  "50px" : "70px"} font={searchbar ? "16px": "30px"} />
                </Box>
                <Box mt={searchbar ? "0px": "-6px"} >
                    <Text fontSize={searchbar ? "14px" :["16px", "16px"]} fontWeight={"medium"} >{data.data.name}</Text>
                    <Text mb={"2px"} fontSize={searchbar ? "10px" : ["12px"]} fontWeight={"medium"} color={"#2E2B2BAB"} >{data.data.description}</Text> 
                    <Box rounded={"2px"} bg={data.data.isPublic ? "brand.chasescrollPalePurple" : "#FBCDCD"} fontWeight={"semibold"} color={data.data.isPublic ? "brand.chasescrollBlue" : "#E90303"} fontSize={"10px"} py={"1"} display={"flex"} justifyContent={"center"} width={"50px"} >
                        {data.data.isPublic ? 'Public' : 'Private'}
                    </Box>
                </Box>
            </Flex>
            {!profile && (
                <JoinOrLeaveCommunityBtn width={searchbar ? "120px" : "120px"} height={searchbar ? "30px" : "45px"} data={data} />
            )}
        </Flex>
    )
}

export default CommunityCard