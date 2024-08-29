"use client"

import Faq from "@/components/landing_component/home/FAQ"
import InfoOnCommunity from "@/components/landing_component/home/InfoOnCommunity"
import InfoOnEvent from "@/components/landing_component/home/InfoOnEvent"
import InfoOnFriend from "@/components/landing_component/home/InfoOnFriend"
import DiscoverApp from "@/components/landing_component/home/discoverApp"
import HeroSection from "@/components/landing_component/home/herosection" 
import OurPartner from "@/components/landing_component/home/ourpartner"
import SuccessStory from "@/components/landing_component/home/successStory"
import UserComment from "@/components/landing_component/home/userComment"
import VersionInfo from "@/components/landing_component/home/versionInfo"
import { Flex } from "@chakra-ui/react"
import React from "react"

export default function Home() {
    return (
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <HeroSection />
            <OurPartner />
            <InfoOnEvent />
            <InfoOnFriend />
            <InfoOnCommunity />
            {/* <SuccessStory /> */}
            <VersionInfo />
            <DiscoverApp />
            <UserComment />
            <Faq />
        </Flex>
    )
}