import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion';
import React, { useRef } from 'react'

export default function EventOrganiser() {

    const { primaryColor } = useCustomTheme()

    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });

    return (
        <Flex w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} flexDir={["column-reverse", "column-reverse", "row"]} bg={"white"} alignItems={"center"} >
            <Flex 
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateX(-150px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }} w={"full"} flexDir={"column"} gap={"4"} >
                <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} >Why event organizers turn to <span style={{ color: primaryColor }} >Chasescroll...</span></Text>
                <Flex flexDir={"column"} gap={"5"} mt={"2"} >
                    <Flex gap={"3"}>
                        <Flex w={"fit-content"} >
                            <Flex w={"44px"} h={"44px"} rounded={"full"} bgColor={primaryColor} justifyContent={"center"} alignItems={"center"} >

                        </Flex>
                        </Flex>
                        <Flex flexDir={"column"} > 
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Proof of quality</Text>
                            <Text fontSize={"14px"} >{`Check any pro's work samples, client reviews, and account profile.`}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"3"}>
                        <Flex w={"fit-content"} >
                            <Flex w={"44px"} h={"44px"} rounded={"full"} bgColor={primaryColor} justifyContent={"center"} alignItems={"center"} >

                        </Flex>
                        </Flex>
                        <Flex flexDir={"column"} > 
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >No cost, only 3% service fee</Text>
                            <Text fontSize={"14px"} >{`Check any pro's work samples, client reviews, and account profile.`}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"3"}>
                        <Flex w={"fit-content"} >
                            <Flex w={"44px"} h={"44px"} rounded={"full"} bgColor={primaryColor} justifyContent={"center"} alignItems={"center"} >

                        </Flex>
                        </Flex>
                        <Flex flexDir={"column"} > 
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Safe and secure</Text>
                            <Text fontSize={"14px"} >{`Focus on your guests knowing we help protect your logistics and payments are secured with Paystack payment processing system. We're here with 24/7 support if you need it.`}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                ref={reftwo}
                style={{
                    transform: isInViewtwo ? "none" : "translateX(+150px)",
                    opacity: isInViewtwo ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }} w={["full", "full", "fit-content"]} >
                <Flex w={["full", "full", "505px"]} h={["322px", "322px", "440px"]} bgColor={"#F2F7F280"} justifyContent={"center"} alignItems={"end"} rounded={"2xl"}  >
                    <Image src='/images/hero/eventPage.png' alt='fund' w={"60%"} h={["80%"]} mt={"auto"} ml={"8"} objectFit={"contain"} rounded={["12px", "12px", "32px"]} objectPosition={["center"]} />
                </Flex>
            </Flex>
        </Flex>
    )
}
