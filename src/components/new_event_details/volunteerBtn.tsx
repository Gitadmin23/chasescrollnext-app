import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import Chatcollaborator from './chatcollaborator'
import CollaboratorBtn from '../create_event_component/event_ticket/collaborators'
import { IEventType } from '@/models/Event'
import { usePathname } from 'next/navigation'
import { Box, Flex } from '@chakra-ui/react'
import { formatNumberWithK } from '@/utils/formatNumberWithK'
import useCustomTheme from '@/hooks/useTheme'
import UserImage from '../sharedComponent/userimage'

export default function VolunteerBtn(props: IEventType) {

    const {
        collaborators,
        admins,
        acceptedAdmins,
        acceptedCollaborators,
        createdBy,
        id
    } = props

    const pathname = usePathname();
    const [open, setOpen] = useState(false)

    const { mainBackgroundColor, borderColor } = useCustomTheme()

    return (
        <>

            {((collaborators || admins) && !pathname?.includes("pastdetails")) && (
                <Flex w={"fit-content"} bgColor={mainBackgroundColor} rounded={"16px"} p={"3"} gap={"4"} borderWidth={"1px"} borderColor={borderColor} alignItems={"center"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >

                    <CollaboratorBtn update={true} collaborate={acceptedCollaborators?.length !== 0 || acceptedAdmins?.length !== 0} btn={true} data={props} />
                    <Flex alignItems={"center"} >
                        {acceptedAdmins?.map((item, index) => {
                            if (index <= 3) {
                                return (
                                    <Box key={index} ml={index === 0 ? "0px" : "-10px"} >
                                        <UserImage data={item} size={"35px"} image={item?.data?.imgMain?.value} font={"14" + "px"} border={"1px"} />
                                    </Box>
                                )
                            }
                        })}
                        {acceptedCollaborators?.map((item, index) => {
                            if (index <= 3) {
                                return (
                                    <Box key={index} ml={(index === 0 && acceptedAdmins?.length === 0) ? "0px" : "-10px"} >
                                        <UserImage data={item} size={"35px"} image={item?.data?.imgMain?.value} font={"14" + "px"} border={"1px"} />
                                    </Box>
                                )
                            }
                        })}
                        {(acceptedAdmins?.length + acceptedCollaborators?.length) >= 4 &&
                            <Box roundedBottom={"64px"} width={"35px"} fontWeight={"bold"} height={"35px"} fontSize={"14px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-10px"} display={'flex'} bgColor={"#3C41F0"} color={"#fff"} justifyContent={"center"} alignItems={"center"} >
                                {"+" + formatNumberWithK(acceptedAdmins?.length + acceptedCollaborators?.length - 3)}
                            </Box>
                        } 
                    </Flex>
                </Flex>
            )}

            <ModalLayout open={open} close={setOpen} title='Event Organizers' >
                <Chatcollaborator admins={acceptedAdmins} collaborators={acceptedCollaborators} />
            </ModalLayout>
        </>
    )
}
