import CustomText from '@/components/general/Text'
import { URLS } from '@/services/urls'
import httpServiceGoogle from '@/utils/httpServiceGoogle'
import { Button, Image, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useMutation } from 'react-query'
import { signIn, useSession, } from 'next-auth/react'
import { useDetails } from '@/global-state/useUserDetails'

interface Props { 
    title: string,
    fixedwidth?: string,
    height?: string,
    bgColor?: string,
    border?: string 
}

function GoogleBtn(props: Props) {
    const {
        title,
        fixedwidth,
        height,
        bgColor,
        border
    } = props

    const [checkData, setCheckData] = React.useState<any>({});
    const [showModal, setShowModal] = React.useState(false);
    const { data: sessionData } = useSession();
    const toast = useToast();
    const router = useRouter();
    const { setAll } = useDetails((state) => state);

    React.useEffect(() => {
        const token: any = sessionData;
        // console.log(token.token?.token.token.accessToken);
        if (sessionData !== null) {
            if (token.token?.token?.token?.idToken) {
                signinWithGoogle.mutate(token?.token?.token?.token?.idToken);
            }
        }

    }, [sessionData])

    const handleGoogleSignIn = async () => {
        const token: any = sessionData;
        if (token && token.token?.token.token.idToken) {
            signinWithGoogle.mutate(token.token?.token.token.idToken);
        } else {
            const dets = await signIn('google');
            setCheckData(true);
        }
    }

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
                description: 'Signup Successful',
                status: 'success',
                position: 'top-right'
            })
            localStorage.setItem('token', data?.data?.access_token);
            localStorage.setItem('refresh_token', data?.data?.refresh_token);
            localStorage.setItem('user_id', data?.data?.user_id);
            localStorage.setItem('expires_in', data?.data?.expires_in);
            setAll({
                firstName: data?.data?.firstName,
                lastName: data?.data?.firstName,
                username: data?.data?.user_name,
                userId: data?.data?.user_id,
            })
            router.push('/dashboard/event')
            setCheckData(data?.data)
        },
        onError: (error: any) => {
            console.log(error);
            toast({
                title: 'Erroor',
                description: 'An error occured, please try again',
                status: 'error',
            })
        }
    })

    return (

        <Button onClick={handleGoogleSignIn} width={['100%', fixedwidth ? fixedwidth : '100%']} height={height ? height : '40px'} borderRadius={'8px'} border={border} _hover={{backgroundColor: bgColor ? bgColor: "#1018280D"}} bg={bgColor ? bgColor : '#1018280D'} padding='8px 16px 8px 16px'>
            <Image alt='google' src='/assets/svg/googlelogo.svg' />
            <CustomText marginLeft={'20px'} fontFamily={'DM-Medium'} fontSize={'16px'} color='black' fontWeight={'700'}>{title} with Google</CustomText>
        </Button>
    )
}

export default GoogleBtn
