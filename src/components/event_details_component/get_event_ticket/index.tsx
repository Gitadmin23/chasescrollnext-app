import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Box, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import PaymentMethod from '../event_modal/payment_method'
import SelectTicketNumber from '../event_modal/select_ticket_number'
import RefundPolicy from '../event_modal/refund_policy'
import CustomButton from '@/components/general/Button'
import PaymentType from '../event_modal/payment_type'
import httpService from '@/utils/httpService'
import { useMutation, useQuery } from 'react-query'
import { URLS } from '@/services/urls'
import { useDetails } from '@/global-state/useUserDetails'
import ViewTicket from '../event_modal/view_ticket'
import SelectTicketType from '../event_modal/select_ticket_type'
import useStripeStore from '@/global-state/useStripeState'
import useModalStore from '@/global-state/useModalSwitch'
import { useRouter } from 'next/navigation'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'

interface Props {
    isBought: any,
    isFree: any,
    data: any,
    selectedTicket: any,
    setSelectedTicket: any,
    ticket: any,
    carousel?: boolean
}

function GetEventTicket(props: Props) {
    const {
        isBought,
        isFree,
        data,
        selectedTicket,
        setSelectedTicket,
        ticket,
        carousel
    } = props 

    const STRIPE_KEY: any = process.env.NEXT_PUBLIC_STRIPE_KEY;
    // const [stripePromise, setStripePromise] = React?.useState(() => loadStripe(STRIPE_KEY))

    const { showModal, setShowModal } = useModalStore((state) => state);
    const { setModalTab, modalTab } = useStripeStore((state: any) => state);

    // const [modalTab, setModalTab] = useState(1)
    const [numbOfTicket, setNumberOfTicket] = React.useState(1)
    // const [open, setopen] = useState(false) 
    const [ticketDetails, setTicketDetails] = useState({} as any)
    const [ticketLenght, setTicketLenght] = useState(0)
    const { userId: user_index } = useDetails((state) => state);
    const toast = useToast()

    const router = useRouter()

    const clickHandler = (event: any) => {
        event.stopPropagation();

        if (selectedTicket?.rerouteURL) {
            clickThrough()
        } else if (isBought) {
            setModalTab(carousel ? 6 : isBought ? 5 : 1)
            setShowModal(true)
        } else if (!selectedTicket?.ticketType) {
            toast({
                status: "error",
                title: "Please Select Ticket Type",
                position: 'top-right',
            });
        } else {
            if (!user_index) {
                router.push("/share/auth/login?type=EVENT&typeID=" + data?.id)
            } else {
                setModalTab(carousel ? 6 : isBought ? 5 : 1)
                setShowModal(true)
            }
        }
    }

    const modalHandler = (event: any) => {
        event.stopPropagation();
        setModalTab(6)
        setShowModal(true)
    }

    const { isLoading } = useQuery(['event_ticket' + data?.id], () => httpService.get(URLS.GET_TICKET + user_index + "&eventID=" + data?.id), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
                position: 'top-right',
            });
        },
        onSuccess: (data) => {
            // console.log(data);
            setTicketLenght(data?.data?.content?.length)
            setTicketDetails(data?.data?.content[0]);
        }
    })


    const createTicket = useMutation({
        mutationFn: (data: any) => httpService.post("/events/create-click-through", data),
        onSuccess: () => { 
            // toast({
            //     title: 'Success',
            //     description: "Error Occured",
            //     status: 'error',
            //     isClosable: true,
            //     duration: 5000,
            //     position: 'top-right',
            // });
        },
        onError: (error) => {
            // console.log(error);
            toast({
                title: 'Error',
                description: "Error Occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const clickThrough = React.useCallback(() => {
        createTicket.mutate({
            eventID: data?.id,
            ticketType: selectedTicket?.ticketType,
            rerouteURL: selectedTicket?.rerouteURL
        })
    }, [createTicket])



    return (
        <>
            {!carousel && (
                <>
                    {!selectedTicket?.rerouteURL ? 
                        <CustomButton bgColor={"brand.chasescrollBgBlue"} opacity={(!selectedTicket?.ticketType && !isBought) ? "30%" : ""} my={"auto"} onClick={clickHandler} disable={(!selectedTicket?.ticketType || selectedTicket?.ticketType || isBought) ? false : true} text={((isBought) ? "View" : isFree ? "Register" : "Buy") + " Ticket"} width={["full", "full"]} /> :
                        <a href={selectedTicket?.rerouteURL} target="_blank" > 
                            <CustomButton bgColor={"brand.chasescrollBgBlue"} opacity={(!selectedTicket?.ticketType && !isBought) ? "30%" : ""} my={"auto"} onClick={clickHandler} disable={(!selectedTicket?.ticketType || selectedTicket?.ticketType || isBought) ? false : true} text={((isBought) ? "View" : isFree ? "Register" : "Buy") + " Ticket"} width={["full", "full"]} />
                        </a>
                    }
                </>
            )}
            {carousel && (
                <Box >
                    <CustomButton onClick={modalHandler} fontSize={"sm"} borderColor={"brand.chasescrollBlue"} color={"white"} borderWidth={"1px"} px={"4"} text={"Get Ticket Now"} width={["172px"]} />
                </Box>
            )}
            <ModalLayout title={modalTab === 6 ? "Ticket available for this event" : ""} open={showModal} close={setShowModal} >
                {modalTab === 1 && (
                    <SelectTicketNumber close={setShowModal} numbOfTicket={numbOfTicket} setNumberOfTicket={setNumberOfTicket} next={setModalTab} selectedTicket={selectedTicket} data={data} />
                )}
                {modalTab === 2 && (
                    <RefundPolicy data={data} />
                )}
                {modalTab === 3 && (
                    <PaymentMethod />
                )}
                {modalTab === 4 && (
                    <PaymentType data={data} ticketCount={numbOfTicket} currency={data?.currency} selectedCategory={selectedTicket?.ticketType} click={setModalTab} />
                )}
                {modalTab === 5 && (
                    <LoadingAnimation loading={isLoading} >
                        <ViewTicket
                            userName={ticketDetails?.createdBy?.firstName + " " + ticketDetails?.createdBy?.lastName}
                            date={ticketDetails?.event?.startDate}
                            time={ticketDetails?.event?.startDate}
                            ticketFee={ticketDetails?.ticketType === "Free"
                                ? "Free"
                                : ticketDetails?.boughtPrice
                            }
                            click={setShowModal}
                            orderId={ticketDetails?.id}
                            length={ticketLenght}
                            currency={ticketDetails?.event?.currency}
                            location={ticketDetails?.event?.locationDetails}
                            datainfo={ticketDetails} />
                    </LoadingAnimation>
                )}
                {modalTab === 6 && (
                    <SelectTicketType ticket={ticket} setSelectedTicket={setSelectedTicket} currency={data?.currency} click={setModalTab} />
                )}
            </ModalLayout>
        </>
    )
}

export default GetEventTicket
