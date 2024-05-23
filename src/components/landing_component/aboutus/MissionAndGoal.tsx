import { THEME } from "@/theme";
import { Flex, Text } from "@chakra-ui/react";


function MissionAndGoal(){
    return(
        <Flex w={"full"} px={"12"} py={"20"} flexDir={"column"} gap={"6"} >
            <Text fontSize={"24px"} lineHeight={"33.6px"} fontWeight={"600"} ><span style={{color: THEME?.COLORS?.chasescrollBlue}} >MISSION</span> + GOALS</Text>
            <Text lineHeight={"54.46px"} fontSize={"45px"} >Chasescroll is a cutting-edge event management platform designed to streamline the process of organizing and participating in events.</Text>
        </Flex>
    )
}

export default MissionAndGoal