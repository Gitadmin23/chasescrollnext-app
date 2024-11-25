import SignupModal from '@/app/auth/component/signupModal'
import usePaystackStore from '@/global-state/usePaystack'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import httpService from '@/utils/httpService'
import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react'
import router from 'next/router'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import CustomText from '../general/Text'
import GoogleBtn from '../sharedComponent/googlebtn'
import ModalLayout from '../sharedComponent/modal_layout'
import { useDetails } from '@/global-state/useUserDetails'

export default function DonationPayment({ data }: { data?: IDonationList }) {

    const [open, setOpen] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false) 

    const [value, setValue] = useState("")

    const {
        primaryColor,
        borderColor,
        headerTextColor
    } = useCustomTheme()

    const donate = [
        "NGN 1000",
        "NGN 1500",
        "NGN 2000",
        "NGN 5000",
        "NGN 10000",
        "NGN 15000",
    ]

    const toast = useToast()
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const userId = localStorage.getItem('user_id') + "";
    const { userId: user_index } = useDetails((state) => state);

    const { setPaystackConfig, setDonation } = usePaystackStore((state) => state);

    const payForTicket = useMutation({
        mutationFn: (data: {
            seller: string,
            price: number,
            currency: string,
            orderType: "DONATION",
            typeID: string
        }) => httpService.post(`/payments/createCustomOrder`, data),
        onSuccess: (data: any) => {
            setPaystackConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
            setDonation(true)
            setOpen(false)
            setValue("")

            console.log(data);

        },
        onError: (error) => {
            // console.log(error);
            toast({
                title: 'Error',
                description: "Error occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const clickHandler = () => {
        if(user_index) {
            payForTicket.mutate({
                seller: userId,
                price: Number(value),
                currency: "NGN",
                orderType: "DONATION",
                typeID: data?.id + ""
            })
        } else {
            setOpen(true)
        }
    }

    const signUpHandler = (item: boolean) => {
        setOpen(false)
        setOpenSignUp(item)
    }

    return (
        <Flex w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} p={"5"}  >
            <Text fontSize={"18px"} fontWeight={"600"} >Enter the Amount</Text>

            <Flex w={"fit-content"} flexWrap={"wrap"} gap={"2"}>
                {donate?.map((item) => (
                    <Flex key={item} as={"button"} onClick={() => setValue(item?.replace("NGN ", ""))} rounded={"32px"} h={"25px"} w={"80px"} borderWidth={"2px"} justifyContent={"center"} alignItems={"center"} color={item.replace("NGN ", "") === value ? primaryColor : headerTextColor} borderColor={item.replace("NGN ", "") === value ? primaryColor : borderColor} fontSize={"12px"} fontWeight={"600"}  >
                        {item}
                    </Flex>
                ))}
            </Flex>
            <Flex w={"full"} h={"50px"} pos={"relative"} >
                <Input value={value} placeholder='0' onChange={(e) => setValue(e.target.value)} w={"full"} h={"50px"} rounded={"32px"} pl={"8"} borderColor={borderColor} type='number' borderWidth={"1px"} />
                <Flex w={"fit-content"} h={"50px"} pos={"absolute"} justifyContent={"center"} alignItems={"center"} px={"4"} >
                    ₦
                </Flex>
            </Flex>
            <Button isLoading={payForTicket?.isLoading} onClick={clickHandler} borderWidth={"1px"} borderColor={primaryColor} isDisabled={value ? false : true} w={"full"} h={"50px"} rounded={"32px"} color={primaryColor} fontWeight={"600"} bgColor={"#EFF5F8"} _hover={{ backgroundColor: "#EFF5F8" }} >
                Donate
            </Button>

            <ModalLayout open={open} close={setOpen} title='' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} >
                    <Flex flexDir={"column"} justifyContent={"center"} >
                        <Text fontSize={"24px"} textAlign={"center"} fontWeight={"700"} lineHeight={"32px"} >Get Ticket</Text>
                        <Text color={"#626262"} textAlign={"center"}>Please choose your option and proceed with Chasescroll.</Text>
                    </Flex>
                    <GoogleBtn newbtn title='Sign in' type="DONATION" id={data?.id ? true : false} index={data?.id} height='50px' border='1px solid #B6B6B6' bgColor='white' />
                    <Flex justifyContent={"center"} gap={"2px"} alignItems={"center"} >
                        <Text color={"#BCBCBC"} fontSize={"14px"} lineHeight={"19.6px"} >OR</Text>
                    </Flex>
                    <Button onClick={() => router.push("/share/auth/temporary-account/?type=EVENT&typeID=" + data?.id)} backgroundColor={"#EDEFFF"} color={"#5465E0"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#EDEFFF"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#EDEFFF" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Get Temporary Account</Text>
                    </Button>
                    <Button onClick={() => signUpHandler(true)} color={"white"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Sign up</Text>
                    </Button>
                    {/* <SignupModal index={data?.id} open={openSignUp} setOpen={signUpHandler} /> */}
                    <Flex>
                        <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                            Already have an account?
                        </CustomText>
                        <CustomText onClick={() => router.push("/share/auth/login/?type=DONATION&typeID=" + data?.id)} fontWeight={"700"} ml={"4px"} fontSize={'sm'} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} cursor='pointer'>Log in</CustomText>
                    </Flex>
                </Flex>
            </ModalLayout>
            {openSignUp && (
                <SignupModal hide={true} index={data?.id} open={openSignUp} setOpen={signUpHandler} />
            )}
        </Flex>
    )
}
