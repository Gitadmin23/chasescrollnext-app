import Qr_code from '@/components/modals/send_message/Qr_code';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import { ScanIcon } from '@/components/svg'
import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {
    id: any,
    data?: any;
    notext?: boolean
}

function EventQrCode(props: Props) {
    const {
        id,
        data,
        notext
    } = props

    const [open, setOpen] = useState(false)

    const CloseModal = () => {
        setOpen(false)
    }

    return (
        <>
            <Flex onClick={() => setOpen(true)} as={"button"} gap={"11px"} >
                {!notext && (
                    <Text color={"#3C41F0"} >Get Event QR Code</Text>
                )}
                <ScanIcon />
            </Flex>

            <ModalLayout open={open} close={CloseModal} titlecolor={"black"} title={""} >
                <Qr_code data={data} close={CloseModal} id={id} />
            </ModalLayout>
        </>
    )
}

export default EventQrCode
