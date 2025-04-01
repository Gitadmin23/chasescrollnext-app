import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import CustomButton from '../general/Button'
import useCustomTheme from '@/hooks/useTheme'
import ModalLayout from '../sharedComponent/modal_layout'
import { IoIosClose } from 'react-icons/io'
import StarRating from '../sharedComponent/StarRating'

export default function ViewRequest() {

    const { primaryColor, borderColor, mainBackgroundColor, headerTextColor } = useCustomTheme()

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)

    return (
        <Flex h={"130px"} justifyContent={"center"} bgColor={mainBackgroundColor} flexDir={"column"} borderWidth={"1px"} rounded={"8px"} p={"3"} gap={"3"}  >
            <Text fontSize={"14px"} fontWeight={"500"} >Support Request <span style={{ fontWeight: "600" }} >320</span></Text>
            <CustomButton onClick={() => setOpen(true)} text={"View proposal"} fontSize={"14px"} width={"150px"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} backgroundColor={mainBackgroundColor} />
            <ModalLayout size={"3xl"} open={open} close={setOpen} >
                <Flex w={"full"} flexDir={"column"} p={"4"} gap={"4"} >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Flex >
                            <Flex pb={"1"} as={"button"} onClick={() => setTab(false)} px={"3"} borderBottomWidth={"2px"} borderBottomColor={!tab ? primaryColor : borderColor} >
                                <Text fontWeight={"500"} fontSize={"sm"} >Services </Text>
                            </Flex>
                            <Flex pb={"1"} as={"button"} onClick={() => setTab(true)} px={"3"} borderBottomWidth={"2px"} borderBottomColor={tab ? primaryColor : borderColor}  >
                                <Text fontWeight={"500"} fontSize={"sm"} >Rentals </Text>
                            </Flex>
                        </Flex>
                        <Flex onClick={()=> setOpen(false)} as={"button"} >
                            <IoIosClose size={"25px"} />
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"3"} >
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontSize={"18px"} fontWeight={"600"} >James Media</Text>
                            <Flex gap={"2"} flexDir={"row"} alignItems={"center"} >
                                <Text fontSize={"14px"} fontWeight={"700"} >4.0 </Text>
                                <StarRating rate={3} />
                                <Text fontSize={"14px"} >Open until 19:00 . <span style={{ color: primaryColor }} >Garki, Abuja</span></Text>
                            </Flex>
                            <Flex w={"full"} pl={"3"} bgColor={primaryColor} rounded={"16px"} h={"fit-content"} borderWidth={"1px"} borderColor={borderColor} > 
                                <Flex w={"full"} bgColor={mainBackgroundColor} justifyContent={"space-between"} h={"117px"} alignItems={"center"} px={"5"} roundedLeft={"0px"} roundedRight={"16px"} >
                                    <Flex flexDir={"column"} fontSize={"14px"} >
                                        <Text fontWeight={"500"} >Photography</Text>
                                        <Text>1h 20 min</Text>
                                        <Text fontWeight={"500"} >NGN 2000</Text>
                                    </Flex>
                                    <CustomButton text={"Book Now"} width={"120px"} borderRadius={"32px"} borderWidth={"1px"} fontSize={"14px"} borderColor={borderColor} height={"40px"} color={headerTextColor} backgroundColor={mainBackgroundColor} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
