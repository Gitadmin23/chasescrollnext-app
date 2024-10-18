import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Checkbox, Flex, Input, Text, border } from '@chakra-ui/react'
import React from 'react'
import { IoAdd, IoClose, IoCopy, IoCopyOutline } from 'react-icons/io5'

export default function DayAvaliable({setTab}: {setTab: (by: number) => void}) {

    const {
        borderColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const array = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat"
    ]

    return (
        <Flex justifyContent={"center"} w={"full"} height={"full"} py={"8"} >
            <Flex maxW={"770px"} w={"full"} flexDir={"column"} gap={"6"} >
                <Flex flexDir={"column"} >
                    <Text fontWeight={"600"} fontSize={"24px"} >Days that you are available for Business</Text>
                    <Text fontWeight={"500"} >Weekly Hours</Text>
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"}  >
                    <Flex gap={"4"} style={{ boxShadow: "0px 20.62px 72.18px 0px #C2C2C21A" }} rounded={"16px"} borderWidth={"0.38px"} borderColor={borderColor} w={"fit-content"} flexDir={"column"} px={"14"} py={"8"} >
                        {array?.map((item) => {
                            return (
                                <Flex key={item} gap={"3"} alignItems={"center"}  >
                                    <Flex w={"20"} gap={"3"} >
                                        <Checkbox />
                                        <Text>{item}</Text>
                                    </Flex>
                                    <Input type="time" w={"106px"} h={"40px"} rounded={"full"} borderWidth={"0.83px"} borderColor={borderColor} />
                                    -
                                    <Input type="time" w={"106px"} h={"40px"} rounded={"full"} borderWidth={"0.83px"} borderColor={borderColor} />
                                    <Box as="button" ml={"5"} >
                                        <IoClose size={"25px"} />
                                    </Box>
                                </Flex>
                            )
                        })}
                    </Flex>
                    <Flex gap={"4"} style={{ boxShadow: "0px 20.62px 72.18px 0px #C2C2C21A" }} rounded={"16px"} borderWidth={"0.38px"} borderColor={borderColor} w={"fit-content"} flexDir={"column"} px={"12"} py={"8"} >
                        {array?.map((item) => {
                            return (
                                <Flex key={item} gap={"4"} h={"42px"} >
                                    <IoAdd size={"20px"} />
                                    <IoCopyOutline size={"20px"} color={borderColor} />
                                </Flex>
                            )
                        })}
                    </Flex>
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"} mt={"4x"} >
                    <Button onClick={()=> setTab(1)} height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={borderColor} bgColor={mainBackgroundColor} _hover={{backgroundColor: mainBackgroundColor}} >Back</Button>
                    <Button onClick={()=> setTab(3)} height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{backgroundColor: primaryColor}} >Next</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
