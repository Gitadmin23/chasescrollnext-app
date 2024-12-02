import { CustomInput } from '@/components/Form/CustomInput'
import useAuth from '@/hooks/useAuth'
import { Button, Checkbox, Flex, HStack, Input, Link, Select, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { DropdownDate } from 'react-dropdown-date'
import YearDatePicker from './DatePicker/yearDatePicker'
import MonthDatePicker from './DatePicker/monthDatePicker'
import DayDatePicker from './DatePicker/dayDatePicker'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'

interface IProps {
    tab: boolean,
    setTab: (by: boolean) => void,
    setShowVerify: (by: boolean) => void
}

export default function SignForm({ tab, setTab, setShowVerify }: IProps) {

    const toast = useToast()
    const { signupForm, signupLoading, formatDate, year, monthNumber, day, signupValue, dob, setPhone, phone, signupSuccess, terms, setTerms } = useAuth()

    const clickHandler = () => {
        if (signupValue?.firstName && signupValue?.lastName && signupValue?.email && dob) {
            setTab(true)
        } else {
            toast({
                title: "Attention!",
                description: "You must fillin the form to continue",
                status: "warning",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        }
    }

    useEffect(() => {
        if (signupSuccess) {
            setShowVerify(true)
        }
    }, [signupSuccess]) 

    return signupForm(
        <Flex w={"full"} justifyContent={"center"} >
            {!tab && (
                <Flex overflowY={"auto"} alignItems={"center"} maxW={"375px"} w={"full"} flexDir={"column"}  >
                    <Text fontSize={["20px", "20px", "32px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"500"} >Create your account</Text>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >First Name</Text>
                        <CustomInput
                            newbtn={true}
                            name="firstName"
                            isPassword={false}
                            type="text"
                            placeholder="Enter your First Name"
                            value={signupValue?.firstName}
                        />
                        {/* <Input borderWidth={"1px"} placeholder='First Name' _placeholder={{ color: "#C0C0C0" }} height={"48px"} borderColor={"#EAEBED"} bgColor={"#F5F5F5CC"} w={"full"} rounded={"32px"} fontWeight={"400"} /> */}
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Last Name</Text>
                        <CustomInput
                            newbtn={true}
                            name="lastName"
                            isPassword={false}
                            type="text"
                            placeholder="Enter your Last Name"
                            value={signupValue?.lastName}
                        />
                        {/* <Input borderWidth={"1px"} placeholder='Last Name' _placeholder={{ color: "#C0C0C0" }} height={"48px"} borderColor={"#EAEBED"} bgColor={"#F5F5F5CC"} w={"full"} rounded={"32px"} fontWeight={"400"} /> */}
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Email</Text>
                        <CustomInput
                            newbtn={true}
                            name="email"
                            isPassword={false}
                            type="email"
                            placeholder='Enter your Email'
                        />
                        {/* <Input borderWidth={"1px"} placeholder='Email' _placeholder={{ color: "#C0C0C0" }} height={"48px"} borderColor={"#EAEBED"} bgColor={"#F5F5F5CC"} w={"full"} rounded={"32px"} fontWeight={"400"} /> */}
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Date of birth</Text>
                        <Text fontSize={"12px"} lineHeight={"19px"} color={"#626262"} >This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Text>
                        <Flex w={"full"} gap={"3"} mt={"3"} >
                            <YearDatePicker formatDate={formatDate} year={year} />
                            <MonthDatePicker formatDate={formatDate} month={monthNumber} />
                            <DayDatePicker day={day} formatDate={formatDate} month={Number(monthNumber)} year={Number(year)} />
                        </Flex>
                    </Flex>
                    <Button opacity={signupValue?.firstName && signupValue?.lastName && signupValue?.email && dob ? "" : "20%"} type='button' onClick={() => clickHandler()} mt={"6"} isDisabled={false} _disabled={{ backgroundColor: "#233DF380" }} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={["32px", "32px", "32px"]} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text color={"white"} textAlign={"center"} fontWeight={"600"} >Next</Text>
                    </Button>
                </Flex>
            )}
            {tab && (
                <Flex overflowY={"auto"} alignItems={"center"} maxW={"375px"} w={"full"} flexDir={"column"}  >
                    <Text fontSize={["20px", "20px", "32px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"500"} >Finish signing up</Text>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Username</Text>
                        <CustomInput
                            newbtn={true}
                            name="username"
                            isPassword={false}
                            type="text"
                            placeholder="Enter your Username"
                        />
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        {/* <Text color={"#1F1F1F"} ml={"1"} >Phone Number</Text> */}
                        <PhoneInput
                            country={"us"}
                            enableSearch
                            // style={{ width: '100%', height: '45px', borderWidth: '1px', borderRadius: '5px', borderColor: 'lightgrey', padding: '10px' }}
                            containerStyle={{ width: "100%", height: "45px", borderRadius: "32px" }}
                            inputStyle={{
                                width: "100%",
                                height: "45px",
                                borderWidth: "1px",
                                borderColor: "lightgrey",
                                color: 'black',
                                borderRadius: "32px"
                            }}
                            value={phone}
                            onChange={(phone: any) => setPhone(phone)}
                        />
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Password</Text>
                        <CustomInput
                            newbtn={true}
                            name="password"
                            isPassword
                            type="password"
                            placeholder="*********"
                        />
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Confirm Password</Text>
                        <CustomInput
                            newbtn={true}
                            name="confirmPassword"
                            isPassword={true}
                            type="password"
                            placeholder="*********"
                        />
                    </Flex>

                    <HStack
                        justifyContent={"flex-start"}
                        spacing={3}
                        width="100%"
                        marginY="20px"
                    >
                        <Checkbox
                            colorScheme="blue"
                            size="md"
                            isChecked={terms}
                            onChange={() => setTerms((prev) => !prev)}
                        />

                        <CustomText
                            fontSize={"xs"}
                            fontFamily={"Satoshi-Regular"}
                            marginLeft="0px"
                            color='black'
                        >
                            I accept the
                            <Link href={"/home/terms"}>
                                <span style={{ color: THEME.COLORS.chasescrollBlue }}>
                                    {" "}
                                    terms of service{" "}
                                </span>
                            </Link>
                            as well as the{" "}
                            <Link href={"/home/privacy"}>
                                <span style={{ color: THEME.COLORS.chasescrollBlue }}>
                                    {" "}
                                    privacy policy{" "}
                                </span>
                            </Link>
                        </CustomText>
                    </HStack>
                    <Button type='submit' isLoading={signupLoading} mt={"6"} isDisabled={!terms} _disabled={{ backgroundColor: "#233DF380" }} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={["32px", "32px", "32px"]} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text color={"white"} textAlign={"center"} fontWeight={"600"} >Finish</Text>
                    </Button>
                </Flex>
            )}
        </Flex>
    )
}