import CustomButton from '@/components/general/Button'
// import PeopleCard from '@/components/search_component/other_components/people_card'
import CopyRightText from '@/components/sharedComponent/CopyRightText'
import EventImage from '@/components/sharedComponent/eventimage'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import RefundBtn from '@/components/sharedComponent/refundbtn'
// import UserImage from '@/components/sharedComponent/userimage'
// import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import httpService from '@/utils/httpService'
import { Box, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { useReactToPrint } from 'react-to-print'


// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { CSVLink } from 'react-csv'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat } from '@/utils/dateFormat'

interface Props {
    index: any
}

function DashboardRefund(props: Props) {
    const {
        index
    } = props

    const toast = useToast()
    const [size, setSize] = React.useState(100)
    const [showBtn, setShowBtn] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [newData, setNewData] = React.useState([] as any)

    // react query
    const { isLoading, isRefetching, data } = useQuery(['get-event-members' + size + page], () => httpService.get('/events/get-event-members/' + index, {
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
                        return { "Full Name": capitalizeFLetter(value?.user?.firstName)+" "+capitalizeFLetter(value?.user?.lastName), "User Name" : value?.user?.username, "Email": value?.user?.email, "Ticket Type": value?.ticketType?.slice(0, 1)?.toUpperCase() + value?.ticketType?.slice(1, value?.ticketType?.length), "Created Date": dateFormat(value?.user?.createdDate) };
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
                <Flex width={"full"} py={"6"} justifyContent={"center"} alignItems={"center"} gap={"5"} >
                    {/* <EventImage /> */}

                    <EventImage data={data?.data?.content[0]?.event} width={"90px"} height={"80px"} />
                    <Text fontSize={"lg"} fontWeight={"semibold"} >{data?.data?.content[0]?.event?.eventName?.slice(0, 1)?.toUpperCase() + data?.data?.content[0]?.event?.eventName?.slice(1, data?.data?.content[0]?.event?.eventName?.length)}</Text>
                </Flex>
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
                                            <Td fontSize={"14px"}>{person?.ticketType?.slice(0, 1)?.toUpperCase() + person?.ticketType?.slice(1, person?.ticketType?.length)}</Td>

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
                    <CustomButton backgroundColor={"white"} fontWeight={"semibold"} border={"1px solid #3C41F0"} px={"10px"} color={"brand.chasescrollBlue"} fontSize={"xs"} height={"25px"} rounded={"32px"} onClick={() => setPage((prev) => prev - 1)} disable={data?.data?.first ? true : false} text='Previous' />
                    <CustomButton backgroundColor={"white"} fontWeight={"semibold"} border={"1px solid #3C41F0"} px={"10px"} color={"brand.chasescrollBlue"} fontSize={"xs"} height={"25px"} rounded={"32px"} onClick={() => setPage((prev) => prev + 1)} disable={data?.data?.last ? true : false} text='Next' />
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

                <CSVLink data={newData? newData: []} 
                        filename={data?.data?.content[0]?.event?.eventName?.slice(0, 1)?.toUpperCase() + data?.data?.content[0]?.event?.eventName?.slice(1, data?.data?.content[0]?.event?.eventName?.length) +"m.csv"} > 
                    <CustomButton width={"fit-content"} text='Export CSV' />

                </CSVLink>
            </Flex>
        </Flex>
    )
}

export default DashboardRefund
