import { Flex, Image, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import CopyRightText from "../sharedComponent/CopyRightText";

export default function FooterLandingPage() {
    return (
        <Flex w={"full"} pt={"12"} flexDir={"column"} color={"white"} bgColor={"#01041A"} >
            <Flex w={"full"} pb={"8"} px={"12"} gap={"4"}  >
                <Flex w={"65%"} flexDir={"column"} >
                    <Flex alignItems={"center"} gap={"1"} >
                        <Image width={["full", "full", "60px"]} src={"/assets/logo.png"} alt="logo" />
                        <Text fontWeight={"bold"} fontSize={"32px"} lineHeight={"48ox"} color={"white"} >Chasescroll</Text>
                    </Flex>
                    <Text fontSize={"15.38px"} lineHeight={"24px"} mt={"6"} >Lets connect</Text>
                    <Flex w={"fit-content"} gap={"35px"} mt={"4"} justifyContent={"center"} >
                        {/* <a target="_blank" href="https://twitter.com/chasescroll">
                        <Icon className="text-[35px]" icon="mdi:twitter" color="white" />
                    </a>
                    <a target="_blank" href=" https://www.facebook.com/chase.scroll/ ">
                        <Icon
                            className="text-[35px]"
                            icon="ic:baseline-facebook"
                            color="white"
                        />
                    </a>
                    <a target="_blank" href=" https://www.linkedin.com/company/chasescroll/">
                        <Icon className="text-[35px]" icon="mdi:linkedin" color="white" />
                    </a>
                    <a target="_blank" href="  https://www.instagram.com/chasescroll_/  ">
                        <Icon
                            className="text-[35px]"
                            icon="ri:instagram-fill"
                            color="white"
                        />
                    </a> */}
                    </Flex>
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