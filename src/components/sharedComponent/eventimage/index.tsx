import { IMAGE_URL } from '@/services/urls'
import { Box, Image } from '@chakra-ui/react'
import React from 'react'

interface Props {
    data: any,
    width: any,
    height: any
}

function EventImage(props: Props) {
    const {
        data,
        width,
        height
    } = props

    return ( 
        <Box roundedBottom={"32px"} roundedTopLeft={"32px"} borderColor={"#D0D4EB"} w={width} h={height} borderWidth={"5px"} > 
            <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit="cover" alt={data?.currentPicUrl} width={"full"} height={"full"} src={IMAGE_URL + data?.currentPicUrl} /> 
        </Box> 
    )
}

export default EventImage
