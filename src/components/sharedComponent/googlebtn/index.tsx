import CustomText from '@/components/general/Text'
import { URLS } from '@/services/urls'
import httpServiceGoogle from '@/utils/httpServiceGoogle'
import { Button, Checkbox, Flex, Image, Input, Text, useColorMode, useToast } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { signIn, useSession, } from 'next-auth/react'
import { useDetails } from '@/global-state/useUserDetails'
import PageLoader from '../pageLoader'
import useModalStore from '@/global-state/useModalSwitch'
import useCustomTheme from '@/hooks/useTheme'
import { GoogleIcon } from '@/components/svg'
import ModalLayout from '../modal_layout'
import { CustomInput } from '@/components/Form/CustomInput'
import useGetUser from '@/hooks/useGetUser'
import httpService from '@/utils/httpService'
import Link from 'next/link'
import { THEME } from '@/theme'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";

interface Props {
    title: string,
    fixedwidth?: string,
    height?: string,
    bgColor?: string,
    id?: boolean,
    index?: string,
    border?: string,
    newbtn?: boolean,
    type?: "DONATION"
    affiliate?: string
}

interface UserDetail {
    email: string;
    firstName: string;
    lastName: string;
    username?: string;
    phone?: string;
}
// +(data?.affiliateID? "&affiliate=true" : "")
function GoogleBtn(props: Props) {
    const {
        title,
        fixedwidth,
        height,
        bgColor,
        id,
        index,
        border,
        newbtn,
        type,
        affiliate,
    } = props

    const [checkData, setCheckData] = React.useState<UserDetail>({} as UserDetail);
    const { data: sessionData, status } = useSession();
    const toast = useToast();
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [terms, setTerms] = useState(false)
    const [tokenData, setTokenData] = useState("")
    const query = useSearchParams();
    const affiliateID = query?.get('affiliate');
    const [userNameCheck, setUserNameCheck] = useState("")

    const {
        primaryColor,
        borderColor,
        secondaryBackgroundColor,
        bodyTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const token: any = sessionData;

    const handleGoogleSignIn = async () => {
        await signIn('google');
    }

    useEffect(() => {
        if (status === "authenticated" && !user?.username) {
            // Redirect to another page once authenticate
            setTokenData(token.token?.token.token.idToken)
        }
    }, [status]);

    const { user } = useGetUser()

    console.log(tokenData);


    useEffect(() => {
        if (tokenData) {
            // Redirect to another page once authenticated
            signinWithGoogle.mutate(tokenData)
        }
    }, [tokenData]);


    const handleChangeName = (e: any, name: string) => {
        const value = e.target.value;

        // Regex pattern to only allow letters
        const regex = /^[a-zA-Z]*$/;
        if(name === "firstName"){
            if (regex.test(value)) { 
                setCheckData({ ...checkData, firstName: e.target?.value })
            }
        } else if(name === "lastName"){
            if (regex.test(value)) { 
                setCheckData({ ...checkData, lastName: e.target?.value })
            }
        }
    };

    useEffect(() => {
        if (tokenData && user?.email) {
            if (user?.username === user?.email || !user?.data?.mobilePhone?.value) {

                if (!checkData?.email) {
                    setCheckData({
                        email: user?.email,
                        firstName: "",
                        lastName: "",
                    })
                }
                setOpen(true)
            } else {
                if (index) {
                    if (type === "DONATION") {
                        router.push(`/dashboard/donation/${index}`);
                    } else {
                        router.push(`/dashboard/event/details/${affiliateID ? affiliate : index}${affiliateID ? "?type=affiliate" : ""}`);
                    }
                } else {
                    router.push('/dashboard/event')
                }
            }
        }
    }, [user]);

    const signinWithGoogle = useMutation({

        mutationFn: (data: string) => httpServiceGoogle.get(`${URLS.SIGN_IN_WTIH_CREDENTIALS}`, {
            headers: {
                Authorization: `Bearer ${data}`,
            }
        }),
        onSuccess: (data) => {
            //console.log(data.data); 
            localStorage.setItem('token', data?.data?.access_token);
            toast({
                title: 'Success',
                description: 'Google Signin Successful',
                status: 'success',
                position: 'top-right'
            })
            localStorage.setItem('token', data?.data?.access_token);
            localStorage.setItem('refresh_token', data?.data?.refresh_token);
            localStorage.setItem('user_id', data?.data?.user_id);
            localStorage.setItem('expires_in', data?.data?.expires_in);

            // if(data?.data?.user_name ===)
            console.log(data?.data);
            if (index) {
                if (type === "DONATION") {
                    router.push(`/dashboard/donation/${index}`);
                } else {
                    router.push(`/dashboard/event/details/${affiliateID ? affiliate : index}${affiliateID ? "?type=affiliate" : ""}`);
                }
            } else {
                router.push('/dashboard/event')
            }

            // setCheckData(data?.data)
        },
        onError: (error: any) => {
            console.log("error");
        }
    })

    const checkUserName = useMutation({
        mutationFn: () => httpService.get(`/auth/username-check`, {
            params: {
                username: checkData?.username
            }
        }),
        onSuccess: (data) => {
            setUserNameCheck(data?.data?.message);
        },
        onError: (error: any) => {

        }
    })


    const editProfile = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.UPDATE_PROFILE}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Profile Updated',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 2000,
            });
            if (index) {
                if (type === "DONATION") {
                    router.push(`/dashboard/donation/${index}`);
                } else {
                    router.push(`/dashboard/event/details/${affiliate ? affiliate : index}?type=affiliate`);
                }
            } else {
                router.push('/dashboard/event')
            }
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 2000,
            });
        }
    })

    useEffect(() => {
        if ((checkData?.username + "")?.length >= 2) {
            checkUserName?.mutate()
        } else {
            setUserNameCheck("")
        }
    }, [checkData?.username])

    const closeHandler = () => {

    }

    const submitHandler = () => {

        const data = {
            email: checkData?.email,
            firstName: checkData?.firstName,
            lastName: checkData?.lastName,
            username: checkData?.username,
            "data": {
                mobilePhone: {
                    objectPublic: true,
                    value: checkData?.phone,
                }
            }
        }
        editProfile?.mutate(data)
    }

    return (
        <>
            {newbtn && (
                <Button onClick={handleGoogleSignIn} as={"button"} mt={"4"} h={"50px"} w={"full"} bgColor={"#F7F7F7"} rounded={"32px"} gap={"3"} justifyContent={"center"} alignItems={"center"} >
                    <GoogleIcon />
                    <Text fontSize={"14px"} color={"#111111"} textAlign={"center"} fontWeight={"500"} >{title ? title : "Signup"} with Google</Text>
                </Button>
            )}
            {!newbtn && (
                <Button onClick={handleGoogleSignIn} width={['100%', fixedwidth ? fixedwidth : '100%']} height={height ? height : '40px'} borderRadius={'8px'} border={border} _hover={{ backgroundColor: bgColor ? bgColor : "#1018280D" }} bg={bgColor ? bgColor : '#1018280D'} padding='8px 16px 8px 16px'>
                    <Image alt='google' src='/assets/svg/googlelogo.svg' />
                    <CustomText marginLeft={'20px'} fontFamily={'DM-Medium'} fontSize={'16px'} color={'grey'} fontWeight={'700'}>{title ? title : "Signup"} with Google</CustomText>
                </Button>
            )}

            <ModalLayout open={open} close={closeHandler} closeIcon={false} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"5"} >
                    <Text textAlign={"center"} fontWeight={"700"} fontSize={"24px"} >Set Up Account Information</Text>
                    <Flex gap={"4"} width={"full"} mt={"3"} >
                        <Flex flexDir={"column"} gap={"1"} w={"full"} >
                            <Text color={"#1F1F1F"} ml={"1"} >First Name</Text>
                            <Input
                                width={'100%'}
                                onChange={(e) => handleChangeName(e, "firstName")}
                                placeholder={'FirstName'}
                                value={checkData?.firstName}
                                fontFamily={'Satoshi-Light'}
                                height={"45px"}
                                rounded={"32px"}
                                // color={textColor ?? 'black'}
                                bgColor={'transparent'}
                                
                            />
                        </Flex>
                        <Flex flexDir={"column"} gap={"1"} w={"full"} >
                            <Text color={"#1F1F1F"} ml={"1"} >Last Name</Text>
                            <Input
                                width={'100%'}
                                onChange={(e) => handleChangeName(e, "lastName")}
                                placeholder={'LastName'}
                                value={checkData?.lastName}
                                fontFamily={'Satoshi-Light'}
                                height={"45px"}
                                rounded={"32px"}
                                // color={textColor ?? 'black'}
                                bgColor={'transparent'}
                            />
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >User Name</Text>
                        <Input
                            width={'100%'}
                            onChange={(e) => setCheckData({ ...checkData, username: e.target?.value })}
                            placeholder={'UserName'}
                            value={checkData?.username}
                            fontFamily={'Satoshi-Light'}
                            height={"45px"}
                            rounded={"32px"}
                            // color={textColor ?? 'black'}
                            bgColor={'transparent'}
                        />
                        {userNameCheck && (
                            <Text color={userNameCheck?.includes("exists") ? "red" : primaryColor} fontSize={"14px"} fontWeight={"600"} >{userNameCheck}</Text>
                        )}
                    </Flex>

                    <Flex flexDir={"column"} gap={"1"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Phone Number</Text>
                        <PhoneInput
                            country={'us'}
                            enableSearch
                            // style={{ width: '100%', height: '45px', borderWidth: '1px', borderRadius: '5px', borderColor: 'lightgrey', padding: '10px' }}
                            containerStyle={{ width: '100%', height: '45px', }}
                            inputStyle={{ width: "100%", height: "45px", borderWidth: '1px', borderColor: borderColor, background: mainBackgroundColor, borderRadius: "999px" }}
                            dropdownStyle={{ backgroundColor: mainBackgroundColor }}
                            searchStyle={{ background: secondaryBackgroundColor }}
                            buttonStyle={{ color: bodyTextColor }}
                            value={checkData?.phone}
                            onChange={(phone: any) => setCheckData({ ...checkData, phone: phone })}
                        />
                        {/* <CustomInput name='mobilePhone' isPassword={false} type='text' placeholder='' /> */}
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
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
                            <Link target="_blank" href={"/home/terms"}>
                                <span style={{ color: THEME.COLORS.chasescrollBlue }}>
                                    {" "}
                                    terms of service{" "}
                                </span>
                            </Link>
                            as well as the{" "}
                            <Link target="_blank" href={"/home/privacy"}>
                                <span style={{ color: THEME.COLORS.chasescrollBlue }}>
                                    {" "}
                                    privacy policy{" "}
                                </span>
                            </Link>
                        </CustomText>
                    </Flex>
                    <Button type="button" color={"white"} isLoading={editProfile?.isLoading} isDisabled={editProfile?.isLoading || (terms === true ? false : true) || !checkData?.username || userNameCheck?.includes("exists") || !checkData?.firstName || !checkData?.lastName || !checkData?.phone} onClick={submitHandler} mt={"4"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Save</Text>
                    </Button>
                </Flex>
            </ModalLayout>
            <PageLoader show={token?.token?.token.token.idToken ? true : false} />
        </>
    )
}

export default GoogleBtn

