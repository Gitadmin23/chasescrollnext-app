import useAuth from '@/hooks/useAuth'
import { Flex, HStack, PinInput, PinInputField, Button, Text } from '@chakra-ui/react'
import email from 'next-auth/providers/email'
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

interface IProps {
    setOpen: (by: boolean) => void;
    setTab: (by: boolean) => void;
    setShowVerify: (by: boolean) => void;
    setShowMessage: (by: boolean) => void,
    index?: string,
    type?: "DONATION" | "EVENT" | "RENTAL" | "SERVICE" | "KIOSK" 
}

export default function VerifyForm({ setOpen, setShowVerify, setTab, setShowMessage, index, type }: IProps) {


    const { code, setCode, hanldeSubmit, verifySuccess, loadingVerify, email, sendingVerify, sendSuccess, sendVerify, initialTime, setInitialTime, startTimer, setStartTimer } = useAuth() 
    
    const pathname = usePathname()
    const query = useSearchParams(); 
    const param = useParams();
    const id = param?.slug

    const router = useRouter()

    const clickHandler = () => {
        hanldeSubmit()
    }

    useEffect(() => {
        if (verifySuccess) {
            if(type){
                router.push(`/share/auth/login?type=${type}&typeID=${index}`);
            } else if(pathname?.includes("event")){
                router.push(`/share/auth/login?type=EVENT&typeID=${index+(id ? "&affiliate="+id : "")}`);
            } else {
                setOpen(false)
                setTab(false)
                setShowVerify(false)
                setShowMessage(true)
            }
        }
    }, [verifySuccess])

    useEffect(() => {
        if (initialTime > 0) {
            setTimeout(() => {
                setInitialTime(initialTime - 1);
            }, 1000);
        }

        if (initialTime === 0 && startTimer) {
            console.log("done");
            setStartTimer(false); 
        }
    }, [initialTime, startTimer]); 

    return (
        <Flex overflowY={"auto"} alignItems={"center"} w={"full"} flexDir={"column"}  >
            <Text fontSize={["20px", "20px", "32px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"500"} >Email Verification Code</Text>
            <Text fontSize={"14px"} textAlign={"center"} mt={"4"} >Enter the 6_digit code we sent to your email <span style={{ fontWeight: "500" }} >{email}</span></Text>
            <HStack mt={"4"} >
                <PinInput size={"lg"} otp value={code} onChange={(e) => setCode(e)} >
                    <PinInputField rounded={"full"} w={["40px", "40px", "62px"]} h={["40px", "40px", "62px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "62px"]} h={["40px", "40px", "62px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "62px"]} h={["40px", "40px", "62px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "62px"]} h={["40px", "40px", "62px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "62px"]} h={["40px", "40px", "62px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "62px"]} h={["40px", "40px", "62px"]} />
                </PinInput>
            </HStack>
            {startTimer && (
                <Text fontSize={"14px"} mt={"4"} textAlign={"center"} mx={"auto"} >Waiting to resend OTP in <span style={{ fontWeight: "500" }} >{0} : {initialTime} secs</span></Text>
            )}
            {!startTimer && (
                <Flex justifyContent={"center"} w={"full"} >
                    <Button isDisabled={sendingVerify} isLoading={sendingVerify} bg={"transparent"} _hover={{backgroundColor: "transparent"}} color={"#233DF3"}  onClick={()=> sendVerify(email as string)}  >Resend</Button >
                </Flex>
            )}
            <Button onClick={() => clickHandler()} color={"white"} isLoading={loadingVerify} mt={"6"} isDisabled={loadingVerify} _disabled={{ backgroundColor: "#233DF380" }} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={["20px", "20px", "32px"]} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                <Text textAlign={"center"} fontWeight={"600"} >Verify</Text>
            </Button>
        </Flex>
    )
}
