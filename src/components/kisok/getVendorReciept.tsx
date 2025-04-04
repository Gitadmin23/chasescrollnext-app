import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Grid, HStack, Image, Text } from '@chakra-ui/react';
import { IOrder, IReceipt } from '@/models/product';
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { formatNumber } from '@/utils/numberFormat';
import CustomButton from '../general/Button';
import { IMAGE_URL } from '@/services/urls';
import { dateFormat } from '@/utils/dateFormat';
import ProductImageScroller from '../sharedComponent/productImageScroller';
import useProduct from '@/hooks/useProduct';
import { textLimit } from '@/utils/textlimit';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import Fundpaystack from '../settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import ModalLayout from '../sharedComponent/modal_layout';

interface IAction {
    value: number;
    type: 'ADDITION' | 'SUBSTRACTION',
}

export default function GetVendorReciept() {

    const { primaryColor, borderColor, bodyTextColor, secondaryBackgroundColor, mainBackgroundColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";
    const [textSize, setTextSize] = useState(40)
    const [percentage, setPercentage] = useState(0)
    const [price, setPrice] = useState("")

    const [status, setStatus] = useState("")

    const [detail, setDetails] = useState({} as IReceipt)

    const { updateRecipt: reject, updateRecipt, configPaystack, dataID, message, setPaystackConfig, payForTicket, open, setOpen, updateReciptPrice } = useProduct(null, true)

    const { results, isLoading, ref } = InfiniteScrollerComponent({ url: `/reciept/search?vendorID=${userId}`, limit: 20, filter: "id", name: "getreciept" })

    const clickHander = (item: IReceipt) => {
        setDetails(item)
        setPrice((item?.price / item?.frequency) + "")
        setOpen(true)
    }

    const updateHandler = (item: "PENDING" | "ACCEPTED" | "CANCELLED") => {
        setStatus(item)
        updateRecipt?.mutate({
            payload: {
                status: item
            }, id: detail?.id
        })
    }

    useEffect(() => {
        if (!updateRecipt?.isLoading) {
            setStatus("")
        }
    }, [updateRecipt?.isLoading])


    const handlePriceChange = (itemData: IAction) => {
        if (itemData.type === 'ADDITION') {
            // calculate 5% fo the inital price
            const Percentage = (detail?.price / detail?.frequency) * Number((percentage + 0.05)?.toFixed(2));
            const newPrice = (detail?.price / detail?.frequency) + Percentage;
            setPrice((newPrice).toString());
            setPercentage(Number((percentage + 0.05)?.toFixed(2)))
        } else {
            const Percentage = (detail?.price / detail?.frequency) * Number((percentage - 0.05)?.toFixed(2));
            const newPrice = (detail?.price / detail?.frequency) + Percentage;
            setPrice((newPrice).toString());
            setPercentage(Number((percentage - 0.05)?.toFixed(2)))
        }
    } 

    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["4", "4", "6"]} >
                {results?.map((item: IReceipt, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex as={"button"} ref={ref} flexDir={"column"} onClick={() => clickHander(item)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} >
                                <ProductImageScroller images={item?.rental?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.createdBy} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.rental?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.rental?.name), 16)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={["14px", "14px", "14px"]} fontWeight={"400"} >Order On {dateFormat(item?.createdDate)}</Text>
                                    </Flex>
                                </Flex>
                                <Flex as={"button"} onClick={() => clickHander(item)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                    {"View Details"}
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} flexDir={"column"} onClick={() => clickHander(item)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} >
                                <ProductImageScroller images={item?.rental?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.createdBy} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.rental?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.rental?.name), 16)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={["14px", "14px", "14px"]} fontWeight={"400"} >Order On {dateFormat(item?.createdDate)}</Text>
                                    </Flex>
                                </Flex>
                                <Flex as={"button"} onClick={() => clickHander(item)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                    {"View Details"}
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>

            <ModalLayout size={"2xl"} open={open} close={setOpen} closeIcon={false} >
                <Flex flexDir={"column"} p={"4"} gap={"4"} fontSize={"14px"}  >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontWeight={"500"} >e-invoice</Text>
                        <IoIosClose onClick={() => setOpen(false)} size={"30px"} />
                    </Flex>
                    <Flex w={"full"} gap={"4"} flexDir={["column", "column", "column"]} >
                        <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                            <Flex w={["full", "full", "fit-content"]} >
                                <Flex flexDir={"column"} gap={"2"} w={["full", "full", "218px"]} >
                                    <Flex w={["full", "full", "218px"]} h={"157px"} rounded={"8px"} bgColor={"#00000066"} position={"relative"} justifyContent={"center"} alignItems={"center"} >
                                        <Flex w={"fit-content"} h={"fit-content"} p={"6px"} pr={"5"} rounded={"24px"} pos={"absolute"} top={"3"} left={"3"} borderColor={mainBackgroundColor} borderWidth={"1px"} alignItems={"center"} gap={2} zIndex={"20"} >
                                            <UserImage image={detail?.createdBy?.data?.imgMain?.value} font={"16px"} data={detail?.createdBy} border={"1px"} size={"32px"} />
                                            <Flex flexDir={"column"} alignItems={"start"} color={mainBackgroundColor} >
                                                <Text fontSize={"12px"} fontWeight={"700"} >
                                                    {capitalizeFLetter(detail?.createdBy?.firstName) + " " + capitalizeFLetter(detail?.createdBy?.lastName)}
                                                </Text>
                                                <Text fontSize={"10px"} color={mainBackgroundColor} fontWeight={"600"} >
                                                    Client
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        <Flex pos={"absolute"} inset={"0px"} bgColor={"black"} opacity={"20%"} zIndex={"10"} rounded={"8px"} />
                                        <Image borderColor={"#D0D4EB"} objectFit={"cover"} alt={detail?.rental?.images[0]} w={["full", "full", "218px"]} h={"157px"} rounded={"8px"} src={detail?.rental?.images[0].startsWith('https://') ? detail?.rental?.images[0] : (IMAGE_URL as string) + detail?.rental?.images[0]} />
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex flexDir={"column"} gap={"2"} w={"full"} >
                                <Flex flexDir={"row"} gap={"1"} w={"fit-content"} alignItems={"center"} >
                                    <Text fontWeight={400} fontSize={'12px'}>Reciept ID:</Text>
                                    <Text fontWeight={400} fontSize={'12px'} bgColor={secondaryBackgroundColor} p={"2px"} rounded={"8px"} px={"4px"} >{detail?.id}</Text>
                                </Flex>
                                <Flex justifyContent={["start", "start"]} w={"full"} flexDir={["column", "column", "column"]} >
                                    <Text fontWeight={500} fontSize={'12px'}>Customer Name:</Text>
                                    <Text fontSize={"16px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(detail?.createdBy?.firstName) + " " + capitalizeFLetter(detail?.createdBy?.lastName), textSize)}</Text>
                                </Flex>
                                <Flex gap={"1"} flexDir={"column"} >
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Email:</Text>
                                        <Text fontSize={'14px'}>{detail?.createdBy?.email}</Text>
                                    </HStack>

                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Phone:</Text>
                                        <Text fontSize={'14px'}>{detail?.createdBy?.data?.mobilePhone?.value ?? 'None'}</Text>
                                    </HStack>
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Start Date:</Text>
                                        <Text fontSize={'14px'}>{dateFormat(detail?.startDate?.millis)}</Text>
                                    </HStack>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex w={"full"} mt={"2"} gap={"4"} >
                            <Flex w={"fit-content"} >
                                <Flex flexDir={"column"} gap={"1"} w={"218px"} >
                                    <Flex justifyContent={["start", "start", "space-between"]} w={"full"} p={"5px"} rounded={"8px"} bgColor={secondaryBackgroundColor} flexDir={["column", "column", "column"]} >
                                        <Text fontWeight={400} fontSize={'12px'}>Rental Details:</Text>
                                        <Text fontSize={"12px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(detail?.rental?.description), textSize)}<span role='button' style={{ color: primaryColor, fontSize: "12px", fontWeight: "600" }} onClick={() => setTextSize((prev) => prev === 40 ? detail?.rental?.description?.length + 1 : 40)} >{detail?.rental?.description?.length > 40 ? (textSize < detail?.rental?.description?.length ? "show more" : "show less") : ""}</span></Text>
                                    </Flex>
                                    <Flex justifyContent={["start", "start", "start"]} alignItems={"center"} w={"full"} flexDir={["row", "row", "row"]} gap={"1"} >
                                        <Text fontWeight={400} fontSize={'12px'}>Duration Of Rental:</Text>
                                        <Text fontSize={"14px"} fontWeight={"600"} >{detail?.frequency} <span style={{ fontSize: "12px", fontWeight: "500" }} >{detail?.rental?.frequency === "DAILY" ? (detail?.frequency > 1 ? "days" : "day") : (detail?.frequency > 1 ? "hours" : "hour")}</span></Text>
                                    </Flex>
                                    <Flex justifyContent={["start", "start", "start"]} alignItems={"center"} w={"full"} flexDir={["row", "row", "row"]} gap={"1"} >
                                        <Text fontWeight={400} fontSize={'12px'}>Initial Price:</Text>
                                        <Flex pos={"relative"}  > 
                                            <Text fontSize={"14px"} fontWeight={"600"} textDecor={""} >{formatNumber(detail?.rental?.price)}</Text>
                                        </Flex> 
                                    </Flex>
                                    <Flex justifyContent={["start", "start", "start"]} alignItems={"center"} w={"full"} flexDir={["row", "row", "row"]} gap={"1"} >
                                        <Text fontWeight={400} fontSize={'12px'}>Final Price:</Text>
                                        <Flex pos={"relative"}  >
                                            {((((detail?.rental?.price - detail?.price / detail?.frequency) * 100) / detail?.rental?.price) !== 0) && (
                                                <Flex w={"full"} h={"1.5px"} pos={"absolute"} top={"11px"} bgColor={"black"} />
                                            )}
                                            <Text fontSize={"14px"} fontWeight={"600"} textDecor={""} >{formatNumber(detail?.price/detail?.frequency)}</Text>
                                        </Flex>
                                        {((((detail?.rental?.price - detail?.price / detail?.frequency) * 100) / detail?.rental?.price) !== 0) && (
                                            <Text fontSize={"12px"} fontWeight={"500"}  >by {Math.abs(((((detail?.rental?.price - (detail?.price / detail?.frequency) )) / 100)))?.toFixed(0)}%</Text>
                                        )}
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex w={"full"} flexDir={"column"} gap={"4"} >
                                {detail?.approvalStatus === "PENDING" && (
                                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                                        <Text fontSize={'14px'}>You can neogiate this price by 5%</Text>
                                        <Flex w={"full"} mt='10px' justifyContent={"space-between"} alignItems="center">
                                            <HStack width={'120px'} height={'35px'} borderRadius={'50px'} overflow={'hidden'} backgroundColor={'#DDE2E6'}>
                                                <Flex onClick={() => handlePriceChange({ type: 'SUBSTRACTION', value: 0 })} cursor={'pointer'} w={"full"} height={'100%'} borderRightWidth={'1px'} borderRightColor={'gray'} justifyContent={'center'} alignItems={'center'}>
                                                    <FiMinus size={12} color='black' />
                                                </Flex>
                                                <Flex onClick={() => handlePriceChange({ type: 'ADDITION', value: 0 })} cursor={'pointer'} w={"full"} height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                                    <FiPlus size={12} color='black' />
                                                </Flex>
                                            </HStack>
                                            <CustomButton fontSize={"sm"} disable={detail?.price === Number(price)} isLoading={updateReciptPrice?.isLoading} onClick={() => updateReciptPrice.mutate({
                                                payload: {
                                                    price: Number(price) * Number(detail?.frequency)
                                                },
                                                id: detail?.id
                                            })} text={"Update Price"} borderRadius={"99px"} width={"150px"} />
                                        </Flex>
                                    </Flex>
                                )}
                                <Flex flexDir={["row", "row"]} justifyContent={'end'} gap={"5"} mt={"auto"} w='full' alignItems={'center'}>
                                    <Text fontSize={'14px'}>Total Price:</Text>
                                    <Text fontSize={'23px'} fontWeight={700}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format((Number(price) * Number(detail?.frequency)) || 0)}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontWeight={"600"} >Shipped To :  <span style={{ fontWeight: "500" }} >{detail?.address?.location?.locationDetails}</span></Text>
                            {/* <Text fontWeight={"600"} >State: <span style={{ fontWeight: "500" }} >{detail?.address?.state}</span></Text> */}
                        </Flex> 

                        {((detail?.rental?.createdBy !== userId) && (detail?.approvalStatus !== "PENDING") && (detail?.hasPaid === null) && (detail?.approvalStatus !== "CANCELLED")) && (
                            <Flex gap={"2"} >
                                <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                                <CustomButton isLoading={payForTicket?.isLoading} onClick={() => payForTicket.mutate({
                                    seller: detail?.rental?.createdBy,
                                    price: Number(detail?.price),
                                    currency: 'NGN',
                                    orderType: "RECEIPT",
                                    typeID: detail?.id
                                })} fontSize={"sm"} text={"Make Payment"} borderRadius={"99px"} width={"150px"} />
                            </Flex>
                        )}

                        {(detail?.approvalStatus === "ACCEPTED" && detail?.hasPaid !== null) && (
                            <Flex gap={"2"} >
                                <CustomButton disable={true} fontSize={"sm"} text={"Completed"} borderRadius={"99px"} width={"150px"} />
                            </Flex>
                        )}
                        {(detail?.approvalStatus === "PENDING" && detail?.rental?.createdBy !== userId) && (
                            <Flex gap={"2"} >
                                <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                                <CustomButton fontSize={"sm"} text={"Pending Approval"} borderRadius={"99px"} width={"150px"} backgroundColor={"#FF9500"} />
                            </Flex>
                        )}
                        {(detail?.approvalStatus === "ACCEPTED" && detail?.hasPaid === null && detail?.rental?.createdBy === userId) && (
                            <Flex gap={"2"} >
                                <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                                <CustomButton fontSize={"sm"} text={"Awaiting Payment"} borderRadius={"99px"} width={"150px"} backgroundColor={"#FF9500"} />
                            </Flex>
                        )} 
                        {(detail?.rental?.createdBy === userId && detail?.approvalStatus !== "ACCEPTED" && detail?.approvalStatus !== "CANCELLED") && (
                            <Flex gap={"2"} >
                                <CustomButton fontSize={"sm"} isLoading={updateRecipt?.isLoading && status === "ACCEPTED"} onClick={() => updateHandler("ACCEPTED")} text={"Accept"} borderRadius={"99px"} width={"150px"} />
                                <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                            </Flex>
                        )}
                        {detail?.approvalStatus === "CANCELLED" && (
                            <CustomButton fontSize={"sm"} disable={true} onClick={() => updateHandler("CANCELLED")} text={"Cancelled"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={"#FE0909"} color={"#FFF"} width={"250px"} />
                        )}
                    </Flex>
                </Flex>
            </ModalLayout>
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} message={message} />
        </LoadingAnimation>
    )
}
