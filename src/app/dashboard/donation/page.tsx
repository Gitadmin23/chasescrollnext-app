"use client"
import CustomButton from '@/components/general/Button'
import CircularProgressBar from '@/components/sharedComponent/circleGraph'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import UserImage from '@/components/sharedComponent/userimage'
import useGetDonationList from '@/hooks/useGetDonationList'
import useCustomTheme from '@/hooks/useTheme'
import { IMAGE_URL } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { formatNumber } from '@/utils/numberFormat'
import { textLimit } from '@/utils/textlimit'
import { Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoInformationCircle, IoInformationCircleOutline } from 'react-icons/io5'

export default function Donation() {

    const {
        primaryColor,
        bodyTextColor,
        secondaryBackgroundColor,
        borderColor,
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const { data, isLoading } = useGetDonationList()

    const router = useRouter()

    return (
        <Flex w={"full"} px={"6"} py={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Text fontSize={"24px"} fontWeight={"700"} ><span style={{ color: primaryColor }} >Chasescroll</span> Fund Raising</Text>
            </Flex>
            <Flex py={"4"} gap={"6"} alignItems={"center"} >
                <Text  >Fund Raising Campaign  ongoing </Text>
                <CustomButton text={"New fund raising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"fit-content"} />
                <CustomButton text={"My fund raising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={secondaryBackgroundColor} borderRadius={"32px"} fontWeight={"600"} color={headerTextColor} width={"fit-content"} />
            </Flex>
            <Flex w={"full"} gap={"4"} pb={6} pt={4} >
                <CustomButton text={"Health"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"fit-content"} />
                <CustomButton text={"Go fund me"} borderWidth={"1px"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={mainBackgroundColor} borderRadius={"32px"} fontWeight={"600"} color={headerTextColor} width={"fit-content"} borderColor={borderColor} />
            </Flex>
            <LoadingAnimation loading={isLoading} >
                <Grid w={"full"} templateColumns='repeat(3, 1fr)' gap={6} >
                    {data?.map((item, index) => {
                        return (
                            <GridItem key={index} >
                                <Flex w={"full"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >

                                    <Flex as={"button"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                        <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                        <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                            <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text> 
                                            <Text fontSize={"12px"} color={bodyTextColor} >{moment(item?.createdDate).fromNow()}</Text>
                                        </Flex>
                                    </Flex>
                                    <Flex w={'full'} h={"150px"} rounded={"8px"} >
                                        <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} />
                                    </Flex>
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={"14px"} color={bodyTextColor} >Fund Raising Title</Text>
                                        <Text fontWeight={"700"} >{item?.name}</Text>
                                    </Flex>
                                    <Flex w={"full"} borderWidth={"1px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                        <Flex gap={"1"} alignItems={"center"} >
                                            <IoInformationCircleOutline />
                                            <Text fontSize={"12px"} >More fundraising available  </Text>
                                        </Flex>
                                        <CustomButton text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                    </Flex>
                                    <Flex w={"full"} borderWidth={"1px"} alignItems={"center"} borderColor={borderColor} rounded={"8px"} py={"3"} px={"8px"} justifyContent={"space-between"} >
                                        <Flex flexDirection={"column"} >
                                            <Text color={bodyTextColor} >Target</Text>
                                            <Text fontWeight={"600"} >{formatNumber(item?.goal)}</Text>
                                        </Flex>
                                        <Flex flexDirection={"column"} >
                                            <Text color={bodyTextColor} >Amount </Text>
                                            <Text fontWeight={"600"} >{formatNumber(item?.total)}</Text>
                                        </Flex>

                                        <CircularProgressBar progress={50} />
                                    </Flex>
                                    <CustomButton text={"Donate now"} height={"50px"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                </Flex>
                            </GridItem>
                        )
                    })}
                </Grid>
            </LoadingAnimation>
        </Flex>
    )
}