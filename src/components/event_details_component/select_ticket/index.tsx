import CustomButton from '@/components/general/Button'
import CustomText from '@/components/general/Text'
import GoogleBtn from '@/components/sharedComponent/googlebtn'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import useModalStore from '@/global-state/useModalSwitch'
import { useDetails } from '@/global-state/useUserDetails'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Button, Flex, Text, useColorMode, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import React, { useEffect } from 'react'
import { LiaAngleDownSolid } from 'react-icons/lia'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    ticket: any,
    selectedticket: any
    currency: any,
    setCategory: any,
    data?: any
}

function SelectTicket(props: Props) {
    const {
        ticket,
        selectedticket,
        setCategory,
        currency,
        data
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const [showModal, setShowModal] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const token = sessionStorage.getItem('tp_token')
    const { userId: user_index } = useDetails((state) => state);

    const toast = useToast()

    const router = useRouter()

    const clickHandler = (item: any) => {
        if (token) {
            setCategory(item)
            setShowModal(false)
        } else {
            if (!user_index) {
                setOpen(true)
                setCategory(item)
                // router.push("/share/auth/?type=EVENT&typeID=" + data?.id)
            } else {
                setCategory(item)
                setShowModal(false)
            }
        }
    }

    useEffect(() => {
        setCategory({} as any)
    }, [])

    const tempFunc = () => {
        // toast({
        //     title: 'Infomation',
        //     description: 'Please sign-up with google',
        //     status: 'info',
        //     isClosable: true,
        //     duration: 5000,
        //     position: 'top-right',
        // });
        router.push("/share/auth/signup/?type=EVENT&typeID=" + data?.id)
    }

    return (
        <Flex gap={"3"} position={"relative"} alignItems={"center"} justifyContent={"end"} pl={"5"}  >
            <Flex onClick={() => setShowModal(true)} as={"button"} borderColor={"brand.chasescrollBlue"} rounded={"lg"} borderWidth={"1px"} height={"49px"} width={"full"} justifyContent={"center"} alignItems={"center"} >
                <Text fontSize={"sm"} color={colorMode === 'light' ? "brand.chasescrollBlue":bodyTextColor} >
                    {selectedticket?.ticketType ? selectedticket?.ticketType : "Select Ticket"}{" "}
                    {selectedticket?.ticketType ? formatNumber(selectedticket?.ticketPrice, currency === "USD" ? "$" : "₦") : ""}
                </Text>
            </Flex>
            <Box width={"fit-content"} >
                <Flex onClick={() => setShowModal(true)} as={"button"} width={"50px"} height={"49px"} rounded={"lg"} justifyContent={"center"} alignItems={"center"} borderColor={"brand.chasescrollBlue"} borderWidth={"1px"} >
                    <LiaAngleDownSolid />
                </Flex>
            </Box>
            {showModal && (
                <Box width={"full"} pl={"5"} borderWidth={"0px"} zIndex={"30"} top={"60px"} position={"absolute"} rounded={"lg"} >
                    <Flex gap={"3"} flexDirection={"column"} shadow={"lg"} width={"full"} borderColor={borderColor} padding={"4"} borderBottomWidth={"0px"} bg={secondaryBackgroundColor} rounded={"lg"}>
                        {ticket?.filter((item: any) => item?.ticketType)?.map((item: any, index: number) => {
                            return (
                                <Button isDisabled={item?.totalNumberOfTickets === item?.ticketsSold} key={index} onClick={() => clickHandler(item)} width={"full"} py={"14px"} borderBottomColor={"#D0D4EB"} rounded={"lg"} borderBottomWidth={"1px"} >
                                    {item?.totalNumberOfTickets === item?.ticketsSold ?
                                        "Sold Out" :
                                        item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                                    }
                                </Button>
                            )
                        })}
                    </Flex>
                </Box>
            )}
            {showModal && (
                <Box onClick={() => setShowModal(false)} bg={"black"} inset={"0px"} position={"fixed"} opacity={"0.25"} zIndex={"20"} />
            )}
            <ModalLayout open={open} close={setOpen} title='' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} >
                    <Text fontSize={"24px"} textAlign={"center"} fontWeight={"700"} lineHeight={"44.8px"} >Get Ticket</Text>
                    <Text color={"#62619.6px262"} textAlign={"center"} lineHeight={"22.4px"} >Please choose your option and proceed with Chasescroll.</Text>
                    <GoogleBtn title='Sign up ' id={data?.id} height='50px' border='1px solid #B6B6B6' bgColor='white' />
                    <Flex justifyContent={"center"} gap={"2px"} alignItems={"center"} >
                        <Text color={"#BCBCBC"} fontSize={"14px"} lineHeight={"19.6px"} >OR</Text>
                    </Flex>
                    {/* <CustomButton backgroundColor={"#EDEFFF"} color={"#5465E0"} fontWeight={"400"} onClick={() => router.push("/share/auth/login/?type=EVENT&typeID=" + data?.id)} text={"Get Temporary Account"} /> */}
                    <CustomButton backgroundColor={"#EDEFFF"} color={"#5465E0"} fontWeight={"400"} onClick={() => router.push("/share/auth/temporary-account/?type=EVENT&typeID=" + data?.id)} text={"Get Temporary Account"} />
                    <CustomButton backgroundColor={"#5D70F9"} color={"white"} onClick={() => tempFunc()} text={"Sign up"} />
                    <Flex>
                        <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                            Already have an account?
                        </CustomText>
                        <CustomText onClick={() => router.push("/share/auth/login/?type=EVENT&typeID=" + data?.id)} ml={"4px"} fontSize={'sm'} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} cursor='pointer'>Log in</CustomText>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}

export default SelectTicket
