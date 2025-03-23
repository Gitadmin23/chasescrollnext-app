"use client"
import { Flex, Grid, Image, Text } from '@chakra-ui/react'
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
import { CalendarIcon, DashboardEditIcon, DashboardOrganizerIcon, WalletIcon } from '../svg';
import ShareEvent from '../sharedComponent/share_event';
import useDonationStore from '@/global-state/useDonationState';
import BlurredImage from '../sharedComponent/blurred_image';
import DonationCollaborator from '../create_donation/donationCollaborator';
import useGetSingleDonationList from '@/hooks/useGetSingleDonation';
import { isDateInPast } from '@/utils/isPast';
import { IMAGE_URL } from '@/services/urls';
import { IoIosArrowForward } from 'react-icons/io';
import EventMap from '../event_details_component/event_map_info';
import CustomButton from '../general/Button';
import ProductRating from '../kisok/productRating';
import RentalCheckout from '../kisok/rentalCheckout';
import DescriptionPage from '../sharedComponent/descriptionPage';

export default function DonationDetails({ id, notAuth }: { id: string, notAuth?: boolean }) {

    // const { singleData: item, isLoading } = useGetDonationList(id)
    const { singleData: item, isLoading } = useGetSingleDonationList(id)

    const {
        borderColor,
        bodyTextColor,
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    const { back, push } = useRouter()
    const { configPaystack, setPaystackConfig } = usePaystackStore((state) => state);
    const [isCollaborator, setCollaborate] = useState<Array<any>>([])

    const userId = localStorage.getItem('user_id') + "";

    const { updateDontion, data } = useDonationStore((state) => state)

    React.useEffect(() => {
        if (!isLoading) {
            if (!data[0]?.name) {

                const clone = [{
                    bannerImage: item?.bannerImage,
                    creatorID: item?.createdBy?.userId,
                    description: item?.description,
                    endDate: item?.endDate,
                    goal: item?.goal,
                    name: item?.name,
                    purpose: item?.purpose,
                    visibility: item?.visibility,
                    funnelID: item?.funnelID,
                    collaborators: [] as any
                }]

                const collaborators: Array<string> = []

                item?.collaborators?.map((item: any) => {
                    return collaborators.push(item?.userId + "")
                })

                clone[0].collaborators = [...collaborators]

                updateDontion(clone)

            }
        }
    }, [isLoading, item])

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
        // <Flex w={"full"} pos={"relative"} flexDir={"column"} overflowY={"auto"} >
        //     <LoadingAnimation loading={isLoading} >
        //         {item && (
        //             <Flex flexDir={"column"} w={"full"} gap={"6"} p={"6"} >
        //                 {!notAuth && (
        //                     <Flex gap={4} alignItems={"center"} >
        //                         <Flex as={"button"} onClick={() => router?.push("/dashboard/donation")} >
        //                             <IoArrowBack size={"30px"} />
        //                         </Flex>
        //                         <Text fontWeight={"700"} fontSize={"24px"} >Fundraising Details</Text>
        //                     </Flex>
        //                 )}
        //                 <Flex w={'full'} h={"350px"} rounded={"8px"} >
        //                     {/* <EventImage data={item} width={"full"} height={"350px"} /> */}
        //                     <BlurredImage height={["350px"]} image={item?.bannerImage} />
        //                     {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
        //                 </Flex>
        //                 <Flex w={["full", "full", "full", "full"]} flexDir={["column", "column", "row", "row"]} >
        //                     <Flex w={"full"} flexDir={"column"} gap={"4"} pb={"6"} pr={["0px", "0px", "0px", "6", "6"]} borderColor={borderColor} >

        //                         <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
        //                             <Flex flexDir={"column"} >
        //                                 <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
        //                                 <Text fontSize={"24px"} fontWeight={"700"} >{capitalizeFLetter(item?.name)}</Text>
        //                             </Flex>
        //                             {isDateInPast(item?.endDate) && (
        //                                 <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
        //                             )}
        //                         </Flex>
        //                         <DonationGraph rounded='16px' item={item} />
        //                         <DonateUsers donationDetail={true} size={"42px"} event={item} fontSize={14} border='1px' />
        //                         {/* </Flex> */}
        //                         <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
        //                             <Text fontWeight={"500"} >Date Created</Text>
        //                             <Text fontSize={"14px"} >{dateFormat(item?.createdDate)}{" "}{timeFormat(item?.createdDate)}</Text>
        //                         </Flex>
        //                         <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
        //                             <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}  >
        //                                 <Text fontWeight={"500"} >End Date</Text>
        //                                 <Text fontSize={"14px"} >{dateFormat(item?.endDate)}{" "}{timeFormat(item?.endDate)}</Text>
        //                             </Flex>
        //                         </Flex>
        //                         <Flex flexDir={"column"} >
        //                             <Text fontWeight={"500"} >Fundraising Description</Text>
        //                             <Text fontSize={"14px"} color={bodyTextColor} >{item?.description}</Text>
        //                         </Flex>

        //                         <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
        //                             <Flex as={"button"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
        //                                 <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
        //                                 <Flex display={["block"]} flexDir={"column"} textAlign={"left"}  >
        //                                     <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"700"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
        //                                     <Text fontSize={"12px"} color={primaryColor} fontWeight={"600"} textDecoration={"underline"} >View Profile</Text>
        //                                 </Flex>
        //                             </Flex>
        //                             {(item?.createdBy?.userId === userId && isDateInPast(item?.endDate)) && (
        //                                 <DonationCollaborator update={true} singleData={item} index={0} />
        //                             )}
        //                         </Flex>
        //                     </Flex>
        //                     {((userId === item?.createdBy?.userId) || item?.isCollaborator) ? (
        //                         <Flex bg={["transparent", "transparent", mainBackgroundColor, mainBackgroundColor]} insetX={"3"} mt={["0px", "0px", "0px", "0px"]} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
        //                             <Flex bgColor={mainBackgroundColor} w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} h={"90px"} justifyContent={"center"} >

        //                                 <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
        //                                     <Flex bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router?.push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
        //                                         <DashboardOrganizerIcon />
        //                                         <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
        //                                     </Flex>
        //                                     <Flex disabled={item?.isCollaborator || item?.total > 0 || !isDateInPast(item?.endDate)} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} role='button' as={"button"} onClick={() => router?.push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
        //                                         <DashboardEditIcon />
        //                                         <Text fontSize={"12px"} fontWeight={"500"} >Edit</Text>
        //                                     </Flex>
        //                                     <Flex disabled={item?.isCollaborator} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => router?.push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
        //                                         <WalletIcon color='#5D70F9' />
        //                                         <Text fontSize={"12px"} fontWeight={"500"} >Cash Out</Text>
        //                                     </Flex>
        //                                 </Flex>
        //                             </Flex>

        //                         </Flex>
        //                     ) : (
        //                         <Flex bg={mainBackgroundColor} insetX={"6"} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
        //                             <DonationPayment data={item} />
        //                         </Flex>
        //                     )}
        //                 </Flex>
        //                 <Flex w={"full"} h={"200px"} display={["block", "block", "none", "none", "none"]} />
        //             </Flex>
        //         )}
        //     </LoadingAnimation>
        //     <Fundpaystack id={item?.id} config={configPaystack} setConfig={setPaystackConfig} donation={donation} />
        // </Flex>

        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} flexDir={"column"} pos={"relative"} gap={"3"} overflowY={"auto"} h={"full"} px={["4", "4", "6"]} pb={["400px", "400px", "6"]} py={"6"} >

                <Flex gap={"1"} alignItems={"center"} pb={"3"} >
                    <Text role='button' onClick={() => back()} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Home</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >Fundraiser details</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >{item?.name}</Text>
                </Flex>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >

                    {item?.bannerImage?.length > 0 && (
                        <Flex w={"full"} h={["340px", "340px", "620px"]} pos={"relative"} justifyContent={"center"} alignItems={"center"} bgColor={"black"} rounded={"8px"} >
                            <Image src={IMAGE_URL + item?.bannerImage} alt='logo' height={"full"} objectFit={"cover"} />
                        </Flex>
                    )}
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Text fontWeight={"700"} fontSize={"24px"} >{capitalizeFLetter(item?.name)}</Text>
                        <DescriptionPage limit={100} label='Rental Details' description={item?.description} />
                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                            <Flex gap={"4"} alignItems={"center"} >
                                {/* <Flex w={"48px"} h={"48px"} bgColor={"orange"} /> */}
                                <UserImage data={item?.createdBy} font={"20px"} image={item?.createdBy?.data?.imgMain?.value} size={"48px"} />
                                <Flex flexDir={"column"} >
                                    <Text fontWeight={"600"} >Organizer</Text>
                                    {/* <Text fontWeight={"500"} fontSize={"12px"} >235 followers</Text> */}
                                </Flex>
                            </Flex>
                            <CustomButton text={"Message"} height={"30px"} fontSize={"12px"} width={"100px"} borderRadius={"999px"} />
                        </Flex>
                        <Flex gap={"2"} alignItems={"center"}>
                            <Text fontWeight={"600"} w={"80px"} >EndDate</Text>
                            <CalendarIcon color={primaryColor} />
                            <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(item?.endDate)} {timeFormat(item?.endDate)}</Text>
                        </Flex>
                        <Flex w={"full"} justifyContent={"end"} >
                            <Flex maxW={"600px"} display={["none", "none", "flex"]}  >
                                {((userId === item?.createdBy?.userId) || item?.isCollaborator) ? (
                                    <Flex bg={["transparent", "transparent", mainBackgroundColor, mainBackgroundColor]} insetX={"3"} mt={["0px", "0px", "0px", "0px"]} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                        <Flex bgColor={mainBackgroundColor} w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} h={"90px"} justifyContent={"center"} >

                                            <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
                                                <Flex bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                                                    <DashboardOrganizerIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator || item?.total > 0 || !isDateInPast(item?.endDate)} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} role='button' as={"button"} onClick={() => push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                                                    <DashboardEditIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Edit</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                                                    <WalletIcon color='#5D70F9' />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Cash Out</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                    </Flex>
                                ) : (
                                    <Flex bg={mainBackgroundColor} insetX={"6"} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                        <DonationPayment data={item} />
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                        <Flex w={"full"} h={"200px"} display={["block", "block", "none", "none", "none"]} />
                    </Flex>
                </Flex>
                <Flex display={["flex", "flex", "none"]} position={"fixed"} bottom={"20"} insetX={"0px"} px={"4"} w={"full"} >
                    {((userId === item?.createdBy?.userId) || item?.isCollaborator) ? (
                        <Flex bg={["transparent", "transparent", mainBackgroundColor, mainBackgroundColor]} insetX={"3"} mt={["0px", "0px", "0px", "0px"]} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                            <Flex bgColor={mainBackgroundColor} w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} h={"90px"} justifyContent={"center"} >

                                <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
                                    <Flex bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                                        <DashboardOrganizerIcon />
                                        <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                                    </Flex>
                                    <Flex disabled={item?.isCollaborator || item?.total > 0 || !isDateInPast(item?.endDate)} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} role='button' as={"button"} onClick={() => push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                                        <DashboardEditIcon />
                                        <Text fontSize={"12px"} fontWeight={"500"} >Edit</Text>
                                    </Flex>
                                    <Flex disabled={item?.isCollaborator} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                                        <WalletIcon color='#5D70F9' />
                                        <Text fontSize={"12px"} fontWeight={"500"} >Cash Out</Text>
                                    </Flex>
                                </Flex>
                            </Flex>

                        </Flex>
                    ) : (
                        <Flex bg={mainBackgroundColor} insetX={"6"} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                            <DonationPayment data={item} />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
}
