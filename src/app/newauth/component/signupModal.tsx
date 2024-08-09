"use client"
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Bluetick, CloseIcon } from '@/components/svg'
import { Box, Button, Flex, HStack, Image, Input, PinInput, PinInputField, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import SignForm from './signForm'
import useAuth from '@/hooks/useAuth'
import VerifyForm from './verifyForm'
import { useRouter } from 'next/navigation'

export default function SignupModal() {

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const [showVerify, setShowVerify] = useState(false)

    const router = useRouter()

    return (
        <Flex w={"full"} >
            <Button onClick={() => setOpen(true)} mt={"4"} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                <Text color={"white"} textAlign={"center"} fontWeight={"600"} >Create Account</Text>
            </Button>
            <ModalLayout onOverLay={showVerify} size={["full", "full", "lg"]} open={open} close={setOpen} rounded={"32px"} >
                <Flex w={"full"} h={["100vh", "100vh", "auto"]} justifyContent={"center"} alignItems={"center"} >
                    <Flex w={"full"} px={"10"} py={"10"} flexDir={"column"} alignItems={"center"} >
                        <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"} >
                            {!tab && (
                                <Box as='button' mr={"auto"} onClick={() => setOpen(false)} >
                                    <CloseIcon color='black' size='12' />
                                </Box>
                            )}
                            {(tab && !showVerify) && (
                                <Box as='button' mr={"auto"} onClick={() => setTab(false)} >
                                    <IoArrowBack color='black' size='20px' />
                                </Box>
                            )}
                            {!showVerify && (
                                <Text fontSize={"14px"} ml={"auto"} color={"#C0C0C0"} fontWeight={"600"} >
                                    Step {!tab ? 1 : 2}/2
                                </Text>
                            )}
                        </Flex>
                        <Flex maxW={"375px"} mt={showVerify ? "0px" : "-6"} >
                            <Image alt='logo' src='/images/logo.png' />
                        </Flex>
                        {!showVerify && (
                            <SignForm tab={tab} setTab={setTab} setShowVerify={setShowVerify} />
                        )}
                        {showVerify && (
                            <VerifyForm setOpen={setOpen} setShowMessage={setShowMessage} setShowVerify={setShowVerify} setTab={setTab} />
                        )}
                    </Flex>
                </Flex>
            </ModalLayout>

            <ModalLayout onOverLay={showMessage} size={["full", "full", "lg"]} open={showMessage} close={setShowMessage} rounded={"32px"} >
                <Flex w={"full"} h={["100vh", "100vh", "auto"]} justifyContent={"center"} px={"10"} py={"10"} flexDir={"column"} alignItems={"center"} >
                    {/* <Box as='button' mr={"auto"} onClick={() => setOpen(false)} >
                        <CloseIcon color='black' size='12' />
                    </Box> */}
                    <Flex maxW={"360px"}  >
                        <Image alt='logo' src='/images/logo.png' />
                    </Flex>
                    <Flex overflowY={"auto"} alignItems={"center"} maxW={"360px"} w={"full"} flexDir={"column"}  >
                        <Text fontSize={["20px", "20px", "32px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"500"} >Welcome to Chasescroll</Text>
                        <Text fontSize={"15px"} textAlign={"center"} color={"#4B4B4D"} >Create event, and manage your community </Text>
                        <Flex w={"full"} gap={"3"} mt={"6"} color={"#4B4B4D"} flexDir={'column'} fontWeight={"300"} >
                            <Flex alignItems={"center"} gap={"2"} >
                                <Bluetick />
                                <Text fontSize={"lg"} >Keep it professional</Text>
                            </Flex>
                            <Flex alignItems={"center"} gap={"2"} >
                                <Bluetick />
                                <Text fontSize={"lg"} >Report bad behaviour immediately</Text>
                            </Flex>
                        </Flex>
                        <Button onClick={() => router?.push("/newauth")} color={"white"} mt={"6"}  _disabled={{ backgroundColor: "#233DF380" }} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={["20px", "20px", "32px"]} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                            <Text textAlign={"center"} fontWeight={"600"} >Continue</Text>
                        </Button>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
