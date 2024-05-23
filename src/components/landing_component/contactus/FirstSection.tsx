import { Flex, Text } from "@chakra-ui/react";
import MobileAppLink from "../mobileapplink";


function FirstSetion() {
    return (
        <Flex w={"full"} h={"547px"} bgColor={"red"} color={"white"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} >
            <Flex alignItems={"center"} flexDir={"column"} >
                <Text fontSize={"60px"} lineHeight={"84px"} fontWeight={"700"} textAlign={"center"} >We'd love to hear from you</Text>
                <Text maxW={"700px"} fontStyle={"lg"} mb={"10"} textAlign={"center"} lineHeight={"21.78px"} fontWeight={"500"} >Email, call, or complete the form to learn how  can solve your event  management.</Text>
                {/* <MobileAppLink /> */}
                <Flex>
                    
                </Flex>
            </Flex>
        </Flex>
    )
}

export default FirstSetion