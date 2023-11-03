import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import ModalLayout from '../modal_layout'
import SendMessage from '@/components/modals/send_message'
import SendMesageModal from '@/components/modals/send_message/send_to_app_user'

interface Props {
    id: any,
    size?: string,
    isprofile?: boolean,
    istext?: boolean
}

function ShareEvent(props: Props) {
    const {
        id,
        size,
        isprofile,
        istext
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
            {(isprofile  && !istext) && ( 
                <Flex onClick={(e: any) => clickHandler(e)} as={"button"} width={"48px"} bgColor={"#FFFFFF1A"} height={"48px"} rounded={"full"} pr={"2px"} alignItems={"center"} justifyContent={"center"} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="tabler:share">
                            <path id="Vector" d="M8.7 10.7L15.3 7.3M8.7 13.3L15.3 16.7M3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15C6.79565 15 7.55871 14.6839 8.12132 14.1213C8.68393 13.5587 9 12.7956 9 12C9 11.2044 8.68393 10.4413 8.12132 9.87868C7.55871 9.31607 6.79565 9 6 9C5.20435 9 4.44129 9.31607 3.87868 9.87868C3.31607 10.4413 3 11.2044 3 12ZM15 6C15 6.79565 15.3161 7.55871 15.8787 8.12132C16.4413 8.68393 17.2044 9 18 9C18.7956 9 19.5587 8.68393 20.1213 8.12132C20.6839 7.55871 21 6.79565 21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6ZM15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </svg>
                </Flex>
            )}
            {(isprofile && istext) && (
                <Text onClick={(e: any) => clickHandler(e)} as={"button"} >Share</Text>
            )}
            {!isprofile && (
                <Box onClick={(e: any) => clickHandler(e)} as='button' >
                    <FiUpload size={size ? size : "24px"} color={"#3C41F0"} />
                </Box>
            )}
            <ModalLayout open={open} close={CloseModal} title={tab === 1 ? "Share" : "Share with friends"} >
                {tab === 1 && (
                    <SendMessage isprofile={isprofile} id={id} click={setTab} />
                )}
                {tab === 2 && (
                    <SendMesageModal isprofile={isprofile} id={id} onClose={CloseModal} />
                )}
            </ModalLayout>
        </Box>
    )
}

export default ShareEvent
