import CustomText from '@/components/general/Text';
import { useDetails } from '@/global-state/useUserDetails';
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoArrowForward, IoClose } from 'react-icons/io5';

interface Props { }

function CreateEventBtn(props: Props) {
    const { } = props

    const router = useRouter();
    const [open, setOpen] = useState(false)

    const { userId, email } = useDetails((state) => state);

    let token = localStorage.getItem("token")

    const clickHander = () => {
        if (token) {
            setOpen(true)
            // router.push("/dashboard/event/create_event")
        } else {
            router.push("/auth")
        }
    }


    return (
        <Box position={"relative"}  >
            <Flex onClick={() => clickHander()} as={"button"} w={"152px"} ml={"auto"} fontWeight={"medium"} border={"1px solid #3C41F0"} justifyContent={"center"} color={"brand.chasescrollBlue"} fontSize={"14px"} lineHeight={"20px"} height={"44px"} rounded={"8px"} alignItems={"center"} gap={"2"} >
                Create Event
            </Flex>
            {open && (
                <Flex zIndex={"110"} position={"absolute"} top={"0px"} flexDir={"column"} right={"0px"} width={"374px"} py={"4"} px={"6"} bg={"white"} rounded={'8px'} >
                    <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                        <Flex role="button" onClick={() => router.push("/dashboard/home")} justifyContent={'center'} gap={"2"} >
                            <Image src='/assets/images/chasescroll-logo.png' width={"24px"} height={"24px"} alt='logo' />
                            <CustomText fontFamily={"DM-Medium"} fontSize='sm' color='#121212'>Chasecroll Event</CustomText>
                        </Flex>
                        <Box role='button' onClick={() => setOpen(false)} >
                            <IoClose size="20px" />
                        </Box>
                    </Flex>
                    <Flex as={"button"} onClick={()=> router.push("/dashboard/event/create_event")} w={"full"} py={"4"} mt={"8"} px={"2"} flexDir={"column"} rounded={"8px"} _hover={{borderColor: "#5D70F9"}} border={"1px"} borderColor={"transparent"} >
                        <Flex gap={"1"} >
                            <Text color={"#5465E0"} fontWeight={"bold"} fontSize={"sm"} >Are you the owner of this event? </Text>
                            <IoArrowForward size={"18px"} color={"#292D32"} />
                        </Flex>
                        <Text color={"#626262"} mt={"2"} fontSize={"10px"} >As the event owner, you play a crucial role in decision making and receiving payments from attendees who buy tickets for this event.</Text>
                    </Flex>
                    <Flex as={"button"} onClick={()=> router.push("/dashboard/event/create_event_promotion")} w={"full"} py={"4"} mt={"5"} px={"2"} flexDir={"column"} rounded={"8px"} _hover={{borderColor: "#5D70F9"}} border={"1px"} borderColor={"transparent"}>
                        <Flex gap={"1"} >
                            <Text color={"#5465E0"} fontWeight={"bold"} fontSize={"sm"} >{`I'm just promoting this event. `}</Text>
                            <IoArrowForward size={"18px"} color={"#292D32"} />
                        </Flex>
                        <Text  textAlign={"left"} color={"#626262"} mt={"2"} fontSize={"10px"} >You serve as the promoter but are not responsible for significant decisions regarding the event.</Text>
                    </Flex>
                </Flex>
            )}
            {open && (
                <Box position={"fixed"} onClick={()=> setOpen(false)} inset={'0px'} zIndex={"100"} bg={"black"} opacity={"50%"} />
            )}
        </Box>
    )
}

export default CreateEventBtn
