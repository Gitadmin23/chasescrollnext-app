import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IoStar } from 'react-icons/io5'

export default function ProductRating() {

    const { borderColor } = useCustomTheme()

    return (
        <Flex maxW={"full"} flexDir={"column"} gap={"4"} >
            <Flex overflowX={"auto"} >
                <Flex w={"auto"} gap={"4"} >
                    <Text fontSize={"20px"} w={"130px"} fontWeight={"600"} textDecor={"underline"} >Reviews (100)</Text>
                    <Flex h={"32px"} w={"101px"} rounded={"64px"} borderWidth={"1px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} >
                        <Text fontSize={"13px"} fontWeight={"500"} >Good (34)</Text>
                    </Flex>
                    <Flex h={"32px"} w={"101px"} rounded={"64px"} borderWidth={"1px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} >
                        <Text fontSize={"13px"} fontWeight={"500"} >Satisfied (43)</Text>
                    </Flex>
                    <Flex h={"32px"} w={"101px"} rounded={"64px"} borderWidth={"1px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} >
                        <Text fontSize={"13px"} fontWeight={"500"} >Satisfied (43)</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDir={"column"} gap={"4"} mt={"4"} >
                {[1, 2, 3, 4]?.map((item) => (
                    <Flex key={item} flexDir={"column"} gap={"2"} >
                        <Flex gap={"2"} alignItems={"center"} >
                            <IoStar size={"24px"} color={"#1E1E1E"} />
                            <IoStar size={"24px"} color={"#1E1E1E"} />
                            <IoStar size={"24px"} color={"#1E1E1E"} />
                            <IoStar size={"24px"} color={"#1E1E1E"} />
                            <IoStar size={"24px"} color={"#D5D6DE"} />
                        </Flex>
                        <Text ><span style={{ fontWeight: "500", fontSize: "20px" }} >Archibong Felix:</span> Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit cons, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, l</Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}
