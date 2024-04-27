import React, { useEffect } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, Box, VStack, Spinner, Image, Button } from "@chakra-ui/react";
import { Scanner as QrcodeScanner } from '@yudiel/react-qr-scanner';
import { useMutation } from "react-query";
import httpService from "@/utils/httpService";
import { URLS } from "@/services/urls";
import CustomText from "@/components/general/Text";
import Ticket from "@/components/event_component/ticket";
import { ITicket } from "@/models/Ticket";
import ModalLayout from '@/components/sharedComponent/modal_layout';

interface IProps {
    isOpen: boolean;
    onClose: (by?: boolean) => void;
}

export default function Scanner({
    isOpen,
    onClose
}: IProps) {
    const [approved, setApproved] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [ticket, setTicket] = React.useState<ITicket | null>(null);
    const [scanned, setScanned] = React.useState(false);

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (data: string) => httpService.get(`${URLS.VALIDATE_TICKET(data)}`),
        onSuccess: (data) => {
            console.log(data.data);
            setTicket(data?.data?.ticket);
            setApproved(data?.data?.validate);
            onClose(false)
            setOpen(true)
        }
    })

    const handleScanner = (str: string) => {
        setShow(false);
        mutate(str);
    }

    const retry = () => {
        setShow(true);
        onClose(true)
        setScanned(false);
    }

    const closeHandler = () => {
        setOpen(false)
    }

    return (
        <>

            <Modal isOpen={isOpen} isCentered={true} onClose={() => onClose()} size={scanned && !isLoading && !isError ? 'full' : 'full'}>
                <ModalContent bg={'grey'}>
                    {!isLoading && !scanned && (
                        <ModalCloseButton size={'large'} onClick={() => onClose()} />
                    )}
                    <ModalBody position={'relative'} width={'100%'} height={'400px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        {!isLoading && !scanned && (
                            <Box width={'300px'} height={'300px'} bg={'black'}>
                                <Box width={'100%'} height={'100%'}>
                                    <QrcodeScanner
                                        enabled={true}
                                        onResult={(text, result) => handleScanner(text)}
                                        onError={(error) => console.log(error?.message)}
                                    />
                                </Box>
                            </Box>
                        )}
                        {isLoading && (
                            <VStack justifyContent={'center'} w={'100%'} h={'100%'}>
                                <Spinner />
                                <CustomText>Verifing Ticket...</CustomText>
                            </VStack>
                        )}
                        {/* {!isLoading && isError && !show && (
                            <Box flex={1}>
                                <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} textAlign={'center'}>An error occured while scanning the ticket</CustomText>
                                <Button onClick={retry} width={'100%'} height={'45px'} color={'white'} bg={'brand.chasescrollButtonBlue'}>Retry</Button>
                            </Box>
                        )} */}
                    </ModalBody>
                </ModalContent>
            </Modal>
            <ModalLayout size={"full"} open={open} close={setOpen} >
                {(!isLoading && isError) && (
                    <Box flex={1}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} textAlign={'center'}>An error occured while scanning the ticket</CustomText>
                        <Button onClick={retry} width={'100%'} height={'45px'} color={'white'} bg={'brand.chasescrollButtonBlue'}>Retry</Button>
                    </Box>
                )}
                {(!isLoading && !isError) &&
                    <Ticket close={closeHandler} showQrCode={true} approved={approved} ticket={ticket as ITicket} />
                }
            </ModalLayout>
        </>
    )
}
