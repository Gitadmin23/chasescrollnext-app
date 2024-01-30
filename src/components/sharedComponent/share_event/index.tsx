'use client';
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import ModalLayout from '../modal_layout'
import SendMessage from '@/components/modals/send_message'
import SendMesageModal from '@/components/modals/send_message/send_to_app_user'
import { MessageIcon, ShareIcon } from '@/components/svg'
import { ShareType } from '@/app/share/page'
import Qr_code from '@/components/modals/send_message/Qr_code';

interface Props {
    id: any,
    size?: string,
    isprofile?: boolean,
    istext?: boolean,
    type: ShareType,
    eventName?: string,
    data?: any;
    showText?: boolean;
}

function ShareEvent(props: Props) {
    const {
        id,
        size,
        isprofile,
        istext,
        eventName,
        data,
        showText = true
    } = props

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(1)

    const CloseModal = () => {
        setOpen(false)
        setTab(1)
    }

    const clickHandler = (event: any) => {
        event.stopPropagation();
        setOpen(true)
    }

    return (
        <Box width={"fit-content"} zIndex={"20"} mt={size === "18px" ? "10px" : "0px"} >
            {(isprofile && !istext) && (
                <Box mt={"2px"} onClick={(e: any) => clickHandler(e)} as={"button"} >
                    <ShareIcon color={"#000"} />
                </Box>
            )}
            {(isprofile && istext) && (
                <Text onClick={(e: any) => clickHandler(e)} as={"button"} >Share</Text>
            )}
            {!isprofile && (
                <Box onClick={(e: any) => clickHandler(e)} as='button' display={"flex"} alignItems={"center"} flexDir={"column"} >
                    <ShareIcon width={size ? size : "24px"} color={"#3C41F0"} />
                    { showText && <Text color={"#3C41F0"} fontSize={"9px"} fontWeight={"semibold"} >share</Text>}
                </Box>
            )}
            <ModalLayout open={open} close={CloseModal} titlecolor={tab === 3 ? "white" : "black"} title={tab === 1 ? "Share" : tab === 2 ? "Share with friends" : ""} >
                {tab === 1 && (
                    <SendMessage data={data} isprofile={isprofile} type={props.type} id={id} click={setTab} eventName={eventName} />
                )}
                {tab === 2 && (
                    <SendMesageModal type={props.type} isprofile={isprofile} id={id} onClose={CloseModal} />
                )}
                {tab === 3 && ( 
                    <Qr_code data={data} close={CloseModal} id={id} />
                )}
            </ModalLayout>
        </Box>
    )
}

export default ShareEvent
