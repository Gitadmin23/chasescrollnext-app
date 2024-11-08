import ModalLayout from "@/components/sharedComponent/modal_layout";
import { Box, Button, Flex, Text, useColorMode, useToast } from "@chakra-ui/react";
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
import { ImTicket } from "react-icons/im";
import { HiOutlineTicket } from "react-icons/hi";
import GoogleBtn from "../sharedComponent/googlebtn";
import SignupModal from "@/app/auth/component/signupModal";
import CustomText from "../general/Text";

function GetEventTicket(props: IEventType) {
    const {
        isBought,
        isFree,
        productTypeData,
        id
    } = props;

    const { primaryColor, borderColor } = useCustomTheme();
    const [openSignUp, setOpenSignUp] = useState(false)
    const [open, setOpen] = React.useState(false)
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
                // router.push("/share/auth/login?type=EVENT&typeID=" + id);
                setOpen(true)
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

    const signUpHandler = (item: boolean) => {
        setOpen(false)
        setOpenSignUp(item)
    } 

    return (
        <>

            <Flex w={"full"} display={[isBought ? "none" : "block", "block", "block", "block"]} >
                <CustomButton backgroundColor={"#233DF3"} borderRadius={"32px"} opacity={(!ticketType?.ticketType && !isBought && ticketType?.ticketType) ? "30%" : ""} my={"auto"} onClick={clickHandler} disable={((ticketType?.totalNumberOfTickets === ticketType?.ticketsSold) && !isBought && ticketType?.ticketType) ? true : (!ticketType?.ticketType || ticketType?.ticketType || isBought) ? false : true} text={(((ticketType?.totalNumberOfTickets === ticketType?.ticketsSold) && !isBought && ticketType?.ticketType) ? "Ticket Sold Out" : (isBought) ? "View Ticket" : isFree ? "Register" : "Check out ")} width={["full"]} height={"57px"} fontSize={"sm"} fontWeight={"semibold"} />
            </Flex> 
            {isBought &&
                <Flex w={"fit-content"} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} p={"2"} rounded={"13px"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} display={["flex", "none", "none", "none"]} gap={"1px"} >

                    <Flex onClick={clickHandler} as={"button"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} rounded={"13px"}  >
                        {/* <IoTicket size={"30px"} color={primaryColor} /> */}
                        <HiOutlineTicket size={"35px"} color={primaryColor} />
                    </Flex>
                    <Text fontSize={"12px"} >View Ticket</Text>
                </Flex>
            }

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

            <ModalLayout open={open} close={setOpen} title='' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} >
                    <Flex flexDir={"column"} justifyContent={"center"} >
                        <Text fontSize={"24px"} textAlign={"center"} fontWeight={"700"} lineHeight={"32px"} >Get Ticket</Text>
                        <Text color={"#626262"} textAlign={"center"}>Please choose your option and proceed with Chasescroll.</Text>
                    </Flex>
                    <GoogleBtn newbtn title='Sign in' id={props?.id ? true : false} index={props?.id} height='50px' border='1px solid #B6B6B6' bgColor='white' />
                    <Flex justifyContent={"center"} gap={"2px"} alignItems={"center"} >
                        <Text color={"#BCBCBC"} fontSize={"14px"} lineHeight={"19.6px"} >OR</Text>
                    </Flex>
                    <Button onClick={() => router.push("/share/auth/temporary-account/?type=EVENT&typeID=" + props?.id)} backgroundColor={"#EDEFFF"} color={"#5465E0"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#EDEFFF"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#EDEFFF" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Get Temporary Account</Text>
                    </Button>
                    <Button onClick={() => signUpHandler(true)} color={"white"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Sign up</Text>
                    </Button>
                    {/* <SignupModal index={props?.id} open={openSignUp} setOpen={signUpHandler} /> */}
                    <Flex>
                        <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                            Already have an account?
                        </CustomText>
                        <CustomText onClick={() => router.push("/share/auth/login/?type=EVENT&typeID=" + props?.id)} fontWeight={"700"} ml={"4px"} fontSize={'sm'} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} cursor='pointer'>Log in</CustomText>
                    </Flex>
                </Flex>
            </ModalLayout>
            {openSignUp && (
                <SignupModal hide={true} index={props?.id} open={openSignUp} setOpen={signUpHandler} />
            )}
        </>
    )
}

export default GetEventTicket;
