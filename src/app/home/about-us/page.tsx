"use client"
import FirstSetion from "@/components/landing_component/aboutus/FirstSection";
import MissionAndGoal from "@/components/landing_component/aboutus/MissionAndGoal";
import MissionAndVision from "@/components/landing_component/aboutus/MissionAndVision";
import TeamSection from "@/components/landing_component/aboutus/TeamSection";
import DiscoverApp from "@/components/landing_component/home/discoverApp";
import VersionInfo from "@/components/landing_component/home/versionInfo";
import { Flex } from "@chakra-ui/react";



function AboutUs() {
    return (
        <Flex flexDir={"column"} w={"full"} >
            <FirstSetion />
            <MissionAndGoal />
            <MissionAndVision />
            <TeamSection />
            <VersionInfo />
            <DiscoverApp hide={true} />
        </Flex>
    )
}

export default AboutUs