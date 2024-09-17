import { Box, Button, Flex, ModalOverlay, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import CustomButton from '@/components/general/Button'
import { FiAlertCircle } from "react-icons/fi";
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from '@/models/Event'
import { THEME } from '@/theme'

function OrganizeBtn(props: IEventType) {
    const {
        isOrganizer,
    } = props

    const { bodyTextColor } = useCustomTheme();
    const { colorMode } = useColorMode();

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
        <Box my={"auto"} >
            {(isOrganizer) && (
                <Flex flexDirection={["column", "column"]} width={"full"} justifyContent={"center"} alignItems={"center"} gap={"3"} >
                    <Button onClick={() => router.push("/dashboard/settings/event-dashboard/" + props?.id)} width={"full"} borderColor={"brand.chasescrollBlue"} borderWidth={"1px"} bgColor={"white"} borderRadius={"32px"} height={"57px"} color={"brand.chasescrollBlue"} fontSize={"sm"} fontWeight={"semibold"} _hover={{ backgroundColor: "white" }} >My Dashboard</Button>
                    {!pathname?.includes("pastdetails") && (
                        <Button isDisabled={pathname?.includes("pastdetails") ? true : false} borderRadius={"32px"} onClick={() => clickHandler()} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} borderColor={"brand.chasescrollBlue"} width={"full"} bg={"brand.chasescrollBlue"} height={"57px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} _hover={{ backgroundColor: THEME.COLORS?.chasescrollBlue }} >Edit Event</Button>
                    )}
                </Flex>
            )}
            <ModalLayout open={open} close={setOpen} title='' >
                <Box px={"4"} pt={"5"} pb={"5"} >
                    <Flex color={"brand.chasescrollRed"} width={"full"} pb={"4"} justifyContent={"center"} >
                        <FiAlertCircle size={"60px"} />
                    </Flex>
                    <Text fontWeight={"medium"} textAlign={"center"} >You can only edit the date, time and location of this event because people have already bought tickets to this event.</Text>
                    <Flex w={"full"} gap={"4"} mt={"6"} >
                        <CustomButton onClick={() => setOpen(false)} backgroundColor={"brand.chasescrollRed"} width={"full"} text='Cancel' />
                        <CustomButton onClick={() => router.push("/dashboard/event/edit_event_data/" + props?.id)} text='Continue' width={"full"} />
                    </Flex>
                </Box>
            </ModalLayout>
        </Box>
    )
}

export default OrganizeBtn
