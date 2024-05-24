"use client"
import AddressSection from "@/components/landing_component/contactus/AddressSection";
import FirstSetion from "@/components/landing_component/contactus/FirstSection";
import DiscoverApp from "@/components/landing_component/home/discoverApp";
import VersionInfo from "@/components/landing_component/home/versionInfo";
import { Flex } from "@chakra-ui/react";



function ContactPage(){
    return(
        <Flex flexDir={"column"} w={"full"} >
            <FirstSetion />
            <AddressSection />
            <VersionInfo />
            <DiscoverApp hide={true} />
        </Flex>
    )
}

export default ContactPage