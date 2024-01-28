import { Flex, Box, Text, Image } from '@chakra-ui/react' 
import React from 'react'

interface Props { }

function HomeFooter(props: Props) {
    const { } = props

    return (
        <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"} pt={"12"} px={"8"} >
            <Text color={"#626262"} fontSize={"20px"} lineHeight={"-0.4px"} >© 2024 Chasecroll, Llc.</Text>
            <Flex alignItems={"center"} flexDir={"column"} >
                <Text color={"#626262"} fontSize={"20px"} >Partners:</Text>
                <Flex alignItems={"center"} mt={"2"} gap={"2"} >
                    <Image src="/images/The_Founder_Institute_Logo.svg" alt='The_Founder_Institute_Logo' />
                    <Image src="/images/The_Brink.svg" alt='The_Brink' />
                    <Image src="/images/sdbcc.svg" alt='sdbcc' />
                </Flex>
            </Flex>
            <Flex alignItems={"center"}  flexDir={"column"}  >
                <Text color={"#626262"} fontSize={"20px"} >Payment transactions, powered by :</Text>
                    <Image src="/images/Payment.svg" alt='Payment' />
            </Flex>
        </Flex>
    )
}

export default HomeFooter
