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
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { FcApproval, FcRight } from "react-icons/fc";
import { useReactToPrint } from 'react-to-print'


// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { CSVLink } from 'react-csv'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat, dateFormatDashboad, timeFormat } from '@/utils/dateFormat'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventDate from '@/components/event_details_component/event_date'
import { IoIosArrowDropright, IoMdArrowDropright, IoMdCloseCircle } from 'react-icons/io'
import useCustomTheme from "@/hooks/useTheme";
import { textLimit } from '@/utils/textlimit'
import InterestedUsers from '@/components/sharedComponent/interested_users'
import { URLS } from '@/services/urls'
import { ArrowRight, BoxArrowIcon, LocationIcon, TicketBtnIcon } from '@/components/svg'
import { eventNames } from 'process'
import { useRouter } from 'next/navigation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import { IEventType } from '@/models/Event'

interface Props {
    index: any
}

function DashboardRefund(props: Props) {
    const {
        index
    } = props

    const {
        bodyTextColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const toast = useToast()
    const [size, setSize] = React.useState(20)
    const [showBtn, setShowBtn] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [newData, setNewData] = React.useState([] as any)
    const [memberRole, setMemberRoles] = React.useState("")

    // react query
    const { isLoading, isRefetching, data } = useQuery(['get-event-members' + size + page, index, memberRole], () => httpService.get('/events/get-event-members/' + index, {
        params: {
            size: size,
            page: page,
            eventMemberRole: memberRole
        }
    }), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        }
    })

    const [open, setOpen] = useState(false)

    const [dataInfo, setData] = useState([] as any)
    const [eventData, setEventData] = useState({} as IEventType)

    const { } = useQuery(['all-events-details' + index], () => httpService.get(URLS.All_EVENT + "?id=" + index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            setData(data?.data?.content[0]);
        }
    })

    const { isLoading: loadingcsv, refetch } = useQuery(['downloadcsv'], () => httpService.get("/events/download-event-members/" + index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => { 

            // Split the CSV string into rows
            const rows = data?.data.trim().split('\n');

            // Extract the header row
            const header = rows.shift().split(',');

            // Function to parse the date fields properly
            const parseDate = (dateString: string) => {
                const dateParts = dateString.split(',');
                const timePart = dateParts.slice(3).join(',');
                const datePart = dateParts.slice(1, 3).join(' ');
                return `${dateParts[0]}, ${datePart}${timePart}`;
            };

            // Convert each row into an object
            const datacsv = rows.map((row: any) => {
                const fields = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map((field: any) => field.replace(/"/g, ''));
                return {
                    name: fields[0],
                    username: fields[1],
                    email: fields[2],
                    tickettype: fields[3] === 'ORGANIZER' || fields[3] === 'VOLUNTEER' || fields[3] === 'ADMIN' ? '' : fields[3],
                    ticketsbought: parseInt(fields[4]),
                    date: parseDate(fields.slice(5).join(','))
                };
            });

            setNewData(datacsv) 
            

        }
    })

    const { isLoading: loadingData, isRefetching: refechingDa } = useQuery(['all-events-details', index], () => httpService.get(URLS.All_EVENT + "?id=" + index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            // const item: PaginatedResponse<IEventType> = data.data;
            setEventData(data?.data?.content[0]);
        }
    })


    const componentRef: any = React.useRef();

    const tableRef: any = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: capitalizeFLetter(eventData?.eventName),
        pageStyle: `
          @page {
            size: Legal landscape
          }   
        `,
    }); 

    const router = useRouter()

    const clickHandler = () => {

        const today = new Date()
        const eventDate = new Date(data?.data?.content[0]?.event?.endDate)

        if (today > eventDate) {
            router?.push(`/dashboard/event/pastdetails/${index}`)
        } else {
            router?.push(`/dashboard/event/details/${index}`)
        }
    }

    const downloadCSV = () => {
        refetch()
    }



    return (
        <Flex ref={componentRef} width={"full"} flexDirection={"column"} >
            <LoadingAnimation loading={loadingData} >
                <Flex pos={"relative"} width={"full"} alignItems={"center"} flexDir={["column", "column", "row"]} gap={"6"} >
                    <Flex width={["auto", "auto", "auto", "auto"]} mr={["auto", "auto", "0px"]} gap={"3"} flexDirection={["row", "row", "row"]} pos={"relative"} borderWidth={"1px"} p={"2"} rounded={"4px"} >
                        <EventImage data={eventData} width={["100px", "125px", "125px"]} height={["80px", "114px", "114px"]} />
                        <Flex flexDir={"column"} >
                            <Text fontSize={"lg"} fontWeight={"semibold"} >{textLimit(capitalizeFLetter(eventData?.eventName), 20)}</Text>
                            <EventDate eventdashboard={true} date={eventData?.startDate} />
                            <EventLocationDetail length={40} fontsize='12px' location={eventData?.location} locationType={eventData?.locationType} indetail={true} eventdashboard={true} />
                            <Box mt={"1"} >
                                <InterestedUsers fontSize={12} event={dataInfo} border={"2px"} size={"24px"} />
                            </Box>
                        </Flex>
                        {/* <CustomButton text={"View Event"} backgroundColor={"#EFF1FE"} color={"#5D70F9"} pos={"absolute"} height={"32px"} fontSize={"xs"} insetX={"auto"} insetY={"auto"} mt={"auto"} right={"0px"} width={"114px"} transform={"rotate(-90deg)"} roundedBottom={"4px"} /> */}
                        <Box as='button' display={["block", "block", "block"]} onClick={() => clickHandler()} ml={"auto"} height={"full"} >
                            <TicketBtnIcon />
                        </Box>

                        {/* <Flex onClick={() => clickHandler()} display={["block", "none", "none"]} as={"button"} w={["full", "full", "152px"]} fontWeight={"medium"} border={"1px solid #3C41F0"} justifyContent={"center"} color={"brand.chasescrollBlue"} fontSize={"14px"} lineHeight={"20px"} height={"44px"} rounded={"8px"} alignItems={"center"} gap={"2"} >
                        View Event
                    </Flex> */}
                    </Flex>
                    <Flex display={["none", "none", "none", "flex"]} flexDir={"column"} gap={"4"} justifyContent={"center"} >
                        <Flex color={"#101828"} alignItems={"center"} gap={"2"} >
                            <Text>Home</Text>
                            <ArrowRight />
                            <Text>Attendees</Text>
                        </Flex>
                        <Flex gap={"2"} alignItems={"center"}  >
                            <Text fontSize={"sm"} >Members Roles</Text>
                            <Select width={"fit-content"} outline={"none"} placeholder='All' value={memberRole} onChange={(e) => setMemberRoles(e.target?.value)} >
                                <option value={"ADMIN"} >Organizer</option>
                                <option value={"USER"} >Attendees</option>
                                <option value={"COLLABORATOR"} >Volunter</option>
                            </Select>
                        </Flex>
                        <Flex gap={"2"} alignItems={"center"}  >
                            <Text fontSize={"sm"} >Display</Text>
                            <Select width={"fit-content"} outline={"none"} value={size} onChange={(e) => setSize(Number(e.target?.value))} >
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>
                                <option>50</option>
                                <option>60</option>
                                <option>70</option>
                                <option>80</option>
                                <option>90</option>
                                <option>100</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex width={["full", "full", "auto", "auto"]} ml={["0px", "0px", "auto"]} justifyContent={["space-between", "space-between", "start"]} alignItems={"center"} gap={"4"} >
                        <Text display={["flex", "flex", "none", "none"]} letterSpacing={"-0.08px"} lineHeight={"18px"} fontWeight={"500"} >Event Attendees</Text>
                        <CustomButton onClick={() => setOpen(true)} text={"Export"} width={"130px"} />
                        {/* <Select width={"120px"} height={"45px"} placeholder='Sort by' >
                            <option>test</option>
                        </Select> */}
                    </Flex>
                </Flex>
            </LoadingAnimation>
            <Flex width={"full"} flexDir={"column"} my={["6", "0px", "0px"]} p={["0px", "6", "6"]} >
                <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.data?.content?.length} >

                    <TableContainer >
                        <Table variant='simple' colorScheme="gray">
                            <TableCaption>
                                <Box>
                                    Powered By Chasescroll
                                    <Text fontSize={"sm"} >
                                        <CopyRightText />
                                    </Text>
                                </Box>
                            </TableCaption>
                            <Thead bgColor={"#FAFAFB"} >
                                <Tr>
                                    <Th>USERNAME</Th>
                                    <Th>EMAIL ADDRESS</Th>
                                    <Th>Date & TIME</Th>
                                    <Th>Ticket type</Th>
                                    <Th>NO. TICKET</Th>
                                    <Th>STATUS</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.data?.content?.map((person: any, i: number) => {
                                    return (
                                        <Tr key={i} >
                                            <Td>{person?.user?.username}</Td>
                                            <Td fontSize={"14px"}>{person?.user?.email}</Td>
                                            <Td fontSize={"14px"}>{dateFormat(person?.createdDate)}</Td>
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
                                            )}
                                            <Td textAlign={"center"} fontSize={"xs"} >
                                                {person?.ticketNumber !== 0 ? person?.ticketNumber : ""}
                                            </Td>
                                            <Td>
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
                    <Flex py={"6"} gap={"8"} flexDir={["column", "column", "row", "row"]} alignItems={"start"} justifyContent={"space-between"} >
                        <Flex fontSize={"12px"} color={bodyTextColor} lineHeight={"23px"} >
                            Showing {(Number(data?.data?.numberOfElements))} items out of {data?.data?.totalElements} results found
                        </Flex>
                        <Flex display={data?.data?.totalPages === 1 ? "none" : "flex"} gap={"5"} ml={"auto"} >
                            <Box onClick={() => setPage((prev) => prev - 1)} as="button" cursor={data?.data?.first && "not-allowed"} transform={"rotate(180deg)"} disabled={data?.data?.first} _disabled={{ opacity: "20%" }} >
                                <BoxArrowIcon />
                            </Box>
                            <Flex width={"26px"} border={(data?.data?.number + 1) === 1 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                1
                            </Flex>
                            {(data?.data?.totalPages >= 2) && (
                                <Flex as={"button"} onClick={() => setPage(1)} width={"26px"} border={(data?.data?.number + 1) === 2 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    2
                                </Flex>
                            )}
                            {(data?.data?.totalPages >= 3) && (
                                <Flex as={"button"} onClick={() => setPage(2)} width={"26px"} border={(data?.data?.number + 1) === 3 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    3
                                </Flex>
                            )}
                            {(data?.data?.totalPages >= 4) && (
                                <Flex as={"button"} onClick={() => setPage(3)} width={"26px"} border={(data?.data?.number + 1) === 4 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    4
                                </Flex>
                            )}
                            {(data?.data?.number + 1) > 4 &&
                                <Flex width={"26px"} border={(data?.data?.number + 1) > 4 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    ...
                                </Flex>
                            }
                            {(data?.data?.number + 1) > 4 &&
                                <Flex width={"26px"} border={"1px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    {data?.data?.number + 1}
                                </Flex>
                            }
                            <Box onClick={() => setPage((prev) => prev + 1)} as="button" cursor={data?.data?.last && "not-allowed"} disabled={data?.data?.last} _disabled={{ opacity: "20%" }} >
                                <BoxArrowIcon />
                            </Box>
                        </Flex>
                    </Flex>
                </LoadingAnimation>
            </Flex>

            <ModalLayout open={open} close={setOpen}>
                <Flex py={"8"} px={"6"} flexDirection={"column"} gap={"4"} width={"full"} justifyContent={"center"} alignItems={"center"} >
                    <CustomButton fontSize={"lg"} width={"full"} backgroundColor={"transparent"} color={"#FF6F61"} onClick={handlePrint} text='PDF' />
                    <Flex width={"full"} height={"1px"} bgColor={"#DDE6EB"} />
                    <CSVLink style={{ width: "100%" }} data={newData ? newData : []}
                        filename={data?.data?.content[0]?.event?.eventName?.slice(0, 1)?.toUpperCase() + data?.data?.content[0]?.event?.eventName?.slice(1, data?.data?.content[0]?.event?.eventName?.length) + ".csv"} >
                        <CustomButton onClick={downloadCSV} fontSize={"lg"} width={"full"} backgroundColor={"transparent"} color={"#5D70F9"} text='CSV' />
                    </CSVLink>


                </Flex>
            </ModalLayout>
        </Flex >
    )
}

export default DashboardRefund
