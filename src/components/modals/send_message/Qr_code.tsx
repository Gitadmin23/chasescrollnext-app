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
    exportComponentAsPDF,
    exportComponentAsPNG
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
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current
    // });

    // "linear-gradient(0deg, rgba(18, 18, 18, 0.10) 0%, rgba(18, 18, 18, 0.10) 100%), linear-gradient(98deg, rgba(93, 112, 249, 0.39) -16.16%, #1732F7 125.87%)"


    const ComponentToPrint = React.forwardRef((props, ref: any): any => (
        <Flex ref={ref} alignItems={"center"} >
            <Flex width={"400px"} mx={"auto"} flexDir={"column"} alignItems={"center"} position={"relative"} roundedTop={"6px"} >
                <Flex pt={"4"} >
                    <HStack zIndex={20} justifyContent={'center'}>
                        <Image src='/assets/images/chasescroll-logo.png' width={30} height={30} alt='logo' />
                        <CustomText fontFamily={'Satoshi-Regular'} color='#FFF'>Chasescroll</CustomText>
                    </HStack>
                </Flex>
                <Flex justifyContent={"center"} roundedTop={"6px"} pt={"4"} color={"white"} zIndex={20} width={"full"} >
                    <Text zIndex={20} fontWeight={"semibold"} >Event Name: {data?.eventName}</Text>
                </Flex>
                <Box position={"absolute"} left={"0px"} right={"0px"} height={"300px"} roundedTop={"6px"} roundedBottom={"full"} zIndex={10} top={"0px"} style={{ background: "#5D70F9" }} />
                <Flex justifyContent={"center"} flex={1} width={"full"} pt={"6"} >
                    <Box width={"60%"} shadow={"lg"} zIndex={20} bg={"white"} p={"3"} rounded={"md"} >
                        <QRCode
                            style={{ height: "auto", maxWidth: "100%", width: "100%", zIndex: 20 }}
                            value={`${WEBSITE_URL}/event/${id}`}
                            viewBox={`0 0 256 256`}
                        />
                    </Box>
                </Flex>
                <Text my={"4"} fontWeight={"semibold"} color={"#121212CC"} >Scan here and get Your Event Link</Text>
            </Flex>
        </Flex>
    ));



    return (
        <Flex flexDir={"column"} roundedTop={"6px"} alignItems={"center"} pb={"8"} >
            <Box onClick={() => close(false)} as='button' width={"25px"} zIndex={30} position={"absolute"} top={"5"} right={"2"} >
                <IoClose size={"25px"} color="white" />
            </Box>
            <Flex height={"450px"} ref={componentRef} flexDir={"column"} alignItems={"center"} width={"full"} roundedTop={"6px"} >

                <Box height={"300px"} roundedTop={"6px"} width={"full"} roundedBottom={"full"} zIndex={10} style={{ background: "#5D70F9" }} />

                <Flex position={"absolute"} bg={"transparent"} left={"0px"} right={"0px"} flexDir={"column"} alignItems={"center"} width={"full"} roundedTop={"6px"} >
                    <Flex pt={"4"} zIndex={20}  >
                        <HStack justifyContent={'center'}>
                            <Image src='/assets/images/chasescroll-logo.png' width={30} height={30} alt='logo' />
                            <CustomText fontWeight={"bold"} fontFamily={'Satoshi-Regular'} color='#FFF'>Chasescroll</CustomText>
                        </HStack>
                    </Flex>
                    <Flex  zIndex={20} justifyContent={"center"} roundedTop={"6px"} pt={"4"} color={"white"} width={"full"} >
                        <Text fontWeight={"semibold"} >Event Name: {data?.eventName}</Text>
                    </Flex>
                    <Flex justifyContent={"center"} flex={1} width={"full"} pt={"6"} > 
                        <Box  zIndex={20} width={"60%"} shadow={"lg"} bg={"white"} p={"3"} rounded={"md"} >
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
            {/* {print && (  */}
            {/* <Box display={"none"} > */}

            {/* <Flex ref={componentRef} alignItems={"center"} >
                    <Flex width={"400px"} mx={"auto"} flexDir={"column"} alignItems={"center"} roundedTop={"6px"} >
                        <Flex pt={"4"} >
                            <HStack zIndex={20} justifyContent={'center'}>
                                <Image src='/assets/images/chasescroll-logo.png' width={30} height={30} alt='logo' />
                                <CustomText fontFamily={'Satoshi-Regular'} color='#FFF'>Chasescroll</CustomText>
                            </HStack>
                        </Flex>
                        <Flex justifyContent={"center"} roundedTop={"6px"} pt={"4"} color={"white"} zIndex={20} width={"full"} >
                            <Text zIndex={20} fontWeight={"semibold"} >Event Name: {data?.eventName}</Text>
                        </Flex>
                        <Box position={"absolute"} left={"0px"} right={"0px"} height={"300px"} roundedTop={"6px"} roundedBottom={"full"} zIndex={10} top={"0px"} style={{ background: "#5D70F9" }} />
                        <Flex justifyContent={"center"} flex={1} width={"full"} pt={"6"} >
                            <Box width={"60%"} shadow={"lg"} zIndex={20} bg={"white"} p={"3"} rounded={"md"} >
                                <QRCode
                                    style={{ height: "auto", maxWidth: "100%", width: "100%", zIndex: 20 }}
                                    value={`${WEBSITE_URL}/event/${id}`}
                                    viewBox={`0 0 256 256`}
                                />
                            </Box>
                        </Flex>
                        <Text my={"4"} fontWeight={"semibold"} color={"#121212CC"} >Scan here and get Your Event Link</Text>
                    </Flex>
                </Flex> */}
            {/* <ComponentToPrint ref={componentRef} /> */}
            {/* </Box> */}

            {/* )} */}
            {/* <Text my={"4"} color={"#121212CC"} >Scan here and get Your Event Link</Text> */}
            <CustomButton maxWidth={"300px"} backgroundColor={"#8893E4"} onClick={() => exportComponentAsJPEG(componentRef)} text='Download QR-Code' />
        </Flex>
    )
}

export default Qr_code
