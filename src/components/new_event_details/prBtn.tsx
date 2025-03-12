import useCustomTheme from '@/hooks/useTheme'
import { IEventType } from '@/models/Event'
import { Checkbox, Flex, Switch, Text } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import CustomButton from '../general/Button'
import ModalLayout from '../sharedComponent/modal_layout'
import UserImage from '../sharedComponent/userimage'
import { textLimit } from '@/utils/textlimit'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import EventDonation from './eventDonation'
import EventDonationPicker from './eventDonationPicker'

export default function PrBtn({ data }: { data: IEventType }) {

    const {
        mainBackgroundColor,
        primaryColor, 
        secondaryBackgroundColor
    } = useCustomTheme()

    const pathname = usePathname()

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)
    const [index, setIndex] = useState(1)

    return (
        <>
            <Flex pos={["relative"]} w={"fit-content"} flexDir={"column"} rounded={"16px"} gap={"3"} >
                <CustomButton onClick={() => setOpen(true)} text={"My support Center"} backgroundColor={["#EEEEFF", "#EEEEFF", primaryColor]} color={[primaryColor, primaryColor, "white"]} borderRadius={"999px"} fontSize={["xs", "xs", "sm"]} width={["120px", "120px", "160px"]} />
                <ModalLayout open={open} size={"md"} close={setOpen} closeIcon={true} >
                    <Flex flexDir={"column"} gap={"4"} w={"full"} px={"4"} >
                        <Text fontWeight={"500"}  >My support center</Text>
                        {!tab && (
                            <Flex bgColor={secondaryBackgroundColor} w={"full"} flexDir={"column"} rounded={"16px"} >
                                <Flex w={"full"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                    <Text fontSize={"14px"} >Request PR Service</Text>
                                    <Switch />
                                </Flex>
                                <Flex w={"full"} onClick={()=> setTab(true)} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                    <Text fontSize={"14px"}  >Add fundraising </Text>
                                </Flex>
                                <Flex w={"full"} onClick={()=> setTab(true)} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                    <Text fontSize={"14px"}  >Add kiosk</Text>
                                </Flex>
                                <Flex w={"full"} onClick={()=> setTab(true)} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                    <Text fontSize={"14px"}  >Request Service - Photographer, makeup Artist...</Text>
                                </Flex>
                                <Flex w={"full"} onClick={()=> setTab(true)} as={"button"} justifyContent={"space-between"} h={"50px"} px={"3"} alignItems={"center"} >
                                    <Text fontSize={"14px"}  >Rent an item(s)</Text>
                                </Flex>
                            </Flex>
                        )}
                        {tab && (
                            <Flex w={"full"} gap={"4"} pos={"relative"} flexDir={"column"} >
                                <Flex p={"4px"} h={"45px"} rounded={"full"} w={"full"} bgColor={secondaryBackgroundColor} >
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 1 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(1)} >
                                        My Fundraising
                                    </Flex>
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 2 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(2)} >
                                        Add Kiosk
                                    </Flex>
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 3 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(3)} >
                                        Rental
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} p={"4"} gap={"4"} bgColor={index === 1 ? "transparent" : secondaryBackgroundColor} rounded={"16px"} flexDir={"column"} >
                                    {index !== 1 && (
                                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex display={["flex"]} gap={"2"} >
                                                <UserImage border={"1px"} size={"32px"} font={"14px"} image={data?.createdBy?.data?.imgMain?.value} data={data?.createdBy} />
                                                <Flex flexDir={"column"} >
                                                    <Text fontSize={"12px"} >{textLimit(capitalizeFLetter(data?.createdBy?.firstName + " " + data?.createdBy?.lastName), 30)}</Text>
                                                    <Text fontSize={"8px"} >Kiosk</Text>
                                                </Flex>
                                            </Flex>
                                            <Checkbox />
                                        </Flex>
                                    )}
                                    {index === 1 && (
                                        <Flex w={"full"} maxH={"300px"} flexDir={"column"} overflowY={"auto"} gap={"3"} >
                                            <EventDonationPicker />
                                            <EventDonationPicker />
                                            <EventDonationPicker />
                                            <EventDonationPicker />
                                            <EventDonationPicker />
                                        </Flex>
                                    )}
                                    {index === 2 && (

                                        <Flex w={"full"} h={"160px"} pos={"relative"} >
                                            <Flex position={"absolute"} top={["0px"]} maxW={"full"} overflowX={"auto"} sx={
                                                {
                                                    '::-webkit-scrollbar': {
                                                        display: "none"
                                                    }
                                                }
                                            } >
                                                <Flex w={"fit-content"} gap={"2"} >
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >₦33,029</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Hoodie for camp...</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >₦33,029</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Hoodie for camp...</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >₦33,029</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Hoodie for camp...</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >₦33,029</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Hoodie for camp...</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >₦33,029</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Hoodie for camp...</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    )}
                                    {index === 3 && (

                                        <Flex w={"full"} h={"160px"} pos={"relative"} >
                                            <Flex position={"absolute"} top={["0px"]} maxW={"full"} overflowX={"auto"} sx={
                                                {
                                                    '::-webkit-scrollbar': {
                                                        display: "none"
                                                    }
                                                }
                                            } >
                                                <Flex w={"fit-content"} gap={"2"} >
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >NGN 2345/Daily</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Gen Z space</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >NGN 2345/Daily</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Gen Z space</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >NGN 2345/Daily</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Gen Z space</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >NGN 2345/Daily</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Gen Z space</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex onClick={() => setOpen(true)} w={["150px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                                        <Flex w={"full"} h={["79px"]} bgColor={"red"} rounded={"8px"} />
                                                        <Flex flexDir={"column"} gap={"2px"} >
                                                            <Text fontSize={"12px"} fontWeight={"700"} >NGN 2345/Daily</Text>
                                                            <Text fontSize={["10px", "10px", "10px"]} >Gen Z space</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    )}
                                    <Flex w={"full"} py={"1"} bgColor={index === 1 ? "white" : secondaryBackgroundColor} position={"sticky"} bottom={"-4px"} >
                                        <CustomButton text={"Add"} width={"130px"} borderRadius={"999px"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>

                </ModalLayout>
            </Flex>
        </>
    )
}
