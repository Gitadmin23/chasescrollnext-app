import CustomButton from '@/components/general/Button'
// import PeopleCard from '@/components/search_component/other_components/people_card'
import CopyRightText from '@/components/sharedComponent/CopyRightText'
import EventImage from '@/components/sharedComponent/eventimage'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import RefundBtn from '@/components/sharedComponent/refundbtn'
// import UserImage from '@/components/sharedComponent/userimage'
// import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import httpService from '@/utils/httpService'
import {
    Box,
    Flex,
    Select,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useColorMode,
    useToast
} from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { FcApproval } from "react-icons/fc";
import { useReactToPrint } from 'react-to-print'


// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { CSVLink } from 'react-csv'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat, dateFormatDashboad, timeFormat } from '@/utils/dateFormat'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventDate from '@/components/event_details_component/event_date'
import { IoMdCloseCircle } from 'react-icons/io'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    index: any
}

function DashboardRefund(props: Props) {
    const {
        index
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const toast = useToast()
    const [size, setSize] = React.useState(20)
    const [showBtn, setShowBtn] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [newData, setNewData] = React.useState([] as any)

    // react query
    const { isLoading, isRefetching, data } = useQuery(['get-event-members' + size + page, index], () => httpService.get('/events/get-event-members/' + index, {
        params: {
            size: size,
            page: page
        }
    }), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            console.log(data.data.content);
            const codes = Object.entries(data.data.content)
                .map(([key, value]: any) => {
                    return { "Full Name": capitalizeFLetter(value?.user?.firstName) + " " + capitalizeFLetter(value?.user?.lastName), "User Name": value?.user?.username, "Email": value?.user?.email, "Ticket Type": value?.ticketType?.slice(0, 1)?.toUpperCase() + value?.ticketType?.slice(1, value?.ticketType?.length), "Created Date": dateFormat(value?.user?.createdDate) };
                });
            setNewData(codes)

            // setData(data.data.content);
        }
    })


    const componentRef: any = React.useRef();

    const tableRef: any = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <Flex width={"full"} flexDirection={"column"} >

            {/* <Flex py={"6"} gap={"4"} alignItems={"center"} >
                <Flex onClick={() => setShowBtn((prev) => !prev)} as={"button"} height={"45px"} _focus={{ borderWidth: "white" }} alignItems={"center"} fontWeight={"semibold"} rounded={"lg"} px={"4"} borderColor={showBtn ? "" : "brand.chasescrollBlue"} borderWidth={"1px"} bgColor={showBtn ? "brand.chasescrollBlue" : "white"} color={showBtn ? "white" : "brand.chasescrollBlue"} >
                    {showBtn ? "Hide" : "Show"} Refund Button
                </Flex>
            </Flex> */}
            <Flex ref={componentRef} width={"full"} flexDir={"column"} p={"6"} >
                <Flex width={"full"} pb={"6"} justifyContent={"center"} alignItems={"center"} gap={"5"} >
                    {/* <EventImage /> */}

                    <EventImage data={data?.data?.content[0]?.event} width={"90px"} height={"80px"} />
                    <Flex flexDir={"column"} >
                        <Text fontSize={"lg"} fontWeight={"semibold"} >{data?.data?.content[0]?.event?.eventName?.slice(0, 1)?.toUpperCase() + data?.data?.content[0]?.event?.eventName?.slice(1, data?.data?.content[0]?.event?.eventName?.length)}</Text>
                        <EventDate name='Start Date:' dashboard={true} date={data?.data?.content[0]?.event?.startDate} />
                        <EventDate name='End Date:' dashboard={true} date={data?.data?.content[0]?.event?.endDate} />
                    </Flex>
                </Flex>
                {/* <Loca/ */}
                <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.data?.content?.length} >

                    <TableContainer ref={tableRef} >
                        <Table variant='simple' colorScheme="gray">
                            <TableCaption>
                                <Box>
                                    Powered By Chasescroll
                                    <Text fontSize={"sm"} >
                                        <CopyRightText />
                                    </Text>
                                </Box>
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Full Name</Th>
                                    <Th>User Name</Th>
                                    <Th>Email</Th>
                                    <Th>Ticket Type</Th>
                                    <Th>Number Of Ticket</Th>
                                    <Th>Ticket Scanned Date | Status</Th>
                                    {showBtn && (
                                        <Th>Action</Th>
                                    )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.data?.content?.sort((a: any, b: any) => {
                                    if (a?.user?.firstName > b?.user?.firstName) {
                                        return 1
                                    } else {
                                        return -1;
                                    }
                                    return 0;
                                })?.map((person: any, i: number) => {
                                    return (
                                        <Tr key={i} >
                                            <Td >
                                                <Flex gap={"3"}>
                                                    {/* <Box>
                                                        <UserImage fontWeight={"semibold"} border={"2px"} data={person?.user} image={person?.user?.data?.imgMain?.value} size={"32px"} font={"[16px]"} />
                                                    </Box>
                                                    <Box> */}
                                                    <Text fontSize={"14px"} mt={"4px"} fontWeight={"semibold"} >{(person?.user?.firstName + " " + person?.user?.lastName)?.length > 15 ? (person?.user?.firstName + " " + person?.user?.lastName)?.slice(0, 15) + "..." : (person?.user?.firstName + " " + person?.user?.lastName)}</Text>
                                                    {/* <Text textAlign={"start"} fontSize={"12px"} fontWeight={"medium"} color={"brand.chasescrollTextGrey2"} >@{person?.user?.username?.length > 15 ? person?.user?.username?.slice(0, 15) + "..." : person?.user?.username}</Text> */}
                                                    {/* </Box> */}
                                                </Flex>
                                            </Td>
                                            <Td>{person?.user?.username}</Td>
                                            <Td fontSize={"14px"}>{person?.user?.email}</Td>
                                            {person?.ticketType && (
                                                <Td fontSize={"14px"}>
                                                    <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} >
                                                        {person?.ticketType?.slice(0, 1)?.toUpperCase() + person?.ticketType?.slice(1, person?.ticketType?.length)}
                                                    </Flex>
                                                </Td>
                                            )}
                                            {!person?.ticketType && (
                                                <Td>
                                                    {(person?.role === "ADMIN" && person?.createdBy?.email === person?.user?.email) && (
                                                        <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"brand.chasescrollBlue"} >
                                                            Organizer
                                                        </Flex>
                                                    )}
                                                    {(person?.role === "ADMIN" && person?.createdBy?.email !== person?.user?.email) && (
                                                        <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                                            Admin
                                                        </Flex>
                                                    )}
                                                    {person?.role === "COLLABORATOR" && (
                                                        <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#FDF3CF6B"} color={"#FDB806"} >
                                                            Volunteer
                                                        </Flex>
                                                    )}

                                                </Td>
                                                // <Td fontSize={"14px"}>{person?.ticketType?.slice(0, 1)?.toUpperCase() + person?.ticketType?.slice(1, person?.ticketType?.length)}</Td>
                                            )}
                                            <Td textAlign={"center"} fontSize={"xs"} >
                                                {person?.ticketNumber !== 0 ? person?.ticketNumber : ""}
                                            </Td>
                                            <Td>
                                                {/* {person?.ticketScanInfoList[0]?.scanTime?.length > 0 && ( */}
                                                <>
                                                    {person?.ticketScanInfoList?.map((item: {
                                                        scanTime: Array<any>,
                                                        scanned: boolean
                                                    }, index: number) => {
                                                        return (
                                                            <>
                                                                {item?.scanTime?.length > 0 &&
                                                                    <Flex key={index} fontSize={"xs"} mt={index === 0 ? "0px" : "4"} flexDir={"column"} gap={"2"} >
                                                                        <Text fontWeight={"bold"} >Ticket {index + 1} (MM-DD-YY)</Text>
                                                                        <Flex flexDir={"column"} gap={"1"} >
                                                                            {item?.scanTime?.map((time: number, indexkey: number) => {
                                                                                
                                                                                return (
                                                                                    <Flex key={indexkey} gap={"1"} w={"200px"} justifyContent={"space-between"} alignItems={"center"}>

                                                                                        <Text >{time ? dateFormatDashboad(time) : ""} {time ? timeFormat(time) : ""} </Text>
                                                                                        {((new Date(item?.scanTime[indexkey])?.getDate() >= new Date(data?.data?.content[0]?.event?.startDate)?.getDate()) && ((new Date(item?.scanTime[indexkey])?.getDate()) <= new Date(data?.data?.content[0]?.event?.endDate)?.getDate())) ? (

                                                                                            <>
                                                                                                {indexkey !== 0 ? (
                                                                                                    <Flex w={"fit-content"} >
                                                                                                        {new Date(item?.scanTime[indexkey])?.getDate() === new Date(item?.scanTime[indexkey - 1])?.getDate() && (
                                                                                                            <IoMdCloseCircle color='FF0000' size={"20px"} />
                                                                                                        )}
                                                                                                        {(new Date(item?.scanTime[indexkey])?.getDate() !== new Date(item?.scanTime[indexkey - 1])?.getDate()) && (
                                                                                                            <FcApproval size={"20px"} />
                                                                                                        )}
                                                                                                    </Flex>
                                                                                                ) :
                                                                                                    <Flex w={"fit-content"} >
                                                                                                        <FcApproval size={"20px"} />
                                                                                                    </Flex>
                                                                                                }
                                                                                            </>
                                                                                        ) :
                                                                                            <Flex w={"fit-content"} >
                                                                                                <IoMdCloseCircle color='FF0000' size={"20px"} />
                                                                                            </Flex>
                                                                                        }

                                                                                    </Flex>
                                                                                )
                                                                            })}
                                                                        </Flex>
                                                                    </Flex>
                                                                }
                                                            </>
                                                        )
                                                    })}
                                                </>
                                                {/* )} */}
                                            </Td>
                                            {showBtn && (
                                                <Td >
                                                    <RefundBtn person={person} index={index} />
                                                </Td>
                                            )}
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </LoadingAnimation>
            </Flex>

            <Flex py={"6"} gap={"4"} alignItems={"center"} >
                <Flex width={"100px"} >
                    Page: {data?.data?.totalPages}
                </Flex>
                <Flex width={"fit-content"} gap={"5"} ml={"auto"} >
                    <CustomButton backgroundColor={mainBackgroundColor} fontWeight={"semibold"} borderWidth={'1px'} borderColor={borderColor} px={"10px"} color={headerTextColor} fontSize={"xs"} height={"35px"} rounded={"42px"} onClick={() => setPage((prev) => prev - 1)} disable={data?.data?.first ? true : false} text='Previous' />
                    <CustomButton backgroundColor={mainBackgroundColor} fontWeight={"semibold"} borderWidth={'1px'} borderColor={borderColor} px={"10px"} color={headerTextColor} fontSize={"xs"} height={"35px"} rounded={"42px"} onClick={() => setPage((prev) => prev + 1)} disable={data?.data?.last ? true : false} text='Next' />
                </Flex>
            </Flex>
            <Flex py={"6"} gap={"4"} width={"full"} justifyContent={"center"} alignItems={"center"} >
                <CustomButton width={"fit-content"} onClick={handlePrint} text='Export PDF' />

                {/* <DownloadTableExcel
                    filename={data?.data?.content[0]?.event?.eventName?.slice(0, 1)?.toUpperCase() + data?.data?.content[0]?.event?.eventName?.slice(1, data?.data?.content[0]?.event?.eventName?.length) + " Attendee Table"}
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                    <CustomButton width={"fit-content"} text='Export XLS' />

                </DownloadTableExcel> */}

                <CSVLink data={newData ? newData : []}
                    filename={data?.data?.content[0]?.event?.eventName?.slice(0, 1)?.toUpperCase() + data?.data?.content[0]?.event?.eventName?.slice(1, data?.data?.content[0]?.event?.eventName?.length) + "m.csv"} >
                    <CustomButton width={"fit-content"} text='Export CSV' />

                </CSVLink>
            </Flex>
        </Flex>
    )
}

export default DashboardRefund
