"use client"
import useGetDonationList from '@/hooks/useGetDonationList';
import { IMAGE_URL } from '@/services/urls';
import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import useCustomTheme from '@/hooks/useTheme';
import DonationGraph from './donationGraph';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import UserImage from '../sharedComponent/userimage';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { textLimit } from '@/utils/textlimit';
import { useRouter } from 'next/navigation';
import DonationPayment from './donationPayment';
import usePaystackStore from '@/global-state/usePaystack';
import Fundpaystack from '../settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import { IoArrowBack } from 'react-icons/io5';
import DonateUsers from '../sharedComponent/donateUser';
import { DashboardEditIcon, DashboardOrganizerIcon, WalletIcon } from '../svg';
import ShareEvent from '../sharedComponent/share_event';
import useDonationStore from '@/global-state/useDonationState';
import BlurredImage from '../sharedComponent/blurred_image';
import DonationGroupModal from './donationGroupModal';
import useGetSingleDonationList from '@/hooks/useGetSingleDonation';
import DonationCollaborator from '../create_donation/donationCollaborator';
import { isDateInPast } from '@/utils/isPast';

export default function DonationGroupDetails({ id, notAuth }: { id: string, notAuth?: boolean }) {

    // const { data: groupData, isLoading: loading, isRefetching } = useGetDonationGroup(id)
    const { singleData: item, isLoading } = useGetSingleDonationList(id)

    const {
        borderColor,
        bodyTextColor,
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    const router = useRouter()
    const { configPaystack, setPaystackConfig, message, setMessage } = usePaystackStore((state) => state);
    const [isCollaborator, setCollaborate] = useState<Array<any>>([])

    const userId = localStorage.getItem('user_id') + "";

    const { updateDontion } = useDonationStore((state) => state)

    useEffect(() => {
        updateDontion([{
            "visibility": "PUBLIC",
            creatorID: userId,
            name: "",
            bannerImage: "",
            description: "",
            endDate: "",
            goal: "",
            purpose: "",
            collaborators: []
        }])
    }, [])

    useEffect(() => {
        if (isCollaborator?.length <= 0) {
            const collaborators: Array<string> = []

            item?.collaborators?.map((item: any) => {
                return collaborators.push(item?.userId + "")
            })

            setCollaborate(collaborators)
        }

    }, [item])


    return (
        <Flex w={"full"} pos={"relative"} flexDir={"column"} overflowY={["auto", "auto", "hidden"]} >
            {!notAuth && (
                <Flex gap={4} px={"6"} display={["none", "none", "flex"]} py={"4"} alignItems={"center"} >
                    <Flex as={"button"} onClick={() => router?.push("/dashboard/donation")} >
                        <IoArrowBack size={"30px"} />
                    </Flex>
                    <Text fontWeight={"700"} fontSize={["14px", "14px", "24px"]} >Fundraising Details</Text>
                </Flex>
            )}
            {!notAuth && (
                <Flex gap={4} px={"6"} display={["flex", "flex", "none"]} py={"4"} alignItems={"center"} >
                    <Flex as={"button"} onClick={() => router?.push("/dashboard/donation")} >
                        <IoArrowBack size={"20px"} />
                    </Flex>
                    <Text fontWeight={"700"} fontSize={["14px", "14px", "24px"]} >Fundraising Details</Text>
                </Flex>
            )}
            <LoadingAnimation loading={isLoading} >
                {item && (
                    <Flex w={"full"} display={["none", "none", "flex"]} h={["auto", "auto", "full"]} flexDir={["column-reverse", "column-reverse", "row"]} overflowY={["auto", "auto", "hidden"]} >
                        <Flex w={"full"} p={"6"} flexDir={"column"} gap={"6"} overflowY={["auto"]}>
                            <DonationGroupModal notAuth={notAuth} selectedData={item} />
                            <Flex w={"full"} h={"300px"} display={["block", "block", "none", "none", "none"]} />
                        </Flex>
                        <Flex w={"full"} overflowY={["clip", "clip", "auto"]} overflowX={"hidden"} >
                            <Flex flexDir={"column"} h={"auto"} w={"full"} gap={"6"} p={"6"} >

                                <Flex w={'full'} h={"350px"} rounded={"8px"} >
                                    {/* <EventImage data={item} width={"full"} height={"350px"} /> */}
                                    <BlurredImage height={["350px"]} image={item?.bannerImage} />
                                    {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                                </Flex>
                                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
                                        <Text fontSize={"24px"} fontWeight={"700"} >{capitalizeFLetter(item?.name)}</Text>
                                    </Flex>
                                    <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                                </Flex>
                                <Flex w={["full", "full", "full", "full"]} flexDir={["column"]} >
                                    <Flex w={"full"} flexDir={"column"} gap={"4"} pb={"6"} pr={["0px", "0px", "0px", "6", "6"]} borderColor={borderColor} >

                                        <DonationGraph rounded='64px' item={item} />
                                        <DonateUsers donationDetail={true} size={"50px"} event={item} fontSize={14} border='1px' />
                                        {/* </Flex> */}
                                        <Flex justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex flexDir={"column"} >
                                                <Text fontWeight={"500"} >Date Created</Text>
                                                <Text fontSize={"14px"} >{dateFormat(item?.createdDate)}{" "}{timeFormat(item?.createdDate)}</Text>
                                            </Flex>
                                            {(item?.createdBy?.userId === userId && isDateInPast(item?.endDate)) && (
                                                <DonationCollaborator update={true} singleData={item} index={0} />
                                            )}
                                        </Flex>
                                        <Flex justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex flexDir={"column"} >
                                                <Text fontWeight={"500"} >End Date</Text>
                                                <Text fontSize={"14px"} >{dateFormat(item?.endDate)}{" "}{timeFormat(item?.endDate)}</Text>
                                            </Flex>
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
                                    {((userId === item?.createdBy?.userId) || item?.isCollaborator) ? (
                                        <Flex bg={["transparent", "transparent", mainBackgroundColor, mainBackgroundColor]} insetX={"3"} mt={["0px", "0px", "0px", "0px"]} bottom={[notAuth ? "1" : "14", notAuth ? "1" : "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} mx={"auto"} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                            <Flex bgColor={secondaryBackgroundColor} w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"64px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} h={"90px"} justifyContent={"center"} >

                                                <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
                                                    <Flex bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router?.push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                                                        <DashboardOrganizerIcon />
                                                        <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                                                    </Flex>
                                                    <Flex disabled={item?.isCollaborator || item?.total > 0} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router?.push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                                                        <DashboardEditIcon />
                                                        <Text fontSize={"12px"} fontWeight={"500"} >Edit</Text>
                                                    </Flex>
                                                    <Flex disabled={item?.isCollaborator} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => router?.push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                                                        <WalletIcon color='#5D70F9' />
                                                        <Text fontSize={"12px"} fontWeight={"500"} >Cash Out</Text>
                                                    </Flex>
                                                </Flex>
                                            </Flex>

                                        </Flex>
                                    ) : (
                                        <Flex w={["auto", "auto", "full", "full"]} flexDir={"column"} gap={"4"} >
                                            <Flex bgColor={"transparent"} insetX={["6", "6", "0px"]} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "full"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "0px", "0px"]} >
                                                <DonationPayment fullWidth={true} data={item} />
                                            </Flex>
                                        </Flex>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {item && (
                    <Flex w={"full"} display={["flex", "flex", "none"]} h={["full"]} flexDir={"column"} >
                        <Flex flexDir={"column"} h={"auto"} w={"full"} gap={"6"} p={"6"} >
                            <Flex w={'full'} h={"350px"} rounded={"8px"} >
                                {/* <EventImage data={item} width={"full"} height={"350px"} /> */}
                                <BlurredImage height={["350px"]} image={item?.bannerImage} />
                                {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                            </Flex>
                            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                <Flex flexDir={"column"} >
                                    <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
                                    <Text fontSize={"24px"} fontWeight={"700"} >{capitalizeFLetter(item?.name)}</Text>
                                </Flex>
                                <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                            </Flex>
                            <Flex w={["full", "full", "full", "full"]} flexDir={["column"]} >
                                <Flex w={"full"} flexDir={"column"} gap={"4"} pb={"6"} pr={["0px", "0px", "0px", "6", "6"]} borderColor={borderColor} >

                                    <DonationGraph isDonation={true} rounded='64px' item={item} />
                                    <DonateUsers donationDetail={true} size={"50px"} event={item} fontSize={14} border='1px' />
                                    {/* </Flex> */}
                                    <Flex justifyContent={"space-between"} alignItems={"center"} >
                                        <Flex flexDir={"column"} >
                                            <Text fontWeight={"500"} >Date Created</Text>
                                            <Text fontSize={"14px"} >{dateFormat(item?.createdDate)}{" "}{timeFormat(item?.createdDate)}</Text>
                                        </Flex>
                                        {(item?.createdBy?.userId === userId && isDateInPast(item?.endDate)) && (
                                            <DonationCollaborator update={true} singleData={item} index={0} />
                                        )}
                                    </Flex>
                                    <Flex justifyContent={"space-between"} alignItems={"center"} >
                                        <Flex flexDir={"column"} >
                                            <Text fontWeight={"500"} >End Date</Text>
                                            <Text fontSize={"14px"} >{dateFormat(item?.endDate)}{" "}{timeFormat(item?.endDate)}</Text>
                                        </Flex>
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
                                {((userId === item?.createdBy?.userId) || item?.isCollaborator) ? (
                                    <Flex bg={["transparent", "transparent", mainBackgroundColor, mainBackgroundColor]} insetX={"3"} mt={["0px", "0px", "0px", "0px"]} bottom={[notAuth ? "1" : "14", notAuth ? "1" : "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} mx={"auto"} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                        <Flex bgColor={secondaryBackgroundColor} w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"64px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} h={"90px"} justifyContent={"center"} >

                                            <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
                                                <Flex bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router?.push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                                                    <DashboardOrganizerIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator || item?.total > 0} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router?.push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                                                    <DashboardEditIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Edit</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => router?.push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                                                    <WalletIcon color='#5D70F9' />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Cash Out</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                    </Flex>
                                ) : (
                                    <Flex w={["auto", "auto", "full", "full"]} flexDir={"column"} gap={"4"} >
                                        <Flex bgColor={"transparent"} insetX={["6", "6", "0px"]} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "full"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "0px", "0px"]} >
                                            <DonationPayment fullWidth={true} data={item} />
                                        </Flex>
                                    </Flex>
                                )}
                                <Flex w={"full"} gap={"4"} flexDir={"column"} >
                                    <DonationGroupModal notAuth={notAuth} selectedData={item} />
                                    <Flex w={"full"} h={"100px"} display={["block", "block", "none", "none", "none"]} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </LoadingAnimation>
            <Fundpaystack id={item?.id} config={configPaystack} setConfig={setPaystackConfig} message={message} />
        </Flex>
    )
}
