import ModalLayout from "@/components/sharedComponent/modal_layout";
import { Box, Button, Flex, Text, useColorMode, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { SuccessIcon } from "@/components/svg";
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from "@/models/Event";
import { ImTicket } from "react-icons/im";
import { HiOutlineTicket } from "react-icons/hi";
import GoogleBtn from "../sharedComponent/googlebtn";
import SignupModal from "@/app/auth/component/signupModal";
import CustomText from "../general/Text";

interface IProps {
    data: IEventType
    open: boolean,
    setOpen: any
}

function GetEventTicket(props: IProps) {
    const {
        data,
        setOpen,
        open
    } = props;

    const { primaryColor, borderColor } = useCustomTheme();
    const [openSignUp, setOpenSignUp] = useState(false) 
    const query = useSearchParams();
    const affiliate = query?.get('affiliate'); 
    const type = query?.get('open');
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
        if (data?.isBought) {
            setModalTab(data?.isBought ? 5 : 1);
            setShowModal(true);
        } else if (!ticketType?.ticketType) {
            toast({
                status: "error",
                title: "Please Select Ticket Type",
                position: "top-right",
            });
        } else {
            if (token) {
                setModalTab(data?.isBought ? 5 : 1);
                setShowModal(true);
            } else if (!user_index) {
                if (affiliate) {
                    router.push("/event/" + data?.affiliateID + "?type=affiliate&open=true")
                } else {
                    router.push("/event/" + data?.id + "?open=true")
                } 
                // router.push("/share/auth/login?type=EVENT&typeID=" + id);
                setOpen(true)
            } else {
                setModalTab(data?.isBought ? 5 : 1);
                setShowModal(true);
            }
        }
    }; 

    const goback = () => {
        if (showModal) {
            setShowModal(false)
        } else {
            setShowModal(true)
        }
        setModalTab(4)
    }

    const signUpHandler = (item: boolean) => {
        setOpen(false)
        setOpenSignUp(item)
    }  

    return (
        <> 
            <Flex w={"full"} display={[data?.isBought ? "block" : "block", "block", "block", "block"]} >
                <CustomButton backgroundColor={"#233DF3"} borderRadius={"32px"} opacity={(!ticketType?.ticketType && !data?.isBought && ticketType?.ticketType) ? "30%" : ""} my={"auto"} onClick={clickHandler} disable={(((ticketType?.totalNumberOfTickets === ticketType?.ticketsSold) && !data?.isBought && ticketType?.ticketType)) ? true : (ticketType?.ticketType || data?.isBought) ? false : true} text={(((ticketType?.totalNumberOfTickets === ticketType?.ticketsSold) && !data?.isBought && ticketType?.ticketType) ? "Ticket Sold Out" : (data?.isBought) ? "View Ticket" : data?.isFree ? "Register" : "Check out ")} width={["full"]} height={["37px", " 37px", "57px"]} fontSize={"sm"} fontWeight={"semibold"} />
            </Flex>  
            <ModalLayout size={modalTab === 5 ? ["full", "md", "3xl"] : "md"} title={modalTab === 6 ? "Ticket available for this event" : ""} open={showModal} close={setShowModal} >
                {modalTab === 1 && (
                    <SelectTicketNumber close={setShowModal} numbOfTicket={numbOfTicket} setNumberOfTicket={setNumberOfTicket} next={setModalTab} selectedTicket={ticketType} data={data} />
                )}
                {modalTab === 2 && (
                    <RefundPolicy data={props} />
                )}
                {modalTab === 3 && (
                    <PaymentMethod />
                )}
                {modalTab === 4 && (
                    <PaymentType data={data} ticketCount={numbOfTicket} currency={data?.currency} selectedCategory={ticketType?.ticketType} click={setModalTab} />
                )}
                {modalTab === 5 && (
                    <ViewTicket
                        user_index={user_index}
                        click={goback}
                        data={props} />
                )}
                {modalTab === 6 && (
                    <SelectTicketType ticket={data?.productTypeData} setSelectedTicket={setTicketType} currency={data?.currency} click={setModalTab} />
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
