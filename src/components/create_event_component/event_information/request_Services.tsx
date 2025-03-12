import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import useCustomTheme from '@/hooks/useTheme'
import { Checkbox, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

export default function RequestServices() {

    const { primaryColor, borderColor, headerTextColor, secondaryBackgroundColor } = useCustomTheme()

    const array = ["test", "test", "test", "test", "test", "test",]

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)

    return (
        <Flex w={"full"} flexDir={"column"} gap={"6"} >
            <Flex w={"full"} justifyContent={"space-between"} gap={"2"} alignItems={"center"} >
                <Text fontSize={"14px"} fontWeight={"500"} >Request services and rental for this event:</Text>
                <CustomButton onClick={() => setOpen(true)} text={"Request"} rounded={"16px"} fontSize={"sm"} backgroundColor={"#F7F8FE"} color={primaryColor} width={"112px"} />
            </Flex>
            <Flex w={"full"} gap={"3"} flexDirection={"column"} >
                <Text fontSize={"14px"} fontWeight={"500"} >Services / Rentals Selected</Text>
                <Wrap gap={"4"} >
                    {array?.map((item, index) => (
                        <WrapItem>
                            <Flex alignItems={"center"} bgColor={"#F7F8FE"} gap={"3"} h={"40px"} px={"4"} rounded={"8px"} >
                                <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >Disk  jokey (DJ) </Text>
                                <Flex as={"button"} >
                                    <IoClose size={"20px"} color='#F81F1F' />
                                </Flex>
                            </Flex>
                        </WrapItem>
                    ))}
                </Wrap>
            </Flex>
            <ModalLayout open={open} close={setOpen} closeIcon={true} >
                <Flex flexDir={"column"} gap={"4"} pb={"4"} >
                    <Text fontWeight={"500"} ml={"4"} >Service | Rentals</Text>
                    <Flex w={"full"} px={"4"} justifyContent={"center"} borderBottomWidth={"1px"} borderColor={borderColor}>
                        <Flex justifyContent={"center"} onClick={() => setTab(false)} w={"100px"} pb={"1"} mb={"-1px"} borderBottomWidth={"1px"} borderColor={!tab ? primaryColor : borderColor} >
                            <Text color={!tab ? primaryColor : headerTextColor} fontSize={"14px"} >Services</Text>
                        </Flex>
                        <Flex justifyContent={"center"} onClick={() => setTab(true)} w={"100px"} pb={"1"} mb={"-1px"} borderBottomWidth={"1px"} borderColor={tab ? primaryColor : borderColor} >
                            <Text color={tab ? primaryColor : headerTextColor} fontSize={"14px"} >Rental</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} gap={"4"} px={"4"} >
                        <Flex w={"full"} overflowX={"auto"} >
                            <Flex w={"fit-content"} gap={"4"} >
                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} gap={"3"} h={"40px"} px={"4"} rounded={"8px"} >
                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >Disk  jokey (DJ) </Text>
                                    <Flex as={"button"} >
                                        <IoClose size={"20px"} color='#F81F1F' />
                                    </Flex>
                                </Flex>
                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} gap={"3"} h={"40px"} px={"4"} rounded={"8px"} >
                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >Disk  jokey (DJ) </Text>
                                    <Flex as={"button"} >
                                        <IoClose size={"20px"} color='#F81F1F' />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex maxH={"40vh"} overflowY={"auto"} >
                            <Flex w={"full"} h={"auto"} flexDir={"column"} rounded={"16px"} bgColor={secondaryBackgroundColor} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                <Flex w={"full"} h={"fit-content"} >
                                    <Flex w={"full"} h={"53px"} px={"4"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} alignItems={"center"} >
                                        <Text fontSize={"14px"} >Photography</Text>
                                        <Checkbox />
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} >
                                    <Flex w={"full"} h={"53px"} px={"4"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} alignItems={"center"} >
                                        <Text fontSize={"14px"} >Photography</Text>
                                        <Checkbox />
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} >
                                    <Flex w={"full"} h={"53px"} px={"4"} justifyContent={"space-between"} alignItems={"center"} >
                                        <Text fontSize={"14px"} >Photography</Text>
                                        <Checkbox />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
