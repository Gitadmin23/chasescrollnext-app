import { Grid, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import CustomButton from '../general/Button'
import { LocationStroke } from '../svg'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'

export default function GetProduct() {

    const { primaryColor, bodyTextColor } = useCustomTheme()
    const { push } = useRouter()


    const { isLoading, data } = useQuery(
        ["getProduct"],
        () => httpService.get(`/Products/search`),
    );

    return (
        <LoadingAnimation loading={isLoading} >
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={"6"} >
                {["First", "Second", "Third", "Fourth"]?.map((type: any, index: number) => (
                    <Flex key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={"4"} gap={"4"} style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} >
                        <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                            <Flex w={"32px"} h={"32px"} bgColor={"red"} rounded={"full"} roundedTopRight={"0px"} />
                            <Flex flexDir={"column"}>
                                <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} >
                                    Miracle Jason
                                </Text>
                                <Text fontSize={"12px"} color={bodyTextColor} >
                                    2 hours ago
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex w={"full"} h={"210px"} bgColor={"blue"} rounded={"8px"} >

                        </Flex>
                        <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                            <Text fontSize={"24px"} fontWeight={"600"} color={primaryColor} >Hoodie for camp x 201</Text>
                            <Flex alignItems={"center"} >
                                <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >₦33,029</Text>
                                <Text fontSize={"14px"} fontWeight={"700"} ml={"1"} color={"#B6B6B6"} textDecor={"strikethrough"} >₦33,029</Text>
                                <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >3 Avail</Text>
                            </Flex>
                            <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                <LocationStroke />
                                <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >27 Abacha Road , Abuja Ng</Text>
                            </Flex>
                            <CustomButton onClick={() => push("/dashboard/kisok/details")} text={"Order Now"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                        </Flex>
                    </Flex>
                ))}
            </Grid>
        </LoadingAnimation>
    )
}
