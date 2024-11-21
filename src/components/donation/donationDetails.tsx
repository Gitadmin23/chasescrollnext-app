"use client"
import useGetDonationList from '@/hooks/useGetDonationList';
import { IMAGE_URL } from '@/services/urls';
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import useCustomTheme from '@/hooks/useTheme';
import DonationGraph from './donationGraph';
import { dateFormat } from '@/utils/dateFormat';
import UserImage from '../sharedComponent/userimage';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { textLimit } from '@/utils/textlimit';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import DonationPayment from './donationPayment';
import DonationItemList from './donationItemList';
import usePaystackStore from '@/global-state/usePaystack';
import Fundpaystack from '../settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import useGetDonationGroup from '@/hooks/useGetDonationGroup';
import { IoArrowBack } from 'react-icons/io5';
import DonateUsers from '../sharedComponent/donateUser';
import { DashboardEditIcon, DashboardOrganizerIcon, DashboardScannerIcon, WalletIcon, WalletIcon2 } from '../svg';
import ShareEvent from '../sharedComponent/share_event';

export default function DonationDetails({ id }: { id: string }) {

    const { singleData: item, isLoading } = useGetDonationList(id)

    const {
        borderColor,
        bodyTextColor,
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    const router = useRouter()
    const { configPaystack, setPaystackConfig, donation } = usePaystackStore((state) => state);

    const userId = localStorage.getItem('user_id') + "";


    const clickHandler = () => {

    }


    return (
        <Flex w={"full"} pos={"relative"} flexDir={"column"} overflowY={"auto"} >
            <LoadingAnimation loading={isLoading} >
                {item && (
                    <Flex flexDir={"column"} w={"full"} gap={"6"} p={"6"} >
                        <Flex gap={4} alignItems={"center"} >
                            <Flex as={"button"} onClick={() => router?.back()} >
                                <IoArrowBack size={"30px"} />
                            </Flex>
                            <Text fontWeight={"700"} fontSize={"24px"} >Fundraising Details</Text>
                        </Flex>
                        <Flex w={'full'} h={"350px"} rounded={"8px"} >
                            <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} />
                        </Flex>
                        <Flex w={["full", "full", "full", "full"]} flexDir={["column", "column", "row", "row"]} >
                            <Flex w={"full"} flexDir={"column"} gap={"4"} pb={"6"} pr={["0px", "0px", "0px", "6", "6"]} borderColor={borderColor} >
                                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
                                        <Text fontSize={"24px"} fontWeight={"700"} >{item?.name}</Text>
                                    </Flex> 
                                    <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                                </Flex>
                                <DonationGraph rounded='64px' item={item} />
                                {/* <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >

                                    <Flex flexDir={"column"} >
                                        <Text fontWeight={"600"} >People who donated</Text>
                                        <Text fontSize={"12px"} color={bodyTextColor} >350 users donated already</Text>
                                    </Flex> */}

                                <DonateUsers donationDetail={true} size={"50px"} event={item} fontSize={14} border='1px' />
                                {/* </Flex> */}
                                <Flex justifyContent={"space-between"} alignItems={"center"} >
                                    <Text fontWeight={"500"} >Date Created</Text>
                                    <Text fontSize={"14px"} >{dateFormat(item?.createdDate)}</Text>
                                </Flex>
                                <Flex flexDir={"column"} >
                                    <Text fontWeight={"500"} >Fundraising Description</Text>
                                    <Text fontSize={"14px"} color={bodyTextColor} >{item?.description}</Text>
                                </Flex>

                                <Flex as={"button"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                    <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                    <Flex display={["block"]} flexDir={"column"} textAlign={"left"}  >
                                        <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"700"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
                                        <Text fontSize={"12px"} color={primaryColor} fontWeight={"600"} textDecoration={"underline"} >View Profile</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            {userId !== item?.createdBy?.userId ? (
                                <Flex bg={mainBackgroundColor} insetX={"6"} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                    <DonationPayment data={item} />
                                </Flex>
                            ) : (
                                <Flex bg={mainBackgroundColor} insetX={"6"} mt={["0px", "0px", "16", "16"]} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                    <Flex bgColor={secondaryBackgroundColor} w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"64px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} p={"5"}  >

                                        {/* <Button borderWidth={"1px"} onClick={() => router?.push("/dashboard/settings/payment/details")} borderColor={primaryColor} w={"full"} h={"50px"} rounded={"32px"} color={primaryColor} fontWeight={"600"} bgColor={"#EFF5F8"} _hover={{ backgroundColor: "#EFF5F8" }} >
                                            Withdraw Cash
                                        </Button>
                                        <Button onClick={() => router?.push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} w={"full"} h={"50px"} rounded={"32px"} color={"white"} fontWeight={"600"} bgColor={primaryColor} _hover={{ backgroundColor: primaryColor }} >
                                            Dashboard
                                        </Button> */}

                                        <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
                                            <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router?.push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                                                <DashboardOrganizerIcon />
                                                <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                                            </Flex>
                                            <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router?.push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                                                <DashboardEditIcon />
                                                <Text fontSize={"12px"} fontWeight={"500"} >Edit Event</Text>
                                            </Flex>
                                            <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => router?.push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                                                <WalletIcon color='#5D70F9' />
                                                <Text fontSize={"12px"} fontWeight={"500"} >Withdraw Cash</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                </Flex>
                            )}
                        </Flex>
                        {item?.fundRasingGroupId?.id && (
                            <DonationItemList singleData={item} details={true} />
                        )}
                        <Flex w={"full"} h={"200px"} display={["block", "block", "none", "none", "none"]} />
                    </Flex>
                )}
            </LoadingAnimation>
            <Fundpaystack id={item?.id} config={configPaystack} setConfig={setPaystackConfig} donation={donation} />

        </Flex>
    )
}
