import { IMAGE_URL } from '@/services/urls'
import { Box, Flex, Image, Text } from '@chakra-ui/react' 
import React from 'react'

interface Props {
    data: any,
    size: number,
    font?: string
}

function CommunityImage(props: Props) {
    const {
        data,
        size,
        font
    } = props

    return (
        <Box roundedBottom={"64px"} roundedTopLeft={"64px"} borderColor={"#D0D4EB"} w={size} h={size} borderWidth={"5px"} >
            {data?.data?.imgMain?.value &&
                <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={data.data.imgSrc} width={"full"} height={"full"} src={IMAGE_URL + data.data.imgSrc} />
            }
            {!data?.data?.imgMain?.value && (
                <Flex justifyContent={"center"} alignItems={"center"} width={"full"} height={"full"} fontSize={font ? font : "30px"} fontWeight={"bold"} >
                    <Text>{data?.data?.name?.charAt(0).toUpperCase()}{data?.data?.name?.charAt(1).toUpperCase()}</Text>
                </Flex> 
            )}
        </Box> 
    )
}

export default CommunityImage
