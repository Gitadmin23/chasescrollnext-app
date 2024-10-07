import ModalLayout from "@/components/sharedComponent/modal_layout";
import { Box, Flex, Text, useColorMode, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import PaymentMethod from "./event_modal/payment_method";
import SelectTicketNumber from "./event_modal/select_ticket_number";
import RefundPolicy from "./event_modal/refund_policy";
import CustomButton from "@/components/general/Button";
import PaymentType from "./event_modal/payment_type";
import httpService from "@/utils/httpService";
import { useMutation, useQuery } from "react-query";
import { useDetails } from "@/global-state/useUserDetails";
import ViewTicket from "./event_modal/view_ticket";
import SelectTicketType from "./event_modal/select_ticket_type";
import useStripeStore from "@/global-state/useStripeState";
import useModalStore from "@/global-state/useModalSwitch";
import { useRouter } from "next/navigation";
import { SuccessIcon } from "@/components/svg";
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from "@/models/Event"; 

function GetEventTicket(props: IEventType) {
    const {
        isBought,
        isFree,
        productTypeData,
        id
    } = props;

    const { secondaryBackgroundColor } = useCustomTheme();
    // const [stripePromise, setStripePromise] = React?.useState(() => loadStripe(STRIPE_KEY))

    const { showModal, setShowModal } = useModalStore((state) => state);
    const { setModalTab, modalTab } = useStripeStore((state: any) => state);

    // const [modalTab, setModalTab] = useState(1)
    const [numbOfTicket, setNumberOfTicket] = React.useState(1);
    const { userId: user_index } = useDetails((state) => state);
    const toast = useToast();
    const token = sessionStorage.getItem("tp_token");
    const router = useRouter();

    const { ticketType, setTicketType } = useModalStore((state) => state);

    const clickHandler = (event: any) => {
        event.stopPropagation();
        if (isBought) {
            setModalTab(isBought ? 5 : 1);
            setShowModal(true);
        } else if (!ticketType?.ticketType) {
            toast({
                status: "error",
                title: "Please Select Ticket Type",
                position: "top-right",
            });
        } else {
            if (token) {
                setModalTab(isBought ? 5 : 1);
                setShowModal(true);
            } else if (!user_index) {
                router.push("/share/auth/login?type=EVENT&typeID=" + id);
            } else {
                setModalTab(isBought ? 5 : 1);
                setShowModal(true);
            }
        }
    };

    const modalHandler = (event: any) => {
        event.stopPropagation();
        setModalTab(6);
        setShowModal(true);
    };

    const closeHandler = () => {
        setModalTab(1);
        setShowModal(false);
    };

    const createTicket = useMutation({
        mutationFn: (data: any) =>
            httpService.post("/events/create-click-through", data),
        onSuccess: () => { },
        onError: (error) => {
            // console.log(error);
            toast({
                title: "Error",
                description: "Error Occured",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        },
    });

    const goback = () => {
        if (showModal) {
            setShowModal(false)
        } else {
            setShowModal(true)
        }
        setModalTab(4)
    }

    console.log(ticketType);
    

    return (
        <>
            <CustomButton backgroundColor={"#233DF3"} borderRadius={"32px"} opacity={(!ticketType?.ticketType && !isBought) ? "30%" : ""} my={"auto"} onClick={clickHandler} disable={(!ticketType?.ticketType || ticketType?.ticketType || isBought) ? false : true} text={((isBought) ? "View Ticket" : isFree ? "Register" : "Check out ")} width={["full"]} height={"57px"} fontSize={"sm"} fontWeight={"semibold"} />

            <ModalLayout size={modalTab === 5 ? ["md", "md", "3xl"] : "md"} title={modalTab === 6 ? "Ticket available for this event" : ""} open={showModal} close={setShowModal} >
                {modalTab === 1 && (
                    <SelectTicketNumber close={setShowModal} numbOfTicket={numbOfTicket} setNumberOfTicket={setNumberOfTicket} next={setModalTab} selectedTicket={ticketType} data={props} />
                )}
                {modalTab === 2 && (
                    <RefundPolicy data={props} />
                )}
                {modalTab === 3 && (
                    <PaymentMethod />
                )}
                {modalTab === 4 && (
                    <PaymentType data={props} ticketCount={numbOfTicket} currency={props?.currency} selectedCategory={ticketType?.ticketType} click={setModalTab} />
                )}
                {modalTab === 5 && (
                    <ViewTicket
                        user_index={user_index}
                        click={goback}
                        data={props} />
                )}
                {modalTab === 6 && (
                    <SelectTicketType ticket={productTypeData} setSelectedTicket={setTicketType} currency={props?.currency} click={setModalTab} />
                )}
                {modalTab === 7 && (
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={"24px"} color={"#121212"} lineHeight={"44.8px"} fontWeight={"500"} mt={"4"} >Ticket Purchase Successful</Text>
                        <Text fontSize={"12px"} color={"#626262"} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Congratulations! you can also find your ticket on the Chasescroll app, on the details page click on the view ticket button.`}</Text>
                        <CustomButton onClick={() => setModalTab(5)} color={"#FFF"} text='View Ticket' w={"full"} backgroundColor={"#3EC259"} />
                    </Flex>
                )}
            </ModalLayout>
        </>
    )
}

export default GetEventTicket;
