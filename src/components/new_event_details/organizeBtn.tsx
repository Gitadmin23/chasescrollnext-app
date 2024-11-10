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

function OrganizeBtn(props: IEventType) {
    const {
        isOrganizer,
        eventMemberRole,
        startDate,
        endDate
    } = props

    const {
        borderColor,
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

    return (
        <Box my={"auto"} w={"full"} >
            <Flex display={["none", "none", "flex", "flex"]} justifyContent={"center"} width={"full"} alignItems={"center"} gap={"54px"} >
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} disabled={eventMemberRole === "COLLABORATOR" ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => router.push("/dashboard/settings/event-dashboard/" + props?.id)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                    <DashboardOrganizerIcon />
                    <Text fontSize={"12px"} fontWeight={"600"} >Dashboard</Text>
                </Flex>
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} disabled={(pathname?.includes("pastdetails") || eventMemberRole === "COLLABORATOR") ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => clickHandler()} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                    <DashboardEditIcon />
                    <Text fontSize={"12px"} fontWeight={"600"} >Edit Event</Text>
                </Flex>
                {/* <Flex shadow={"lg"} rounded={"13px"} w={"80px"} h={"70px"} as={"button"} onClick={() => setShowScanner(true)} bgColor={"#EFF5F8"} borderWidth={"1px"} borderColor={borderColor}  gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                    <DashboardScannerIcon />
                    <Text fontSize={"12px"} fontWeight={"600"} >Scan Ticket</Text>
                </Flex> */}
                {/* {(isOrganizer || eventMemberRole === "ADMIN") && (
                    <Flex flexDirection={["column", "column"]} width={"full"} justifyContent={"center"} alignItems={"center"} gap={"3"} >
                        <Button onClick={() => router.push("/dashboard/settings/event-dashboard/" + props?.id)} width={"full"} borderColor={"brand.chasescrollBlue"} borderWidth={"1px"} bgColor={"white"} borderRadius={"32px"} height={"57px"} color={"brand.chasescrollBlue"} fontSize={"sm"} fontWeight={"semibold"} _hover={{ backgroundColor: "white" }} >My Dashboard</Button>
                        {!pathname?.includes("pastdetails") && (
                            <Button isDisabled={pathname?.includes("pastdetails") ? true : false} borderRadius={"32px"} onClick={() => clickHandler()} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} borderColor={"brand.chasescrollBlue"} width={"full"} bg={"brand.chasescrollBlue"} height={"57px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} _hover={{ backgroundColor: THEME.COLORS?.chasescrollBlue }} >Edit Event</Button>
                        )}
                    </Flex>
                )} */}
                {/* <CustomButton display={["block", "block", "block", "none", "none"]} onClick={() => setShowScanner(true)} color={"#12299C"} borderRadius={"32px"} text='Scan Ticket' w={"full"} backgroundColor={"white"} border={"1px solid #12299C75"} height={"57px"} fontSize={"sm"} /> */}

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
                <Flex bgColor={mainBackgroundColor} p={"2"} rounded={"2xl"} as={"button"} disabled={(new Date() > new Date(startDate)) && (new Date() < new Date(endDate))} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => setShowScanner(true)} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                    <DashboardScannerIcon />
                    <Text fontSize={"12px"} fontWeight={"500"} >Scan Ticket</Text>
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
