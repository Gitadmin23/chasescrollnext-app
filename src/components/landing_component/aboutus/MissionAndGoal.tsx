import { THEME } from "@/theme";
import { Flex, Text } from "@chakra-ui/react";


function MissionAndGoal(){
    return(
        <Flex w={"full"} px={["6", "6", "12"]} py={["10", "10", "20"]} flexDir={"column"} gap={"6"} >
            <Text fontSize={["16px", "16px", "24px"]} lineHeight={["22.4px", "22.4px", "33.6px"]} fontWeight={"600"} ><span style={{color: THEME?.COLORS?.chasescrollBlue}} >MISSION</span> + GOALS</Text>
            <Text lineHeight={["22px", "22px", "54.46px"]} fontSize={["16px", "16px", "35px"]} >Chasescroll is a cutting-edge event management platform designed to streamline the process of organizing and participating in events.</Text>
        </Flex>
    )
}

export default MissionAndGoal