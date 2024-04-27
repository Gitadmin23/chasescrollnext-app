import CustomButton from '@/components/general/Button'
import CopyRightText from '@/components/sharedComponent/CopyRightText'
import CopyButtton from '@/components/sharedComponent/copy_btn'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventPrice from '@/components/sharedComponent/event_price'
import EventImage from '@/components/sharedComponent/eventimage'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import UserImage from '@/components/sharedComponent/userimage'
import { CaretLeftIcon, DownloadIcon, DownloadTwoIcon } from '@/components/svg'
import { URLS } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat'
import { textLimit } from '@/utils/textlimit'
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import Barcode from "react-barcode"
import { BsChevronLeft } from 'react-icons/bs'
import QRCode from 'react-qr-code'
import { useQuery } from 'react-query'
import { useReactToPrint } from "react-to-print";

interface Props {
    click: any,
    data: any,
    user_index?: any
}

function ViewTicket(props: Props) {
    const {
        click,
        // datainfo,
        data,
        user_index
    } = props

    const toast = useToast()

    const componentRef: any = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });


    // userName={ticketDetails?.createdBy?.firstName + " " + ticketDetails?.createdBy?.lastName}
    // date={ticketDetails?.event?.startDate}
    // time={ticketDetails?.event?.startDate}
    // ticketFee={ticketDetails?.ticketType === "Free"
    //     ? "Free"
    //     : ticketDetails?.boughtPrice
    // }
    // orderId={ticketDetails?.id}
    // length={ticketLenght}
    // currency={ticketDetails?.event?.currency}
    // location={ticketDetails?.event?.locationDetails} 

    const [datainfo, setTicketDetails] = useState({} as any)
    const [dataMultiple, setDataMultiple] = useState([] as any)
    const [length, setTicketLenght] = useState("" as any)

    let userId = sessionStorage?.getItem("user_id") + ""

    console.log(userId);



    const { isLoading } = useQuery(['event_ticket', data?.id, userId], () => httpService.get(`/events/get-users-tickets?userID=${user_index ? user_index : userId}&eventID=${data?.id}`), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
                position: 'top-right',
            });
        },
        onSuccess: (data) => {
            setTicketLenght(data?.data?.content?.length)
            setTicketDetails(data?.data?.content[0]);
            setDataMultiple(data?.data?.content)
        }
    })

    return (
        <LoadingAnimation loading={isLoading} > 
            <Flex p={"6"} shadow={"lg"} flexDirection={"column"} bg={"#eee"} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} px={"2"} gap={"2"} >
                <Flex position={"relative"} gap={"4"} mb={"4"} width={"full"} justifyContent={"space-between"} alignItems={"start"} >
                    <Box onClick={() => click(false)} as='button' >
                        <BsChevronLeft color={"black"} size={"25px"} />
                    </Box>
                    <Flex pos={"absolute"} w={"full"} justifyContent={"center"} >
                        <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                    </Flex>
                    <Box as='button' pos={"relative"} zIndex={"10"} onClick={handlePrint} display={["block", "block", "none"]}>
                        <DownloadTwoIcon />
                    </Box>
                    <Box display={["none", "none", "block"]} >
                        <CustomButton width={"fit-content"} borderRadius={"full"} onClick={handlePrint} text='Download Ticket' />
                    </Box>
                </Flex>
                <Box display={["none", "none", "block"]} >
                    <Flex ref={componentRef} width={"full"} flexDirection={"column"} alignItems={"center"} gap={"4"} px={["4", "4", "0px"]} >

                        {dataMultiple?.map((item: { id: string }, index: number) => {
                            return (
                                <Flex key={index} maxW={["750px"]} w={["fit-content"]} flexDir={["row"]} rounded={"16px"} pb={"4"} p={["4"]} bg={index === 0 ? "white" : "#CDD3FD"} alignItems={["center"]} justifyContent={"center"} gap={"4"} >
                                    <Flex w={["fit-content"]} gap={"4"} >
                                        <EventImage width={["201px"]} height={["201px"]} data={datainfo?.event} />
                                    </Flex>
                                    <Flex flexDir={"column"} gap={"4"} px={["4", "4", "0px"]} >
                                        <Text fontSize={"24px"} lineHeight={"18px"} fontWeight={"bold"} >{capitalizeFLetter(textLimit(datainfo?.event?.eventName, 20))}</Text>


                                        {/* <Flex gap={"4"} display={["flex", "flex", "none"]} fontSize={"xs"} >

                                        <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                        <Flex flexDirection={"column"} gap={"2"} >
                                            <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                            <Text color={"brand.chasescrollTextGrey"} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                        </Flex>
                                    </Flex> */}
                                        <Flex gap={"4"} alignItems={"center"} >
                                            <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={"#5B5858"} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                {dateFormat(datainfo?.event?.startDate)}
                                            </Flex>
                                            <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={"#5B5858"} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                {timeFormat(datainfo?.event?.startDate)}
                                            </Flex>
                                        </Flex>
                                        <Flex gap={"4"} >

                                            <Flex flexDirection={"column"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                                <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >{textLimit(item?.id, 7)}</Text>
                                            </Flex>
                                            <Flex flexDirection={"column"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                                <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                    <EventPrice minPrice={datainfo?.boughtPrice} maxPrice={datainfo?.boughtPrice} currency={datainfo?.event?.currency} />
                                                </Text>
                                            </Flex>
                                            <Flex flexDirection={"column"} alignItems={"center"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Quantity</Text>
                                                <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{dataMultiple?.length}</Text>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={"4"} fontSize={"xs"} >

                                            <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                            <Flex flexDirection={"column"} gap={"2"} >
                                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                                <Text color={"brand.chasescrollTextGrey"} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex borderLeft={["1px dashed black"]} w={["fit-content"]} alignItems={"center"} border={""} pl={["4"]} flexDir={"column"} >
                                        <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                            <QRCode
                                                style={{ height: "200px", width: "200px", zIndex: 20 }}
                                                value={item?.id}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </Box>
                                    </Flex>
                                </Flex>
                            )
                        }
                        )}
                    </Flex>
                </Box>

                <Flex width={"full"} display={["flex", "flex", "none"]} flexDirection={"column"} alignItems={"center"} gap={"4"} px={["4", "4", "0px"]} >

                    {dataMultiple?.map((item: { id: string }, index: number) => {
                        return (
                            <Flex key={index} maxW={["400px", "400px", "750px"]} w={["full", "full", "fit-content"]} flexDir={["column", "column", "row"]} rounded={"16px"} pb={"4"} p={["0px", "", "4"]} bg={index === 0 ? "white" : "#CDD3FD"} alignItems={["start", "start", "center"]} justifyContent={"center"} gap={"4"} >
                                <Flex w={["full", "full", "fit-content"]} gap={"4"} mx={["auto", "auto", ""]} >
                                    <EventImage width={["full", "full", "201px"]} height={["201px", "201px", "201px"]} data={datainfo?.event} />
                                </Flex>
                                <Flex flexDir={"column"} gap={"4"} px={["4", "4", "0px"]} >
                                    <Text fontSize={"24px"} lineHeight={"18px"} fontWeight={"bold"} >{capitalizeFLetter(datainfo?.event?.eventName)}</Text>


                                    <Flex gap={"4"} display={["flex", "flex", "none"]} fontSize={"xs"} >

                                        <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                        <Flex flexDirection={"column"} gap={"2"} >
                                            <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                            <Text color={"brand.chasescrollTextGrey"} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                        </Flex>
                                    </Flex>
                                    <Flex gap={"4"} alignItems={"center"} >
                                        <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={"#5B5858"} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                            {dateFormat(datainfo?.event?.startDate)}
                                        </Flex>
                                        <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={"#5B5858"} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                            {timeFormat(datainfo?.event?.startDate)}
                                        </Flex>
                                    </Flex>
                                    <Flex gap={"4"} >

                                        <Flex flexDirection={"column"} >
                                            <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                            <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >{textLimit(item?.id, 7)}</Text>
                                        </Flex>
                                        <Flex flexDirection={"column"} >
                                            <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                            <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                <EventPrice minPrice={datainfo?.boughtPrice} maxPrice={datainfo?.boughtPrice} currency={datainfo?.event?.currency} />
                                            </Text>
                                        </Flex>
                                        <Flex flexDirection={"column"} >
                                            <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Number</Text>
                                            <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{dataMultiple?.length}</Text>
                                        </Flex>
                                    </Flex>
                                    <Flex gap={"4"} display={["none", "none", "flex"]} fontSize={"xs"} >

                                        <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                        <Flex flexDirection={"column"} gap={"2"} >
                                            <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                            <Text color={"brand.chasescrollTextGrey"} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                <Flex borderLeft={["", "", "1px dashed black"]} borderTop={["1px dashed black", "1px dashed black", "0px"]} w={["full", "full", "fit-content"]} alignItems={"center"} border={""} py={["4", "4", "0px"]} pl={["0px", "0px", "4"]} flexDir={"column"} >
                                    <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                        <QRCode
                                            style={{ height: "200px", width: "200px", zIndex: 20 }}
                                            value={dataMultiple[0]?.id}
                                            viewBox={`0 0 256 256`}
                                        />
                                    </Box>
                                </Flex>
                            </Flex>
                        )
                    }
                    )}
                </Flex>

                {/* <CustomButton onClick={handlePrint} text='Download Ticket' /> */}

            </Flex>
        </LoadingAnimation>
    )
}

export default ViewTicket