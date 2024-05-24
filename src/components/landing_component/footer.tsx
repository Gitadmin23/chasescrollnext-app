"use client"
import { Flex, Image, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import CopyRightText from "../sharedComponent/CopyRightText";
import MobileAppLink from "./mobileapplink";
import SocialMedia from "./socialMedia";

export default function FooterLandingPage() {
    return (
        <Flex w={"full"} pt={"12"} flexDir={"column"} color={"white"} bgColor={"#01041A"} >
            <Flex w={"full"} pb={"8"} px={"12"} gap={"4"}  >
                <Flex w={"65%"} flexDir={"column"} >
                    <Flex alignItems={"center"} gap={"1"} >
                        <Image width={["full", "full", "60px"]} src={"/assets/logo.png"} alt="logo" />
                        <Text fontWeight={"bold"} fontSize={"32px"} lineHeight={"48ox"} color={"white"} >Chasescroll</Text>
                    </Flex>
                    <Text fontSize={"15.38px"} lineHeight={"24px"} mt={"8"} >Lets connect</Text>
                    <SocialMedia top="0px" />
                    <Text fontSize={"15.38px"} mt={"8"} mb={"2"} lineHeight={"24px"} >Download Our App</Text>
                    <MobileAppLink width="113.14px" height="36px" />
                </Flex>
                <Flex w={"100%"} justifyContent={"space-between"} pr={"10"} >
                    <Flex w={"300px"} flexDir={"column"} >
                        <Text fontSize={"24px"} lineHeight={"48px"} fontWeight={"medium"} >Helpful links</Text>
                        <Flex w={"full"} mt={"6"} gap={"5"} flexDir={"column"} >
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >FAQ</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Contact Us</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Event</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Home</Text>
                            </Link>
                        </Flex>
                        <Text lineHeight={"20px"} mt={"8"} fontWeight={"500"} >Do Not Sell or Share My Personal Information</Text>
                    </Flex>
                    <Flex w={"150px"} flexDir={"column"} >
                        <Text fontSize={"24px"} lineHeight={"48px"} fontWeight={"medium"} >About Us</Text>
                        <Flex w={"full"} mt={"6"} gap={"5"} flexDir={"column"} >
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Privacy Policy</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Terms & Condition</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Sell Ticket</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Explore</Text>
                            </Link>
                        </Flex>
                    </Flex>
                    <Flex w={"155px"} flexDir={"column"} >
                        <Text fontSize={"24px"} lineHeight={"48px"} fontWeight={"medium"} >Partners</Text>
                        <Flex w={"full"} mt={"6"} gap={"5"} flexDir={"column"} >
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >Babcock University</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >University of San Diego</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >County  of san Diego chambers</Text>
                            </Link>
                            <Link href={""}  >
                                <Text lineHeight={"19.36px"} fontWeight={"500"} >The Brink</Text>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"full"} px={"12"} py={"4"} borderTop={"1px solid white"} >
                <CopyRightText />
            </Flex>
        </Flex>
    )
}