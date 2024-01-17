import CustomButton from '@/components/general/Button'
import { Checkbox, Flex, Input, Select, Text } from '@chakra-ui/react'
import React from 'react'

interface Props { 
    next?: any
}

function StepThree(props: Props) {
    const { 
        next
    } = props

    return (
        <Flex maxW={"412px"} w={"full"} flexDir={"column"} >
            <Text color={"#000000CC"} fontSize={"2xl"} fontWeight={"medium"} >Add your Contact Info</Text>
            <Text fontSize={"sm"} color={"#00000080"} mt={"2"} >Add a phone number, website or both on your booking profile</Text>
            <Flex my={"6"} flexDir={"column"} w={"full"} gap={"4"} >
                <Flex gap={"1"} flexDir={"column"} >
                    <Text color={"#101828B2"} >Phone Number</Text>
                    <Input h={"45px"} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Phone Number' />
                </Flex>
                <Flex gap={"1"} flexDir={"column"} >
                    <Text color={"#101828B2"} >Website</Text>
                    <Input h={"45px"} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Current Website url' />
                </Flex>
                <Flex gap={"2"} alignItems={"center"} >
                    <Checkbox size={"lg"} />
                    <Text>I don’t have a website</Text>
                </Flex>
            </Flex>
            <Text color={"#000000CC"} mt={"6"} fontSize={"lg"} fontWeight={"medium"} >Social Media Handles</Text>
            <Text fontSize={"xs"} color={"#00000080"} mt={"2"} >Select and add your social media link</Text>
            <Flex my={"6"} flexDir={"column"} w={"full"} gap={"4"} >
                <Flex gap={"1"} flexDir={"column"} >
                    <Select h={"45px"} borderWidth={"0px"} borderBottomWidth={"1px"} rounded={"none"} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Social Media' >
                        <option>Facebook</option>
                    </Select>
                </Flex>
                <Flex gap={"1"} flexDir={"column"} >
                    <Input h={"45px"} borderWidth={"0px"} borderBottomWidth={"1px"} rounded={"none"} borderColor={"#A3A3A3"} _active={{borderWidth: "0px", borderBottomWidth: "1px"}} _focus={{borderWidth: "0px", borderBottomWidth: "1px"}} focusBorderColor="transparent" placeholder='www.Facebook.com/archibong' />
                </Flex>
            </Flex>
            <CustomButton onClick={()=> next(3)} borderRadius={"8px"} width={"full"} text='Next' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
        </Flex>
    )
}

export default StepThree
