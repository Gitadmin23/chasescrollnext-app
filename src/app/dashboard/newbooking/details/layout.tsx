"use client"
import { Button, Flex, Text } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import useCustomTheme from '@/hooks/useTheme';
import { AiOutlineMore } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { IoBookmarkOutline } from 'react-icons/io5';
import { LuShare } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: {
    children: ReactNode
}) {

    const {
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme()

    const [tab, setTab] = useState(0)

    const router = useRouter()

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} p={"8"} gap={"8"} overflowY={"auto"} >
            <Flex w={"full"} h={"fit-content"} justifyContent={"space-between"} >
                {/* <IoArrowBack size="25px" /> */}
                <Flex as={"button"} onClick={() => router?.back()} >
                    <BsChevronLeft size="25px" />
                </Flex>
                <Text fontSize={"24px"} fontWeight={"600"} >My Business</Text>
                <AiOutlineMore size="25px" />
            </Flex>
            <Flex w={"full"} h={"fit-content"} > 
                <Flex w={"full"} h={"240px"} bgColor={"red"} rounded={"8px"} >
                </Flex>
            </Flex>
            <Flex w={"full"} h={"fit-content"} gap={"10"} >
                <Flex w={"full"} flexDir={"column"} gap={"5"} >
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"14px"} >Business Name</Text>
                        <Text fontSize={"24px"} fontWeight={"700"} >Next Generation Barbers Nigeria Ltd</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"14px"} fontWeight={"600"}  >Description</Text>
                        <Text fontSize={"14px"} >Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The pass</Text>
                    </Flex>
                    <Flex w={"full"} gap={"6"} >
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Business Opening Days & Time</Text>
                            <Flex alignItems={"center"} gap={"3"} >
                                <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} />
                                <Text fontWeight={"600"} fontSize={"14px"} color={primaryColor} >Mon-Fri 7am-6pm Daily</Text>
                            </Flex>
                        </Flex>
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Location</Text>
                            <Flex alignItems={"center"} gap={"3"} >
                                <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} />
                                <Text fontWeight={"400"} fontSize={"14px"} >143 Historic Town square, Lancaster, 75146</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} flexDirection={"column"} gap={"8"} >
                    <Flex justifyContent={"end"} gap={"4"} >
                        <IoBookmarkOutline size={"25px"} />
                        <LuShare size={"25px"} />
                    </Flex>
                    <Flex w={"full"} gap={"4"} >
                        <Flex alignItems={"center"} gap={"3"} >
                            <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} />
                            <Text fontWeight={"400"} fontSize={"14px"} >Barbers Intl</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={"3"} >
                            <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} />
                            <Text fontWeight={"400"} fontSize={"14px"} >Barbers Intl.ng</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={"3"} >
                            <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} />
                            <Text fontWeight={"400"} fontSize={"14px"} >Davidbarbs.com</Text>
                        </Flex>
                    </Flex>
                    <Flex w={"full"} bgColor={"#EEEEFF"} rounded={"64px"} px={"21px"} py={"19px"} >
                        <Flex alignItems={"center"} w={"full"} gap={"3"} >
                            <Flex w={"48px"} h={"48px"} rounded={"36px"} roundedTopRight={"0px"} bg={"purple"} />
                            <Flex flexDir={"column"} >
                                <Text fontSize={"12px"} fontWeight={"500"} >Business Owner</Text>
                                <Text fontWeight={"600"} >Miracle David</Text>
                            </Flex>
                            <Flex gap={"18px"} p={"12px"} bg={mainBackgroundColor} rounded={"64px"} ml={"auto"} >
                                <Button h={"23px"} w={"68px"} rounded={"32px"} fontSize={"10px"} fontWeight={"500"} color={"white"} bg={primaryColor} >Message</Button>
                                <Button h={"23px"} w={"68px"} rounded={"32px"} fontSize={"10px"} fontWeight={"500"} color={primaryColor} bg={secondaryBackgroundColor} >Follow</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"full"} mt={"10"} borderBottomColor={borderColor} borderBottomWidth={"1px"} py={"4"} justifyContent={"space-between"} >
                <Text onClick={() => setTab(0)} as={"button"} color={tab === 0 ? primaryColor : headerTextColor} textDecoration={tab === 0 ? "underline" : ""} >MY SERVICES</Text>
                <Text onClick={() => setTab(1)} as={"button"} color={tab === 1 ? primaryColor : headerTextColor} textDecoration={tab === 1 ? "underline" : ""} >PORTFOLIO</Text>
                <Text onClick={() => setTab(2)} as={"button"} color={tab === 2 ? primaryColor : headerTextColor} textDecoration={tab === 2 ? "underline" : ""} >DETAILS</Text>
                <Text onClick={() => setTab(3)} as={"button"} color={tab === 3 ? primaryColor : headerTextColor} textDecoration={tab === 3 ? "underline" : ""} >REVIEWS</Text>
            </Flex>
            <Flex w={"full"} h={"fit-content"}  >
                {children}
            </Flex>
        </Flex>
    )
}
