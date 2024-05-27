import { THEME } from "@/theme";
import { Flex, Text } from "@chakra-ui/react";


function MissionAndVision(){
    return(
        <Flex w={"full"} px={"12"} py={"20"} gap={"8"} bgColor={"#FCFCFCF5"} >
            <Flex w={"full"} h={"439px"} justifyContent={"center"} shadow={"lg"} rounded={"xl"} px={"8"} flexDir={"column"} >
                <Text lineHeight={"21.78px"} fontSize={"lg"} >01</Text>
                <Text fontSize={"45px"} fontWeight={"600"} lineHeight={"54.46px"} color={THEME?.COLORS?.chasescrollBlue} >Our Mission</Text>
                <Text fontSize={"32px"} lineHeight={"38.73px"} color={"#2B2D31"} >Connecting People</Text>
                <Text fontSize={"lg"} lineHeight={"21.78px"} mt={"4"} color={"#222222CC"} >At ChaseScroll, we value the power of connection and community. Our mission is to facilitatemeaningful connections among event organisers, participants, and attendees.</Text>
            </Flex>
            <Flex w={"full"} h={"439px"} justifyContent={"center"} shadow={"lg"} rounded={"xl"} px={"8"} flexDir={"column"} >
                <Text lineHeight={"21.78px"} fontSize={"lg"} >02</Text>
                <Text fontSize={"45px"} fontWeight={"600"} lineHeight={"54.46px"} color={THEME?.COLORS?.chasescrollBlue} >Our Vision</Text>
                <Text fontSize={"32px"} lineHeight={"38.73px"} color={"#2B2D31"} >Seamless Event Experiences</Text>
                <Text fontSize={"lg"} lineHeight={"21.78px"} mt={"4"} color={"#222222CC"} >At ChaseScroll, we cherish the profound impact of connection and community. Our mission is to foster and facilitate genuine connections among event organizers, participants, and attendees.</Text>
            </Flex>
        </Flex>
    )
}


export default MissionAndVision