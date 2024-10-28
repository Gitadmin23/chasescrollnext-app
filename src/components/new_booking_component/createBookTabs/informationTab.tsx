import ModalLayout from '@/components/sharedComponent/modal_layout'
import { GallaryIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Input, Radio, RadioGroup, Select, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { DayAvaliable } from '.'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { useRouter } from 'next/navigation'

export default function InformationTab() {

    const {
        borderColor,
        primaryColor
    } = useCustomTheme()

    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)

    const clickHander = (item: boolean) => {
        setOpen(item)
        setModal(!item)
    }

    const router = useRouter()

    return (
        <Flex w={"full"} h={"full"} >
            <Flex w={"full"} h={"full"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} borderRightWidth={"1.03px"} borderColor={borderColor} >
                <Flex maxW={"402px"} w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"bold"} fontSize={"18px"} >Hello,  <span style={{ color: primaryColor }} >Miracle</span></Text>
                    <Text fontSize={"32px"} lineHeight={"37.58px"} >Welcome to Chasescroll Business</Text>
                    <Text fontSize={"14px"} fontWeight={"500"} >Your gateway to seamless service bookings,</Text>
                </Flex>
            </Flex>
            <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} overflowY={"auto"} >
                <Flex maxW={"438px"} w={"full"} height={"full"} gap={"5"} flexDir={"column"} py={"8"} >
                    <Flex flexDir={"column"} gap={"3"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >{`Let’s get you started`}</Text>
                        <Text fontSize={"14px"} fontWeight={"400"} >{`Your address will be provided to client  only after they've booked for your services`}</Text>
                    </Flex>
                    <Flex w={"full"} py={"8"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}  >
                        <GallaryIcon />
                        <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                        <Text fontSize={"8px"} >You need at least 6 pictures</Text>
                        <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                        <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Business Name*</Text>
                        <Input h={"44px"} />
                    </Flex>
                    <RadioGroup >
                        <Flex direction='row' gap={"4"}>
                            <Radio value='1'>Physical Venue</Radio>
                            <Radio value='2'>Online</Radio>
                        </Flex>
                    </RadioGroup>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Business Address</Text>
                        <Input h={"44px"} />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Business Phone Number</Text>
                        <Input h={"44px"} />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Business Email Address</Text>
                        <Input h={"44px"} />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Business Website (optional)</Text>
                        <Input h={"44px"} />
                        <Flex gap={"2"} mt={"2"} as={"button"} alignItems={"center"} >
                            <IoAdd size={"25px"} color={primaryColor} />
                            <Text>Add social Handle </Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"4"} >
                        <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                            <Text>Select your socials type</Text>
                            <Select h={"44px"} />
                        </Flex>
                        <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                            <Text>Social Media handle</Text>
                            <Input h={"44px"} />
                        </Flex>
                    </Flex>
                    <Flex gap={"2"} mt={"2"} as={"button"} alignItems={"center"} >
                        <IoAdd size={"25px"} color={primaryColor} />
                        <Text>Business Hours and time </Text>
                    </Flex>
                    <Flex w={"full"} h={"100px"} pb={"9"} >
                        <Button onClick={() => setOpen(true)} w={"full"} bg={primaryColor} color={"white"} rounded={"full"} h={"49px"} _hover={{ backgroundColor: primaryColor }} >
                            Create Business
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <ModalLayout size={"xl"} open={open} close={setOpen} >
                <DayAvaliable close={setOpen} setTab={clickHander} />
            </ModalLayout>

            <ModalLayout open={modal} close={setModal} closeIcon={true}>
                <Flex w={"full"} flexDir={"column"} alignItems={"center"} py={"5"} >
                    <IoIosCheckmarkCircle size={"100px"} color={"#46CC6B"} />
                    <Text fontWeight={"600"} fontSize={"24px"} >Congratulations Miracle!</Text>
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} >{`You’ve successfully Create your Business. Kindly click on the create services to get started.`}</Text>
                    <Button onClick={()=> router?.push("/dashboard/newbooking/create/services")} height={"50px"} mt={"4"} borderWidth={"1px"} w={"200px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{ backgroundColor: primaryColor }} >Create services </Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
} 
