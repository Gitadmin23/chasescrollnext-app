import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Box, Flex, Input, Modal, Radio, Stack, Text } from '@chakra-ui/react'
import { RadioGroup } from '@headlessui/react'
import React from 'react'

interface Props {
    next?: any
}

function StepTwo(props: Props) {
    const { 
        next
    } = props

    const [value, setValue] = React.useState('1')
    const [open, setOpen] = React.useState(false)

    return (
        <Flex w={"full"} flexDir={"column"} >
            <Text color={"#000000CC"} fontSize={"lg"} fontWeight={"medium"} >Location For your Business/Booking</Text>
            <Text fontSize={"sm"} color={"#00000080"} mt={"2"} >This location will show up on your Chasescroll ‘My Booking’ profile for customers to see when looking for your business</Text>

            {/* <RadioGroup defaultValue={value}>
                <Stack direction="column" py={"6"} >
                    <Radio size='lg' fontSize={"lg"} fontWeight={"medium"} value='1'>Physical Venue</Radio>
                    <Radio size='lg' fontSize={"lg"} fontWeight={"medium"} value='2'>Virtual</Radio>
                    <Radio size='lg' fontSize={"lg"} fontWeight={"medium"} value='3'>Remote</Radio>
                </Stack>
            </RadioGroup> */}
            <Flex flexDir={"column"} py={"6"} gap={"5"} >
                <Flex alignItems={"center"} gap={"3"} >
                    <Flex onClick={()=> setValue("1")} as={"button"} w={"20px"} h={"20px"} borderWidth={value === "1" ? "1px" : "1px"} borderColor={value === "1" ? "#5D70F9" : "#D0D5DD"} rounded={"full"} justifyContent={"center"} alignItems={"center"} >
                        <Box w={"8px"} h={"8px"} bgColor={value === "1" ? "#5D70F9" : "transparent"} rounded={"full"} />
                    </Flex>
                    <Text fontWeight={"medium"} fontSize={"lg"} >Physical Venue</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"3"} >
                    <Flex onClick={()=> setValue("2")} as={"button"} w={"20px"} h={"20px"} borderWidth={value === "2" ? "1px" : "1px"} borderColor={value === "2" ? "#5D70F9" : "#D0D5DD"} rounded={"full"} justifyContent={"center"} alignItems={"center"} >
                        <Box w={"8px"} h={"8px"} bgColor={value === "2" ? "#5D70F9" : "transparent"} rounded={"full"} />
                    </Flex>
                    <Text fontWeight={"medium"} fontSize={"lg"} >Virtual</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"3"} >
                    <Flex onClick={()=> setValue("3")} as={"button"} w={"20px"} h={"20px"} borderWidth={value === "3" ? "1px" : "1px"} borderColor={value === "3" ? "#5D70F9" : "#D0D5DD"} rounded={"full"} justifyContent={"center"} alignItems={"center"} >
                        <Box w={"8px"} h={"8px"} bgColor={value === "3" ? "#5D70F9" : "transparent"} rounded={"full"} />
                    </Flex>
                    <Text fontWeight={"medium"} fontSize={"lg"} >Remote</Text>
                </Flex>
            </Flex>
            <CustomButton onClick={()=> setOpen(true)} borderRadius={"8px"} width={"250px"} text='Next' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
            <ModalLayout open={open} close={setOpen} title='What ‘s the  Address?' titlecolor='#292D32' size={"lg"} >
                <Box px={"16"} pb={"6"} >
                    <Text color={"#101828B2"} >This location will show up on your Chasescroll ‘My Booking’ profile for customers to see when looking for your business</Text>
                    <Flex my={"6"} flexDir={"column"} w={"full"} gap={"1"} >
                        <Flex gap={"1"} flexDir={"column"} >
                            <Text fontSize={"sm"} color={"#101828B2"} >Country</Text>
                            <Input h={"40px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Country' />
                        </Flex>
                        <Flex gap={"1"} flexDir={"column"} >
                            <Text fontSize={"sm"} color={"#101828B2"} >Street Address</Text>
                            <Input h={"40px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Street Address' />
                        </Flex>
                        <Flex gap={"1"} flexDir={"column"} >
                            <Text fontSize={"sm"} color={"#101828B2"} >City</Text>
                            <Input h={"40px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='City' />
                        </Flex>
                        <Flex gap={"1"} flexDir={"column"} >
                            <Text fontSize={"sm"} color={"#101828B2"} >Zip Code</Text>
                            <Input h={"40px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Zip Code' />
                        </Flex>
                        <Flex gap={"1"} flexDir={"column"} >
                            <Text fontSize={"sm"} color={"#101828B2"} >State</Text>
                            <Input h={"40px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='State' />
                        </Flex>
                    </Flex> 
                    <CustomButton onClick={()=> next(2)} borderRadius={"8px"} width={"full"} text='Next' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
                </Box>
            </ModalLayout>
        </Flex>
    )
}

export default StepTwo
