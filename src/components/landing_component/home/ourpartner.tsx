import { THEME } from "@/theme";
import { Flex, Image, Text } from "@chakra-ui/react";


export default function OurPartner() {
    return (
        <Flex w={"full"} flexDir={"column"} >
            <Flex borderBottomWidth={"1px"} borderColor={"#CDD3FD"} width={"full"} alignItems={"center"} flexDir={"column"} gap={"6"} justifyContent={"center"} height={"267px"} >
                <Text color={"#2B2D31"} fontWeight={"semibold"} lineHeight={"38.73px"} fontSize={"32px"} >Our Partners</Text>
                <Flex w={"fit-content"} overflowX={["auto", "auto", "hidden"]} gap={"12"} alignItems={"center"} sx={
                    {
                        '::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }>
                    <Image src="/images/The_Founder_Institute_Logo.svg" alt="Institute" w={"134.52px"} />
                    <Image src="/images/The_Brink.svg" alt="Brink" w={"119.31px"} />
                    <Image src="/images/babcock.svg" alt="babcock" w={"100px"} />
                    <Image src="/images/sdbcc.svg" alt="sdbcc" w={"100px"} />
                </Flex>
            </Flex>
            <Flex width={"full"} alignItems={"center"} flexDir={"column"} gap={"6"} justifyContent={"center"} height={["136px", "146px", "345px"]} >
                <Text maxW={"913px"} fontSize={["20px", "20px", "45px"]} lineHeight={["24.2px", "24.2px", "54.46px"]} textAlign={"center"} fontWeight={"semibold"} >Let <span style={{ color: THEME?.COLORS?.chasescrollBlue }} >Chasescroll</span> Power your Event with our Amazing features</Text>
            </Flex>
        </Flex>
    )
}