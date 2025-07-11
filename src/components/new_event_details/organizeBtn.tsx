import { Box, Button, Flex, ModalOverlay, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import CustomButton from '@/components/general/Button'
import { FiAlertCircle } from "react-icons/fi";
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from '@/models/Event'
import { THEME } from '@/theme'
import EventQrCode from '../event_details_component/event_qrcode'
import Scanner from '../modals/Events/Scanner'
import { DashboardEditIcon, DashboardOrganizerIcon, DashboardScannerIcon } from '../svg'
import { IoArrowDown } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import PrBtn from './prBtn'

function OrganizeBtn(props: IEventType) {
    const {
        isOrganizer,
        eventMemberRole,
        startDate,
        endDate
    } = props

    const {
        borderColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const [showScanner, setShowScanner] = React.useState(false);

    const router = useRouter()
    const [listOfClicks, setListOfClicks] = useState(0)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const clickHandler = () => {
        if (props?.ticketBought) {
            setOpen(true)
        } else {
            router.push("/dashboard/event/edit_event/" + props?.id)
        }
    }

    useEffect(() => {
        props?.productTypeData?.map((item: any) => {
            let count = item?.clickThroughCount + listOfClicks 
            setListOfClicks(count)
        })
    }, [])

    console.log(eventMemberRole);
    console.log(isOrganizer);
    

    return (
        <Box w={"full"} >
            {/* <Flex display={["none", "none", "flex", "flex"]} justifyContent={"center"} width={"full"} alignItems={"center"} gap={"54px"} >
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} disabled={eventMemberRole === "COLLABORATOR" ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router.push("/dashboard/settings/event-dashboard/" + props?.id)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                    <DashboardOrganizerIcon />
                    <Text fontSize={"12px"} fontWeight={"600"} >Dashboard</Text>
                </Flex>
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} disabled={(pathname?.includes("pastdetails") || eventMemberRole === "COLLABORATOR") ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => clickHandler()} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                    <DashboardEditIcon />
                    <Text fontSize={"12px"} fontWeight={"600"} >Edit Event</Text>
                </Flex> 
            </Flex>
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} gap={"5"} pb={"1"} px={"3"} display={["flex", "flex", "none", "none"]} >
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} disabled={eventMemberRole === "COLLABORATOR" ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router.push("/dashboard/settings/event-dashboard/" + props?.id)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                    <DashboardOrganizerIcon />
                    <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                </Flex>
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} disabled={(pathname?.includes("pastdetails") || eventMemberRole === "COLLABORATOR") ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => clickHandler()} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                    <DashboardEditIcon />
                    <Text fontSize={"12px"} fontWeight={"500"} >Edit Event</Text>
                </Flex>
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} as={"button"} disabled={(new Date() <= new Date(startDate)) && (new Date() < new Date(endDate))} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => setShowScanner(true)} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                    <DashboardScannerIcon />
                    <Text fontSize={"12px"} fontWeight={"500"} >Scan Ticket</Text>
                </Flex>
            </Flex> */}
            <Flex rounded={"12px"} bgColor={mainBackgroundColor} maxW={["350px"]} w={"full"} flexDir={"column"} borderWidth={"1px"} borderColor={borderColor} >
                <Flex w={"full"} borderBottomWidth={"1px"} borderColor={borderColor} >
                    <Flex w={"full"} gap={"2"} h={"55px"} as={"button"} alignItems={"center"} justifyContent={"center"} borderRightWidth={"1px"} borderColor={borderColor} disabled={eventMemberRole === "COLLABORATOR" ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => router.push("/dashboard/settings/event-dashboard/" + props?.id)} >
                        <DashboardOrganizerIcon />
                        <Text fontSize={"14px"} fontWeight={"500"} >Dashboard</Text>
                    </Flex>
                    <Flex w={"full"} gap={"2"} h={"55px"} alignItems={"center"} justifyContent={"center"} as={"button"} disabled={(pathname?.includes("pastdetails") || eventMemberRole === "COLLABORATOR" || (eventMemberRole === "ADMIN" && !isOrganizer)) ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => clickHandler()} >
                        <DashboardEditIcon />
                        <Text fontSize={"14px"} fontWeight={"500"} >Edit Event</Text>
                    </Flex> 
                </Flex>
                <Flex w={"full"} > 
                    <PrBtn data={props} /> 
                    <Flex w={"full"} gap={"2"} h={"55px"} display={["flex", "flex", "none"]} borderLeftWidth={"1px"} alignItems={"center"} justifyContent={"center"} as={"button"} disabled={(pathname?.includes("pastdetails")) ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => setShowScanner(true)} >
                        <DashboardScannerIcon />
                        <Text fontSize={"14px"} fontWeight={"500"} >Scan Ticket</Text>
                    </Flex>
                </Flex>
            </Flex>
            <ModalLayout open={open} close={setOpen} title='' >
                <Box px={"4"} pt={"5"} pb={"5"} >
                    <Flex color={"brand.chasescrollRed"} width={"full"} pb={"4"} justifyContent={"center"} >
                        <FiAlertCircle size={"60px"} />
                    </Flex>
                    <Text fontWeight={"medium"} textAlign={"center"} >{`You can only edit the DATE, TIME, LOCATION and INCREASE NUMBER OF AVAILABLE TICKETS for this event. You already have existing attendees for this event.`}</Text>
                    <Flex w={"full"} gap={"4"} mt={"6"} >
                        <CustomButton onClick={() => setOpen(false)} backgroundColor={"brand.chasescrollRed"} width={"full"} text='Cancel' />
                        <CustomButton onClick={() => router.push("/dashboard/event/edit_event_data/" + props?.id)} text='Continue' width={"full"} />
                    </Flex>
                </Box>
            </ModalLayout>
            <Scanner isOpen={showScanner} eventID={props?.id} startDate={startDate} endDate={endDate} onClose={() => setShowScanner(false)} />
        </Box>
    )
}

export default OrganizeBtn
