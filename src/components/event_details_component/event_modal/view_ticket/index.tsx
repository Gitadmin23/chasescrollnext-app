import CustomButton from '@/components/general/Button'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventPrice from '@/components/sharedComponent/event_price'
import EventImage from '@/components/sharedComponent/eventimage'
import UserImage from '@/components/sharedComponent/userimage'
import { CaretLeftIcon } from '@/components/svg'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Barcode from "react-barcode"
import { BsChevronLeft } from 'react-icons/bs'
import { useReactToPrint } from "react-to-print";

interface Props {
    userName: any, 
    location: any,
    orderId: any,
    date: any,
    time: any,
    ticketFee: any, 
    click: any,  
    length: any,
    currency: any,
    datainfo: any, 
}

function ViewTicket(props: Props) {
    const {
        userName, 
        location,
        orderId,
        date,
        time,
        ticketFee, 
        click, 
        length,
        currency,
        datainfo, 
    } = props 

    const componentRef: any = React.useRef();  
    const handlePrint = useReactToPrint({ 
      content: () => componentRef.current
    }); 

    return (
        <Flex p={"6"} shadow={"lg"} flexDirection={"column"} bg={"white"} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} gap={"2"} >

            <Flex gap={"4"} width={"full"} alignItems={"start"} >
                <Box onClick={() => click(false)} as='button' >
                    <BsChevronLeft color={"black"} size={"25px"} />
                </Box>
                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
            </Flex>
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
                        <Text color={"brand.chasescrollTextGrey"} >{orderId}</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"2"} >
                        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Date</Text>
                        <Text color={"brand.chasescrollTextGrey"} >{dateFormat(date)}</Text>
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
                            {ticketFee === "Free"
                                ? "Free"
                                : formatNumber(ticketFee, currency === "USD" ? "$" : "₦")
                            }
                        </Text>
                    </Flex>
                </Flex>
                <Flex p={"4"} flexBasis={"50%"} width={"full"} flexDirection={"column"} gap={"4"} fontSize={"xs"} >

                    <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                    <Flex flexDirection={"column"} gap={"2"} >
                        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                        <Text color={"brand.chasescrollTextGrey"} >{userName}</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"2"} >
                        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Time</Text>
                        <Text color={"brand.chasescrollTextGrey"} >{timeFormat(time)}</Text>
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

                <Text alignItems={"center"} fontSize={"sm"} >© Chasescroll Llc</Text>
                <Text alignItems={"center"} fontSize={"xs"} >creating unforgettable memories…</Text>
            </Flex> 

            <CustomButton onClick={handlePrint}  text='Download Ticket' />
            
        </Flex>
    )
}  

export default ViewTicket