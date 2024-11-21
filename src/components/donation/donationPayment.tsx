import usePaystackStore from '@/global-state/usePaystack'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import httpService from '@/utils/httpService'
import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

export default function DonationPayment({ data }: { data?: IDonationList }) {

    const [open, setOpen] = useState(false)

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

    const userId = localStorage.getItem('user_id')+"";

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

    const clickHandler = React.useCallback(() => {
        payForTicket.mutate({ 
            seller: userId,
            price: Number(value),
            currency: "NGN",
            orderType: "DONATION",
            typeID: data?.id+""
        })
    }, [data?.id, value])  

    return (
        <Flex w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]}  shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} p={"5"}  >
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
        </Flex>
    )
}
