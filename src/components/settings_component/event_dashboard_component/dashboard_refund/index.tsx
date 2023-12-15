import CustomButton from '@/components/general/Button'
import PeopleCard from '@/components/search_component/other_components/people_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import UserImage from '@/components/sharedComponent/userimage'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import httpService from '@/utils/httpService'
import { Box, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { useReactToPrint } from 'react-to-print'

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

            // setData(data.data.content);
        }
    })


    const componentRef: any = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <Flex width={"full"} flexDirection={"column"} >

            <Flex py={"6"} gap={"4"} alignItems={"center"} >
                <Select onChange={(e) => setSize(Number(e.target.value))} width={"100px"} height={'45px'} >
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
                {/* <Flex onClick={() => setShowBtn((prev) => !prev)} as={"button"} height={"45px"} _focus={{ borderWidth: "white" }} alignItems={"center"} fontWeight={"semibold"} rounded={"lg"} px={"4"} borderColor={showBtn ? "" : "brand.chasescrollBlue"} borderWidth={"1px"} bgColor={showBtn ? "brand.chasescrollBlue" : "white"} color={showBtn ? "white" : "brand.chasescrollBlue"} >
                    {showBtn ? "Hide" : "Show"} Refund Button
                </Flex>
                <Flex>
                    Total: {data?.data?.totalElements}
                </Flex> */}
            </Flex>
            <Flex py={"6"} gap={"4"} alignItems={"center"} >
                <CustomButton onClick={handlePrint} text='Download Ticket' />
            </Flex> 
            <Flex ref={componentRef} width={"full"} flexDir={"column"} >
                <Flex width={"full"} py={"6"} justifyContent={"center"} >
                    <Text fontSize={"lg"} fontWeight={"semibold"} >{data?.data?.content[0]?.event?.eventName}</Text>
                </Flex>
                <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.data?.content?.length} > 
                    <TableContainer>
                        <Table variant='simple' colorScheme="gray">
                            <TableCaption>Powered By Chasescroll</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Fullname</Th>
                                    <Th>Email</Th>
                                    {showBtn && (
                                        <Th>Action</Th>
                                    )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.data?.content?.map((person: any, index: number) => {
                                    return (
                                        <Tr key={index} >
                                            <Td >
                                                <Flex gap={"3"}>
                                                    <Box>
                                                        <UserImage fontWeight={"semibold"} border={"2px"} data={person?.user} image={person?.user?.data?.imgMain?.value} size={"32px"} font={"[16px]"} />
                                                    </Box>
                                                    <Box>
                                                        <Text fontSize={"16px"} fontWeight={"semibold"} >{(person?.user?.firstName + " " + person?.user?.lastName)?.length > 15 ? (person?.user?.firstName + " " + person?.user?.lastName)?.slice(0, 15) + "..." : (person?.user?.firstName + " " + person?.user?.lastName)}</Text>
                                                        <Text textAlign={"start"} fontSize={"12px"} fontWeight={"medium"} color={"brand.chasescrollTextGrey2"} >@{person?.user?.username?.length > 15 ? person?.user?.username?.slice(0, 15) + "..." : person?.user?.username}</Text>
                                                    </Box>
                                                </Flex>
                                            </Td>
                                            <Td>{person?.user?.email}</Td>

                                            {showBtn && (
                                                <Td >
                                                    <CustomButton borderRadius={"md"} text='refund' color={"white"} backgroundColor={"rgb(220 38 38)"} height={"43px"} px={"4"} width={"fit-content"} />
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
                    <CustomButton onClick={() => setPage((prev) => prev - 1)} disable={data?.data?.first ? true : false} text='Prev' />
                    <CustomButton onClick={() => setPage((prev) => prev + 1)} disable={data?.data?.last ? true : false} text='Next' />
                </Flex>
            </Flex> 
        </Flex>
    )
}

export default DashboardRefund
