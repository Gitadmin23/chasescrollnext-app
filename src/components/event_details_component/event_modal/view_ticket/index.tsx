import CustomButton from '@/components/general/Button'
import CopyRightText from '@/components/sharedComponent/CopyRightText'
import CopyButtton from '@/components/sharedComponent/copy_btn'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventPrice from '@/components/sharedComponent/event_price'
import EventImage from '@/components/sharedComponent/eventimage'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import UserImage from '@/components/sharedComponent/userimage'
import { CaretLeftIcon } from '@/components/svg'
import { URLS } from '@/services/urls'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import Barcode from "react-barcode"
import { BsChevronLeft } from 'react-icons/bs'
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

    let userId = sessionStorage?.getItem("user_id")+""

    console.log(userId);
    


    const { isLoading } = useQuery(['event_ticket', data?.id, userId], () => httpService.get(`/events/get-users-tickets?userID=${user_index ? user_index : userId }&eventID=${data?.id}`), {
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

            <Flex p={"6"} shadow={"lg"} flexDirection={"column"} bg={"white"} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} gap={"2"} >
                <Flex gap={"4"} width={"full"} alignItems={"start"} >
                    <Box onClick={() => click(false)} as='button' >
                        <BsChevronLeft color={"black"} size={"25px"} />
                    </Box>
                    <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                </Flex>
                <Flex ref={componentRef} width={"full"} flexDirection={"column"} alignItems={"center"} >
                    <Flex width={"fit-content"} flexDirection={"column"} bg={"white"} alignItems={"center"} justifyContent={"center"} gap={"2"} >

                        <Flex alignItems={"center"} gap={"4"} py={"2"} borderBottom={"1px solid #E2E8F0"}  >
                            <EventImage width={"150px"} height={"110px"} data={datainfo?.event} />
                            <Box>
                                <Text fontSize={"17px"} fontWeight={"bold"} >{datainfo?.event?.eventName}</Text>
                                <EventLocationDetail location={datainfo?.event?.location} fontWeight={"medium"} color={"brand.chasescrollBlue"} fontsize='sm' noicon={true} locationType={datainfo?.locationType} />
                            </Box>
                        </Flex>
                        <Flex width={"full"} pb={"2"} justifyContent={"center"} borderBottom={"1px solid #E2E8F0"}  >
                            <Flex p={"4"} flexBasis={"50%"} width={"full"} flexDirection={"column"} gap={"4"} fontSize={"xs"} >
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Place</Text>
                                    <EventLocationDetail color={"brand.chasescrollTextGrey"} fontsize={"xs"} location={datainfo?.event?.location} fontWeight={"medium"} noicon={true} locationType={datainfo?.locationType} />
                                </Flex>
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                    {dataMultiple?.map((item: {id: string}, index: number) => {
                                        return(
                                            <Text key={index} color={"brand.chasescrollTextGrey"} >{item?.id}</Text>
                                        )  
                                    })}
                                </Flex>
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Date</Text>
                                    <Text color={"brand.chasescrollTextGrey"} >{dateFormat(datainfo?.event?.startDate)}</Text>
                                </Flex>
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Ticket Fee</Text>
                                    <Text color={"brand.chasescrollTextGrey"} >
                                        <EventPrice minPrice={datainfo?.boughtPrice} maxPrice={datainfo?.boughtPrice} currency={datainfo?.event?.currency} />
                                    </Text>
                                </Flex>
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Ticket Type</Text>
                                    <Text color={"brand.chasescrollTextGrey"} >
                                        {datainfo?.ticketType}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex p={"4"} flexBasis={"50%"} width={"full"} flexDirection={"column"} gap={"4"} fontSize={"xs"} >

                                <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                    <Text color={"brand.chasescrollTextGrey"} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                </Flex>
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Time</Text>
                                    <Text color={"brand.chasescrollTextGrey"} >{timeFormat(datainfo?.event?.startDate)}</Text>
                                </Flex>
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Ticket Number</Text>
                                    <Text color={"brand.chasescrollTextGrey"} >{length}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex width={"full"} flexDirection={"column"} mb={"3"} alignItems={"center"} >
                            <Barcode
                                value={`Powered by Chasescroll`}
                                width={1}
                                height={80}
                                fontSize={12}
                            />

                            <Text alignItems={"center"} fontSize={"xs"} >
                                <CopyRightText />
                            </Text>
                            <Text alignItems={"center"} fontSize={"xs"} >creating unforgettable memories…</Text>
                        </Flex>

                    </Flex>
                </Flex>

                <CustomButton onClick={handlePrint} text='Download Ticket' />

            </Flex>
        </LoadingAnimation>
    )
}

export default ViewTicket