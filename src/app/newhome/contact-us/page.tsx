import FirstSetion from "@/components/landing_component/contactus/FirstSection";
import { Flex } from "@chakra-ui/react";



function ContactPage(){
    return(
        <Flex flexDir={"column"} w={"full"} >
            <FirstSetion />
        </Flex>
    )
}

export default ContactPage