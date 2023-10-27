import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

type props = {
    open: any,
    close: any,
    size?: any,
    bg?: any,
    rounded?: boolean,
    children: React.ReactNode, 
}

export default function ModalLayout({open, close, children, size, bg, rounded}: props) { 
    
    // const [size, setSize] = React.useState("md") 

    return (
        <Modal onClose={close} scrollBehavior="inside" size={size ? size : "md"} isOpen={open} isCentered>
            <ModalOverlay />
            <ModalContent backgroundColor={bg ? bg :"#fff"} rounded={rounded ? "0px":"6px"} padding="0px" margin="16px" w="full" > 
                <ModalBody backgroundColor={bg ? bg :"#fff"} borderRadius={rounded ? "0px":"8px"} margin="0px"  padding="0px" w="full" >
                        {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
