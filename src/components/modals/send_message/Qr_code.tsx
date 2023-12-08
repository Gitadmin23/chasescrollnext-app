import CustomButton from '@/components/general/Button';
import CustomText from '@/components/general/Text';
import { WEBSITE_URL } from '@/services/urls';
import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import router from 'next/router';
import React from 'react'
import { IoClose } from 'react-icons/io5';
import QRCode from "react-qr-code";
import { useReactToPrint } from 'react-to-print';
import {
    exportComponentAsJPEG, 
} from "react-component-export-image";

interface Props {
    id: string | number;
    close: any,
    data?: any
}

function Qr_code(props: Props) {
    const {
        id,
        close,
        data
    } = props

    const componentRef: any = React.useRef(); 

    return (
        <Flex flexDir={"column"} roundedTop={"6px"} alignItems={"center"} pb={"8"} >
            <Box onClick={() => close(false)} as='button' width={"25px"} zIndex={30} position={"absolute"} top={"5"} right={"2"} >
                <IoClose size={"25px"} color="white" />
            </Box>
            <Flex height={["450px"]} ref={componentRef} flexDir={"column"} alignItems={"center"} width={"full"} roundedTop={"6px"} >

                <Box height={"300px"} roundedTop={"6px"} width={"full"} roundedBottom={"full"} zIndex={10} style={{ background: "#5D70F9" }} />

                <Flex position={"absolute"} bg={"transparent"} left={"0px"} right={"0px"} flexDir={"column"} alignItems={"center"} width={"full"} roundedTop={"6px"} >
                    <Flex pt={"4"} zIndex={20}  >
                        <HStack justifyContent={'center'}>
                            <Image src='/assets/images/chasescroll-logo.png' width={30} height={30} alt='logo' />
                            <CustomText fontWeight={"bold"} fontFamily={'Satoshi-Regular'} color='#FFF'>Chasescroll</CustomText>
                        </HStack>
                    </Flex>
                    <Flex  zIndex={20} justifyContent={"center"} roundedTop={"6px"} pt={"4"} color={"white"} width={"full"} >
                        <Text fontWeight={"semibold"} >Event Name: {data?.eventName?.length >= 16 ? data?.eventName?.slice(0, 16)+"..." : data?.eventName}</Text>
                    </Flex>
                    <Flex justifyContent={"center"} flex={1} width={"full"} pt={"6"} > 
                        <Box  zIndex={20} width={["80%", "60%"]} shadow={"lg"} bg={"white"} p={"3"} rounded={"md"} >
                            <QRCode
                                style={{ height: "auto", maxWidth: "100%", width: "100%", zIndex: 20 }}
                                value={`${WEBSITE_URL}/event/${id}`}
                                viewBox={`0 0 256 256`}
                            />
                        </Box>
                    </Flex>
                    <Text my={"4"} color={"#121212CC"} >Scan here and get Your Event Link</Text>
                </Flex>
            </Flex> 
            <CustomButton maxWidth={"300px"} backgroundColor={"#8893E4"} onClick={() => exportComponentAsJPEG(componentRef)} text='Download QR-Code' />
        </Flex>
    )
}

export default Qr_code
