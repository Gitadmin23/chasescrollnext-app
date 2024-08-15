import CustomText from '@/components/general/Text'
import { useDetails } from '@/global-state/useUserDetails'
import { IMAGE_URL } from '@/services/urls'
import {Box, Flex, HStack, Image, Text, useColorMode, VStack} from '@chakra-ui/react'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    data?: any,
    image: any,
    size: any,
    font?: any,
    border?: any,
    fontWeight?: any, 
    firstName?: string,
    lastName?: string
}

function UserImage(props: Props) {
    const {
        data,
        image,
        size,
        font,
        border,
        fontWeight,
        firstName,
        lastName
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    console.log(image);
    

    return (
        <Box roundedBottom={"64px"} roundedTopLeft={"64px"} borderColor={borderColor} w={size} h={size} bg={secondaryBackgroundColor} borderWidth={border? border :"4px"} >
            {image !== null &&
                <>
                    { (image?.includes('http')) && <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={"I"} width={"full"} height={"full"} src={image?.replace("http://ec2-3-128-192-61.us-east-2.compute.amazonaws.com:8080/resource-api/download/", "https://chaseenv.chasescroll.com/resource-api/download/")} /> } 

                    { !image?.includes('http') && <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={"I"} width={"full"} height={"full"} src={IMAGE_URL + image} /> }
                </>
            }
            {image === null && (
                <Flex justifyContent={"center"} alignItems={"center"} width={"full"} height={"full"} fontSize={font ? font : "30px"} fontWeight={fontWeight? fontWeight : "bold"} >
                    <Text color={bodyTextColor}>{firstName?.charAt(0).toUpperCase() ?? data?.firstName?.charAt(0).toUpperCase()}{lastName?.charAt(0).toUpperCase() ?? data?.lastName?.charAt(0).toUpperCase()}</Text>
                </Flex> 
            )}
        </Box>
    )
}

export default UserImage
