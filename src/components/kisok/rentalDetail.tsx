"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import CustomButton from '../general/Button'
import { IRental } from '@/models/product'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { IMAGE_URL } from '@/services/urls'
import UserImage from '../sharedComponent/userimage'
import { formatNumber } from '@/utils/numberFormat'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoStar } from 'react-icons/io5'
import { FaStar } from 'react-icons/fa'
import RentalCheckout from './rentalCheckout'

export default function RentalDetail({ id }: { id: string }) {

    const { primaryColor, borderColor, headerTextColor, secondaryBackgroundColor } = useCustomTheme()
    const [qty, setQty] = useState(1)
    const [item, setItem] = useState({} as IRental)



    const { isLoading, isRefetching, refetch, data } = useQuery(
        ["rental", id],
        () => httpService.get(`/rental/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            setItem(data?.data?.content[0])
        }
    }
    );

    const [startDate, setStartDate]: any = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        // Limit the range to 5 days
        if (start && end) {
            const diffInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
            console.log(diffInDays);
            setQty(diffInDays)

            if (diffInDays > item?.maximiumNumberOfDays) {

                const newEndDate: any = new Date(start);
                newEndDate.setDate(start.getDate() + (item?.maximiumNumberOfDays));
                setEndDate(newEndDate);
            }
        }
    };

    const clickHandler = () => {
        setStartDate(null)
        setEndDate(null)
    }

    console.log(item?.maximiumNumberOfDays);



    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} px={"6"} pos={"relative"} h={"full"} pt={["6", "6", "6", "6"]} gap={"4"} pb={"12"} flexDir={"column"} overflowY={"auto"} >
                <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                    <Text fontSize={"24px"} fontWeight={"700"} >{capitalizeFLetter(item?.name)}</Text>
                    <Flex gap={"3"} >
                        <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                        <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                    </Flex>
                </Flex>
                {item?.images?.length > 0 && (
                    <Flex w={"full"} h={"fit-content"} >
                        <Flex w={"full"} height={["228px", "228px", "344px"]} gap={"3"} >
                            <Flex w={"full"} rounded={"xl"} bgColor={"blue"} h={"full"} >
                                <Image src={IMAGE_URL + item?.images[0]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                            </Flex>
                            {item?.images?.length > 1 && (
                                <Flex display={["none", "none", "flex"]} w={"full"} h={"full"} gap={"3"} >
                                    <Flex w={"full"} h={"full"} rounded={"xl"} bgColor={"green"} >
                                        <Image src={IMAGE_URL + item?.images[1]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                    </Flex>
                                    {item?.images?.length > 2 && (
                                        <Flex w={"full"} h={"full"} flexDir={"column"} gap={"3"}  >
                                            <Flex w={"full"} h={"48.1%"} rounded={"xl"} >
                                                <Image src={IMAGE_URL + item?.images[2]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                            </Flex>
                                            {item?.images?.length > 3 &&
                                                <Flex w={"full"} h={"48.1%"} rounded={"xl"} >
                                                    <Image src={IMAGE_URL + item?.images[3]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                                </Flex>
                                            }
                                        </Flex>
                                    )}
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                )}
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} gap={"4"} flexDir={"column"} >
                        <Text fontSize={"20px"} fontWeight={"700"} >Details</Text>
                        <Text>{item?.description}</Text>
                        {/* <Text fontWeight={"700"} mt={"4"} >Show more</Text> */}
                        <Flex w={"full"} alignItems={"center"} gap={"3"} >
                            <UserImage size={"48px"} image={item?.creator?.data?.imgMain?.value} data={item?.creator} />
                            <Flex flexDirection={"column"} >
                                <Text fontSize={"18px"} fontWeight={"600"} >{capitalizeFLetter(item?.creator?.firstName) + " " + capitalizeFLetter(item?.creator?.lastName)}</Text>
                                <Text fontSize={"13px"} >Joined Nov 2017 <span style={{ fontSize: "12px" }} >( 23+ Clients Served )</span></Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex w={"fit-content"} >
                        <Flex maxW={"413px"} w={"full"} flexDirection={"column"} >
                            <Flex display={["none", "none", "flex"]} >
                                <RentalCheckout setQty={setQty} item={item} qty={qty} />
                            </Flex>
                            <Flex flexDir={"column"} pt={"4"} >
                                <Text fontWeight={"600"} >Service Menu List </Text>
                                <Flex gap={"1"} >
                                    <Text>{item?.category}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={"6"} pt={"8"} flexDir={["column", "column", "row"]}  >
                    <Flex w={"fit-content"} gap={"2"} display={["none", "none", "flex"]} flexDir={"column"} >
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            monthsShown={2} // Show two months
                            inline // Display the calendar inline
                            minDate={new Date()}
                            maxDate={startDate ? new Date(startDate.getTime() + item?.maximiumNumberOfDays * 24 * 60 * 60 * 1000) : new Date(Date.now() + 100000 * 24 * 60 * 60 * 1000)}
                        />
                        <Text fontWeight={"700"} color={"red"} fontSize={"xs"} as={"button"} onClick={clickHandler} >clear date</Text>
                    </Flex>
                    <Flex flex={"1"} flexDir={"column"} gap={"3"} flexDirection={"column"} >
                        <Flex maxW={"full"} overflowX={"auto"} >
                            <Flex alignItems={"center"} gap={"2"} >
                                <FaStar size={"40px"} color='#EFD414' />
                                <Text fontWeight={"700"} >4.0</Text>
                                <Flex w={"fit-content"} >
                                    <Flex w={"8px"} h={"8px"} rounded={"full"} bgColor={borderColor} />
                                </Flex>
                                <Text fontWeight={"700"}>234 Recommendations</Text>
                                <Text fontSize={"14px"} w={"120px"} fontWeight={"500"} ml={"9"} >See Review</Text>
                                <Text textDecor={"underline"} color={primaryColor} w={"120px"} ml={"9"} fontWeight={"500"} >Leave a review</Text>
                            </Flex>
                        </Flex>
                        <Flex flexDirection={"column"} pt={"6"} gap={"3"} >
                            <Flex flexDir={"column"} gap={"2"} >
                                <Flex alignItems={"center"} gap={"2"} >
                                    <Flex rounded={"30px"} roundedTopRight={"0px"} h={"41px"} w={"41px"} bgColor={"blue"} />
                                    <Flex flexDir={"column"} >
                                        <Text fontWeight={"600"} fontSize={"14px"} >Lena Kyles</Text>
                                        <Flex gap={"1"} >
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={secondaryBackgroundColor} />
                                        </Flex>
                                        <Text fontSize={"12px"} >May 03, 2023, 12:56</Text>
                                    </Flex>
                                </Flex>
                                <Text fontSize={"14px"} >Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con</Text>
                            </Flex>
                            <Flex flexDir={"column"} gap={"2"} >
                                <Flex alignItems={"center"} gap={"2"} >
                                    <Flex rounded={"30px"} roundedTopRight={"0px"} h={"41px"} w={"41px"} bgColor={"blue"} />
                                    <Flex flexDir={"column"} >
                                        <Text fontWeight={"600"} fontSize={"14px"} >Lena Kyles</Text>
                                        <Flex gap={"1"} >
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={borderColor} />
                                            <FaStar size={"12px"} color={secondaryBackgroundColor} />
                                        </Flex>
                                        <Text fontSize={"12px"} >May 03, 2023, 12:56</Text>
                                    </Flex>
                                </Flex>
                                <Text fontSize={"14px"} >Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} mt={"56"} display={["flex", "flex", "none"]} />
                <Flex display={["flex", "flex", "none"]} position={"fixed"} bottom={"20"} insetX={"0px"} px={"4"} w={"full"} >
                    <RentalCheckout setQty={setQty} item={item} qty={qty} />
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
}
