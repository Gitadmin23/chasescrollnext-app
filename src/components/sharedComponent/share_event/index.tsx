import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import ModalLayout from '../modal_layout'
import SendMessage from '@/components/modals/send_message'
import SendMesageModal from '@/components/modals/send_message/send_to_app_user'

interface Props {
    id: any,
    size?: string
}

function ShareEvent(props: Props) {
    const {
        id,
        size
    } = props

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(1)

    const CloseModal =()=> {
        setOpen(false)
        setTab(1)
    }

    const clickHandler =(event: any) => {
        event.stopPropagation();
        setOpen(true)
    }

    return (
        <Box width={"fit-content"} zIndex={"20"}  mt={size === "18px" ? "10px": "0px"} >
            <Box onClick={(e: any)=> clickHandler(e)} as='button' > 
                <FiUpload size={size ? size : "24px"} color={"#3C41F0"} />
            </Box>
            <ModalLayout open={open} close={CloseModal} title={tab === 1 ? "Share" : "Share with friends"} >
                {tab === 1 && (
                    <SendMessage id={id} click={setTab} />
                )}
                {tab === 2 && (
                    <SendMesageModal id={id} onClose={CloseModal} />
                )}
            </ModalLayout>
        </Box>
    )
}

export default ShareEvent
