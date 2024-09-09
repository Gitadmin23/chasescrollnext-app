import CustomText from '@/components/general/Text'
import { URLS } from '@/services/urls'
import httpServiceGoogle from '@/utils/httpServiceGoogle'
import { Button, Image, Text, useColorMode, useToast } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { signIn, useSession, } from 'next-auth/react'
import { useDetails } from '@/global-state/useUserDetails'
import PageLoader from '../pageLoader'
import useModalStore from '@/global-state/useModalSwitch'
import useCustomTheme from '@/hooks/useTheme'
import { GoogleIcon } from '@/components/svg'

interface Props {
    title: string,
    fixedwidth?: string,
    height?: string,
    bgColor?: string,
    id?: boolean,
    index?: string,
    border?: string,
    newbtn?: boolean
}

function GoogleBtn(props: Props) {
    const {
        title,
        fixedwidth,
        height,
        bgColor,
        id,
        index,
        border,
        newbtn
    } = props

    const [checkData, setCheckData] = React.useState<any>({});
    const { data: sessionData, status } = useSession();
    const toast = useToast();
    const router = useRouter();
    const { email, setAll } = useDetails((state) => state);
    const { googlesign, setGoogle } = useModalStore((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme(); 

    const token: any = sessionData; 

    const handleGoogleSignIn = async () => {  
        await signIn('google'); 
    }

    useEffect(() => {
        if (status === "authenticated") {
            // Redirect to another page once authenticated
            signinWithGoogle.mutate(token.token?.token.token.idToken) 
        }
    }, [status, router]);

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
            setAll({
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                username: data?.data?.user_name,
                userId: data?.data?.user_id,
            })

            if (id) {
                router.push(`/dashboard/event/details/${index}`);
            } else {
                if (data?.data?.user_id && googlesign) {
                    router.push('/dashboard/event')
                }
            }
            setCheckData(data?.data)
        },
        onError: (error: any) => {
            console.log(error);
            setGoogle(false)

            toast({
                title: 'Erroor',
                description: 'An error occured, please try again',
                status: 'error',
            })
        }
    }) 

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

            <PageLoader show={token?.token?.token.token.idToken ? true : false} />
        </>
    )
}

export default GoogleBtn
