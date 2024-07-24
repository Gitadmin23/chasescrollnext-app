import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Bird, CalendarIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState'
import useCustomTheme from '@/hooks/useTheme'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { Box, Flex, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosClose } from 'react-icons/io'

interface IProps {
    data?: any,
    index?: number
}

export default function EarlyBird({ data, index }: IProps) {

    const { primaryColor, secondaryBackgroundColor, headerTextColor } = useCustomTheme()

    const { eventdata, updateEvent } = useEventStore((state) => state);

    const [open, setOpen] = useState(false)

    const toast = useToast()

    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"4px"} fontSize={"sm"} h={"50px"}  >
                <CalendarIcon />
                {eventdata.productTypeData[0]?.startDate ? dateFormat(eventdata.productTypeData[0]?.startDate) : "Select Date And Time"}
                {" "}
                {eventdata.productTypeData[0]?.startDate ? timeFormat(eventdata.productTypeData[0]?.startDate) : ""}
            </Flex>
        )
    }

    const CustomInputEnd = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"4px"} fontSize={"sm"} h={"50px"}  >
                <CalendarIcon />
                {eventdata.productTypeData[0]?.endDate ? dateFormat(eventdata.productTypeData[0]?.endDate) : "Select Date And Time"}
                {" "}
                {eventdata.productTypeData[0]?.endDate ? timeFormat(eventdata.productTypeData[0]?.endDate) : ""}
            </Flex>
        )
    }

    const handleChange = (value: any) => {
        let clone: any = { ...eventdata }
        clone.productTypeData[0]["startTime"] = Date.parse(new Date(value).toJSON())
        clone.productTypeData[0]["startDate"] = Date.parse(new Date(value).toJSON())

        updateEvent(clone)
    };

    const handleChangeEnd = (value: any) => {
        let clone: any = { ...eventdata }
        clone.productTypeData[0]["endTime"] = Date.parse(new Date(value).toJSON())
        clone.productTypeData[0]["endDate"] = Date.parse(new Date(value).toJSON())

        updateEvent(clone)
    };

    const clickHander = () => {
        setOpen(true)
        if (eventdata?.productTypeData[0]?.ticketType !== "Early Bird") {
            const clone = { ...eventdata }
            const ticket = {
                totalNumberOfTickets: "",
                ticketPrice: "",
                ticketType: "Early Bird",
                minTicketBuy: 1,
                maxTicketBuy: 1,
                endDate: 0,
                endTime: 0,
                startDate: 0,
                startTime: 0
            }
            clone.productTypeData.unshift(ticket)
            console.log(clone);

        }
    }

    const handleChangeInput = (index: any, name: any, value: any) => {
        let clone: any = { ...eventdata }

        if (name === "minTicketBuy" && value > 5) {
            toast({
                status: "error",
                title: "Error",
                description: "minimum ticket can't be greater than 5",
                position: "top-right"
            })

        } else if (name === "maxTicketBuy" && value > 50) {
            toast({
                status: "error",
                title: "Error",
                description: "maximum ticket can't be greater than 50",
                position: "top-right"
            })
            console.log("max stop");
        } else {
            clone.productTypeData[0]["minTicketBuy"] = 1
            clone.productTypeData[0][name] = value

            updateEvent(clone)
        }
    };

    return (
        <Flex>
            <Flex as={"button"} onClick={() => clickHander()} alignItems={"center"} gap={"1"} px="6" h={"45px"} rounded={"12px"} bgColor={primaryColor} color={"white"} >
                <Bird />
                <Text fontWeight={"500"} fontSize={"14px"} >Early Bird</Text>
            </Flex>
            <ModalLayout bg={secondaryBackgroundColor} open={open} close={setOpen} >
                <Flex p={"6"} w={"full"} flexDir={"column"} color={headerTextColor} >
                    <Flex w={"full"} flexDir={"column"} gap={"6"} justifyContent={"space-between"} >
                        <Flex w={"full"} justifyContent={"space-between"} >
                            <Flex flexDir={"column"} >
                                <Text fontSize={"22px"} fontWeight={"600"} >Early Bird Ticket</Text>
                                <Text>Enter the ticket information</Text>
                            </Flex>
                            <Flex as={"button"} onClick={() => setOpen(false)} width={"fit-content"} h={"full"} justifyContent={"center"} alignItems={"center"} >
                                <IoIosClose size="32px" />
                            </Flex>
                        </Flex>
                        <Flex flexDir={"column"} w={"full"} gap={"4"} >

                            <Box width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Enter Price
                                </label>
                                <Flex gap={"2"} >
                                    <Input
                                        h={"45px"}
                                        type="number"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                        width={"full"}
                                        border={"1px solid #E2E8F0"}
                                        focusBorderColor={"#E2E8F0"}
                                        placeholder="Enter amount"
                                        value={eventdata.productTypeData[0]?.ticketPrice ?? ""}
                                        disabled={false}
                                        name="ticketPrice"
                                        onChange={e => handleChangeInput(0, "ticketPrice", e.target.value)}
                                    />
                                </Flex>
                            </Box>
                            <Box width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Total number of tickets available to be sold for your
                                    events
                                </label>
                                <Input
                                    h={"45px"}
                                    type="number"
                                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                    border={"1px solid #E2E8F0"}
                                    focusBorderColor={"#E2E8F0"}
                                    placeholder=" Type in available quantity"
                                    // value={eventdata.totalTicketAvailable}
                                    value={eventdata.productTypeData[0]?.totalNumberOfTickets ?? ""}
                                    name="totalNumberOfTickets"
                                    onChange={e =>
                                        handleChangeInput(0, "totalNumberOfTickets", e.target.value)
                                    }
                                />
                            </Box>
                            <Flex flexDir={"column"} gap={"2"} >
                                <Text fontSize={"sm"} >
                                    Start date
                                </Text>
                                <DatePicker
                                    // value={}
                                    // disabled={name === "End" && !eventdata.startDate}
                                    selected={eventdata.productTypeData[0]?.startDate ? new Date(eventdata.productTypeData[0]?.startDate) : new Date()}
                                    dateFormat="MMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    minDate={new Date()}
                                    onChange={handleChange}
                                    customInput={<CustomInput />}
                                />
                            </Flex>
                            <Flex flexDir={"column"} gap={"2"} >
                                <Text fontSize={"sm"} >
                                    End date
                                </Text>
                                <DatePicker
                                    // value={}
                                    // disabled={name === "End" && !eventdata.startDate}
                                    selected={eventdata.productTypeData[0]?.endDate ? new Date(eventdata.productTypeData[0]?.endDate) : eventdata.productTypeData[0]?.startDate ? new Date(eventdata.productTypeData[0]?.startDate) : new Date()}
                                    dateFormat="MMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    minDate={eventdata.productTypeData[0]?.startDate ? new Date(eventdata.productTypeData[0]?.startDate) : new Date()}
                                    onChange={handleChangeEnd}
                                    customInput={<CustomInputEnd />}
                                />
                            </Flex>
                        </Flex>
                        <CustomButton onClick={() => setOpen(false)} text={"Close"} w={"full"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}