import { Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import CustomButton from '../general/Button'
import { formatNumber } from '@/utils/numberFormat'
import { IRental } from '@/models/product'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter } from 'next/navigation'
import ModalLayout from '../sharedComponent/modal_layout'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { CalendarIcon } from '../svg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectAddress from './selectAddress'

export default function RentalCheckout({ setQty, qty, item }: { setQty: any, qty: number, item: IRental }) {

    const { borderColor, secondaryBackgroundColor } = useCustomTheme()

    const [startDate, setStartDate] = useState("" as any)
    const [open, setOpen] = useState(false)
    const [newPrice, setNewPrice] = useState("")

    const [tab, setTab] = useState(true)

    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"sm"} h={"50px"}  >
                <CalendarIcon />
                {startDate ? dateFormat(startDate) : "Select Date And Time"}
                {" "}
                {startDate ? timeFormat(startDate) : ""}
            </Flex>
        )
    }
    const handleDateSelect = (date: any) => {
        setStartDate(date)
    }

    useEffect(() => {
        setStartDate("" as any)
    }, [])

    useEffect(() => {
        setTab(false)
    }, [open])

    return (
        <Flex w={"full"} bgColor={"white"} rounded={"16px"} flexDirection={"column"} borderWidth={"1px"} p={["4", "4", "24px"]} gap={"1"} borderColor={borderColor} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
            <Flex gap={"1"} flexDir={["column", "column", "row"]} >
                <Text fontSize={"14px"} >Starting Price</Text>
                <Text fontSize={"14px"} ><span style={{ fontSize: "22px", fontWeight: "600" }} >{formatNumber(item?.price)}</span>{item?.frequency !== "HOURLY" ? "/Per day" : "/Per hour"}</Text>
            </Flex>
            <Flex alignItems={"center"} gap={"3"} >
                <Text fontSize={["12px", "12px","14px"]} fontWeight={"500"} >Number of {item?.frequency !== "HOURLY" ? "days" : "hrs"}</Text>
                <Flex rounded={"39px"} alignItems={"center"} padding={"12px"} gap={"3"} >
                    <Flex as={"button"} onClick={() => setQty((prev: any) => prev === 1 ? 1 : prev - 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                        <IoIosRemove />
                    </Flex>
                    <Text fontSize={"18px"} >{qty}</Text>
                    <Flex as={"button"} onClick={() => setQty((prev: any) => prev + 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                        <IoIosAdd />
                    </Flex>
                </Flex>
            </Flex>
            <CustomButton onClick={() => setOpen(true)} text={`NGN ${formatNumber(Number(item?.price) * Number(qty))}`} borderRadius={"999px"} height={"55px"} />
            <ModalLayout open={open} close={setOpen} size={tab ? "4xl" : "sm"} closeIcon={true} >
                <Flex flexDirection={"column"} gap={"4"} p={"4"} >
                    <Text>Step {!tab ? "1" : "2"}/2</Text>
                    {!tab && (
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontSize={"24px"} fontWeight={"600"} >Select date for Rental</Text>
                            <Flex flexDirection={"column"} gap={"1"}  >
                                <Text fontSize={"14px"} >Start Date</Text>
                                <DatePicker
                                    // value={}
                                    // disabled={name === "End" && !eventdata.startDate}
                                    selected={startDate ? new Date(startDate) : new Date()}
                                    dateFormat="MMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    minDate={new Date()}
                                    onChange={handleDateSelect}
                                    customInput={<CustomInput />}
                                />
                            </Flex>
                            {startDate && (
                                <Flex flexDirection={"column"} gap={"1"}  >
                                    <Text fontSize={"14px"} >End Date</Text>

                                    <Flex as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"sm"} h={"50px"}  >
                                        <CalendarIcon />
                                        {item?.frequency !== "HOURLY" && (
                                            <Text>{dateFormat(new Date(startDate?.getTime() + qty * 24 * 60 * 60 * 1000))}</Text>
                                        )}
                                        {item?.frequency === "HOURLY" && (
                                            <Text>{dateFormat(new Date(startDate).setHours(new Date(startDate).getHours() + qty)) + " " + timeFormat(new Date(startDate).setHours(new Date(startDate).getHours() + qty))}</Text>
                                        )}
                                    </Flex>
                                </Flex>
                            )}
                            <Flex flexDirection={"column"} gap={"1"}  >
                                <Text fontSize={"14px"} >Negotiate Price Per Day(Optional)</Text>
                                <Input height={"50px"} w={"full"} value={newPrice} type="number" placeholder={formatNumber(item?.price)} onChange={(e) => setNewPrice(e.target.value)} />
                            </Flex>
                            <CustomButton disable={startDate ? false : true} mt={"4"} onClick={() => setTab(true)} text={`Continue`} borderRadius={"999px"} height={"55px"} />
                        </Flex>
                    )}
                    {tab && (
                        <SelectAddress item={item} newPrice={newPrice ? Number(newPrice) : 0} qty={qty} id={item?.id} startDate={Date.parse(new Date(startDate)?.toJSON())} endDate={startDate ? (item?.frequency !== "HOURLY" ? Date.parse(new Date(startDate?.getTime() + item?.maximiumNumberOfDays * 24 * 60 * 60 * 1000).toJSON()) : Date.parse(new Date(new Date(startDate).setHours(new Date(startDate).getHours() + qty)).toJSON())) : ""} />
                    )}
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
