import useGetDonationList from '@/hooks/useGetDonationList'
import { IMAGE_URL } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { Grid, GridItem, Flex, Text, Image } from '@chakra-ui/react'
import moment from 'moment'
import router from 'next/router'
import React from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import CustomButton from '../general/Button'
import LoadingAnimation from '../sharedComponent/loading_animation'
import UserImage from '../sharedComponent/userimage'
import DonationGraph from './donationGraph'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import useGetDonationGroup from '@/hooks/useGetDonationGroup'

export default function DonationItemList({ details, singleData }: { details?: boolean, singleData?: IDonationList }) {

    const { data, isLoading } = useGetDonationList()
    const {
        bodyTextColor,
        borderColor,
        primaryColor
    } = useCustomTheme()

    const { data: groupData, isLoading: loading } = useGetDonationGroup()
    

    return (
        <Flex w={"full"} flexDir={"column"} gap={"5"} >
            {!details && (
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
                                            <CustomButton onClick={() => router?.push("/dashboard/donation/" + item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                        </Flex>
                                        <DonationGraph item={item} />
                                        <CustomButton text={"Donate now"} height={"50px"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </GridItem>
                            )
                        })}
                    </Grid>
                </LoadingAnimation>
            )}
            {details && (
                <Text fontWeight={"700"} >Other fund  Raising Available in {singleData?.name} </Text>
            )}
            {details && (
                <LoadingAnimation loading={loading} >
                    {groupData?.map((groupItem, index) => {
                        if(groupItem?.id === singleData?.fundRasingGroupId?.id){
                            return(
                                <Flex key={index} w={"full"} gap={6} overflowX={"auto"} pb={"4"} >
                                    {groupItem?.fundRaisers?.map((item, index) => {

                                        console.log(item);
                                        
                                        
                                        return (
                                            <Flex key={index} minW={"400px"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >
            
                                                {/* <Flex as={"button"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                                    <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                                    <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                                        <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
                                                        <Text fontSize={"12px"} color={bodyTextColor} >{moment(item?.createdDate).fromNow()}</Text>
                                                    </Flex>
                                                </Flex> */}
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
                                                    <CustomButton onClick={() => router?.push("/dashboard/donation/" + item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                                </Flex>
                                                <DonationGraph item={item} />
                                                <CustomButton text={"Donate now"} height={"50px"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )
                        }
                    })}
                </LoadingAnimation>
            )}
        </Flex>
    )
}