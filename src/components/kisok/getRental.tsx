import { Grid, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import CustomButton from '../general/Button'
import { LocationStroke } from '../svg'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'

export default function GetRental() {

    const { primaryColor, bodyTextColor } = useCustomTheme()
    const { push } = useRouter()


    const { isLoading, isRefetching, refetch, data } = useQuery(
        ["getProduct"],
        () => httpService.get(`/rental/search`),
    );

    console.log(data);


    return (
        <LoadingAnimation loading={isLoading}  >

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
                            <Flex flexDir={"column"} >
                                <Text fontSize={"14px"} fontWeight={"600"}  >Property Name</Text>
                                <Text fontSize={"24px"} fontWeight={"600"} >Hoodie for camp x 201</Text>
                            </Flex>
                            <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >1bd| 1ba | 624sqft +3 more units</Text>
                            <Text fontSize={"24px"} fontWeight={"600"} >NGN 3432/ Daily</Text>
                            <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                <LocationStroke />
                                <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >27 Abacha Road , Abuja Ng</Text>
                            </Flex>
                            <CustomButton onClick={() => push("/dashboard/kisok/details-rental")} text={"View Rental Services"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                        </Flex>
                    </Flex>
                ))}
            </Grid>
        </LoadingAnimation>
    )
}
