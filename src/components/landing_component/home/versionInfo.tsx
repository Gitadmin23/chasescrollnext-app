import CustomButton from "@/components/general/Button";
import { THEME } from "@/theme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function VersionInfo (){
    return(
        <Flex w={"full"} alignItems={"center"} h={"547px"} px={"12"} pos={"relative"} >
            <Box pos={"absolute"} inset={"0px"} >
            <Image src="/images/abouthomebg.png" alt="abouthomebg" w={"full"} />
            </Box>
            <Flex w={"full"} flexDir={"column"} zIndex={"20"} gap={"6"} color={"white"} >
                <Text maxW={"783px"} fontSize={"50px"} fontWeight={"semibold"} lineHeight={"60.51px"} >Chasescroll Available for mobile and Desktop</Text>
                <Text maxW={"500px"} fontSize={"18px"} fontWeight={"medium"} lineHeight={"26.1px"} >Chasescroll Mobile available on all Mobile Stores and Desktop web</Text>
                <CustomButton text={"Get Started"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
            </Flex>
            <Box w={"60%"} mt={"auto"} px={"6"} zIndex={"20"} >
                <Image src="/images/abouthome.png" alt="abouthome" w={"100%"} />
            </Box>
        </Flex>
    )
}