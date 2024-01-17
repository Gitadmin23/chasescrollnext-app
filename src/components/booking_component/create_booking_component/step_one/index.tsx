import CustomButton from '@/components/general/Button'
import { Flex, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

interface Props { 
    next?: any
}

function StepOne(props: Props) {
    const { 
        next
    } = props

    const data = [
        "Farm sales",
        "Beach property rentals & sales",
        "Building lot sales",
        "Buying agent services",
        "Commercial property buying & sales",
        "Appraisals",
        "First-time home buyer services",
    ]

    const [selected, setSelected] = useState([] as any)

    const clickHander =(item: any)=> {

        let clone = [...selected]

        if(selected?.includes(item)){ 
            const index = clone.indexOf(item);

            const x = clone.splice(index, 1);

            setSelected(clone)

        } else {
            setSelected([...clone, item])
        }
    }

    return (
        <Flex w={"full"} gap={"6"} >
            <Flex w={"full"} flexDir={"column"} >
                <Text color={"#000000CC"} fontSize={"lg"} fontWeight={"medium"} >Start building a booking Profile</Text>
                <Flex mt={"6"} flexDir={"column"} w={"full"} gap={"1"} >
                    <Text color={"#101828B2"} >Business Name<span style={{ color: "#F04F4F" }} >*</span></Text>
                    <Input h={"45px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Business Name*' />
                </Flex>
                <Flex mt={"4"} flexDir={"column"} w={"full"} gap={"1"} >
                    <Text color={"#101828B2"} >Business Category<span style={{ color: "#F04F4F" }} >*</span></Text>
                    <Input h={"45px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Business Category*' />
                </Flex>
                <Flex mt={"8"} flexDir={"column"} w={"full"} gap={"1"} >
                    <Text color={"#101828B2"} >Business Category<span style={{ color: "#F04F4F" }} >*</span></Text>
                    <Text color={"#00000080"} fontSize={"xs"} >Let customers learn more about your business by adding a description to your booking profile</Text>
                    <Textarea h={"176px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" />
                </Flex>
            </Flex>
            <Flex w={"full"} flexDir={"column"} >
                <Text color={"#000000CC"} fontSize={"lg"} fontWeight={"medium"} >Add your Services</Text>
                <Text fontSize={"sm"} color={"#00000080"} mt={"2"} >Add the Services your business provides, so you can get seen by the right audience</Text>
                <Text color={"#000000CC"} mt={"5"} fontSize={"lg"} fontWeight={"medium"} >Real Estate Agent</Text>
                <Flex flexWrap={"wrap"} gap={"2"} pt={"5"} >
                    {data?.map((item: any, index: number) => {
                        return (
                            <Flex onClick={()=> clickHander(item)} as={"button"} key={index} gap={"10px"} fontSize={"xs"} color={selected?.includes(item) ? "#5D70F9" : "#00000080"} bgColor={selected?.includes(item) ? "#D0D4EB80" : "transparent"} borderColor={selected?.includes(item) ? "#D0D4EB80" : "#00000040"} borderWidth={"1px"} fontWeight={"medium"} alignItems={"center"} justifyContent={"center"} rounded={"5px"} px={"3"} h={"35px"} >
                                <IoMdAdd size={"18px"} /> 
                                {item}
                            </Flex>
                        )
                    })}
                </Flex>
                <Text color={"#5D70F9"} fontSize={"xs"} fontWeight={"medium"} w={"fit-content"} mt={"3"} as={"button"} >Show more</Text>
                <Text color={"#00000080"} mt={"3"} >Didn’t see your services? Add your own.</Text>
                <Flex w={"full"} mt={"5"} justifyContent={"space-between"} alignItems={"center"} >
                    <Flex as={"button"} fontWeight={"medium"} gap={"1"} alignItems={"center"} color={"#5D70F9"} >
                        Add custom service
                    </Flex>
                    <CustomButton onClick={()=> next(1)} borderRadius={"8px"} width={"150px"} text='Next' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default StepOne
