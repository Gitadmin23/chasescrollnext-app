import {Modal, ModalBody, ModalCloseButton, ModalContent, Box} from "@chakra-ui/react";
import { Scanner as QrcodeScanner } from '@yudiel/react-qr-scanner';

interface IProps {
    isOpen: boolean;
    onClose:() => void;
}

export default function Scanner({
    isOpen,
    onClose
                                }: IProps) {
    return (
        <Modal isOpen={isOpen} isCentered={true} onClose={() => onClose()} size={'full'}>
            <ModalContent bg={'grey'}>
                <ModalCloseButton size={'large'}></ModalCloseButton>
                <ModalBody width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Box width={'300px'} height={'300px'} bg={'black'}>
                        <QrcodeScanner
                            enabled={true}
                            onResult={(text, result) => console.log(text, result)}
                            onError={(error) => console.log(error?.message)}
                        />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
