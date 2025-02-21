import { Flex, Text } from '@chakra-ui/react'
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

export default function RentalCheckout({ setQty, qty, item }: { setQty: any, qty: number, item: IRental }) {

    const { borderColor, secondaryBackgroundColor } = useCustomTheme()

    const [startDate, setStartDate] = useState("" as any)
    // const [endDate, setEndDate] = useState("" as any)
    const [open, setOpen] = useState(false)
    const { push } = useRouter()

    const clickHander = () => {
        push(`/dashboard/kisok/details-rental/${item?.id}/address?qty=${qty}&startDate=${Date.parse(new Date(startDate)?.toJSON())}&endDate=${item?.frequency !== "HOURLY" ? Date.parse(new Date(startDate?.getTime() + item?.maximiumNumberOfDays * 24 * 60 * 60 * 1000).toJSON()) : Date.parse(new Date(new Date(startDate).setHours(new Date(startDate).getHours() + qty)).toJSON())}`)
    }


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

    useEffect(()=> {
        setStartDate("" as any)
    }, [])

    return (
        <Flex w={"full"} bgColor={"white"} rounded={"16px"} flexDirection={"column"} borderWidth={"1px"} p={"24px"} gap={"4"} borderColor={borderColor} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
            <Text fontSize={"14px"} >Starting Price <span style={{ fontSize: "24px" }} >{formatNumber(item?.price)}</span>{item?.frequency !== "HOURLY" ? "/Per day" : "/Per hour"}</Text>
            <Flex alignItems={"center"} gap={"3"} >
                <Text fontWeight={"500"} >Numbers of days</Text>
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
            <CustomButton onClick={() => setOpen(true)} text={`NGN ${formatNumber(Number(item?.price) * Number(qty))} Pay`} borderRadius={"999px"} height={"55px"} />
            <ModalLayout open={open} close={setOpen} title={"Select Date For Rental"} >
                <Flex flexDirection={"column"} gap={"4"} p={"4"} >
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
                            <Text fontSize={"14px"} >Edit Of Rental</Text>
                            {item?.frequency !== "HOURLY" && (
                                <Text>{dateFormat(new Date(startDate?.getTime() + item?.maximiumNumberOfDays * 24 * 60 * 60 * 1000))}</Text>
                            )}
                            {item?.frequency === "HOURLY" && (
                                <Text>{dateFormat(new Date(startDate).setHours(new Date(startDate).getHours() + qty))+" "+timeFormat(new Date(startDate).setHours(new Date(startDate).getHours() + qty))}</Text>
                            )}
                        </Flex>
                    )}
                    <CustomButton disable={startDate ? false : true} onClick={clickHander} text={`Check Out`} borderRadius={"999px"} height={"55px"} />
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
