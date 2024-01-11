'use client';
import { Box, Button, Checkbox, HStack, Select, Spinner, Switch, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { ArrowLeft2, ArrowRight2, Camera } from 'iconsax-react'
import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { useForm } from '@/hooks/useForm'
import { editPersonalInfoSchema, editProfileSchema } from '@/services/validations'
import { CustomInput } from '@/components/Form/CustomInput'
import { useDetails } from '@/global-state/useUserDetails';
import { IUser } from '@/models/User';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { CustomSelect } from '@/components/Form/CustomSelect';
import { useRouter } from 'next/navigation'


function EditProfile() {

    const [user, setUser] = React.useState<IUser | null>(null);
    const [showEmail, setShowEmail] = React.useState(false);
    const { userId, firstName, lastName, username } = useDetails((state) => state);

    const toast = useToast();
    const router = useRouter();


    const { renderForm, setValue, formState: { isDirty, } } = useForm({
        defaultValues: {
            mobilePhone: user?.data?.mobilePhone?.value,
            gender: user?.data.gender,
            dob: user?.dob,
            email: user?.email
        },
        validationSchema: editPersonalInfoSchema,
        submit: (data: {
            gender: string,
            dob: string,
            mobilePhone: string
        }) => {
            if (isLoading) {
                return;
            }
            else {
                const dataOb = {
                    dob: data.dob,
                    "showEmail": showEmail,
                    "data": {
                        gender: {
                            objectPublic: true,
                            value: data.gender,
                        },
                        mobilePhone: {
                            objectPublic: true,
                            value: data.mobilePhone,
                        }
                    }
                }
                editProfile.mutate(dataOb);
            }
        },
    });

    const { isLoading, isError } = useQuery(['getUserPersonalDetails', userId], () => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`), {
        onSuccess: (data) => {
            setUser(data.data);
            setValue('dob', data?.data?.dob);
            setValue('gender', data?.data?.data.gender.value);
            setValue('mobilePhone', data?.data?.data?.mobilePhone.value);
            setValue('email', data?.data?.email);
            setShowEmail(data?.data.showEmail);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
    });

    const editProfile = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.UPDATE_PROFILE}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Your profile has been updated',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        }
    })
    if (isLoading) {
        return (
            <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                <Spinner />
                <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>Loading Details</CustomText>
            </VStack>
        )
    }
    return renderForm(
        <VStack width={'100%'} height={'100%s'}>
            <input hidden type='file' accept='image/*' />
            <Box overflowY='auto' width={['100%', '100%']} height={'100%'} paddingY='20px' paddingX={['20px', '0px']}>

                <VStack width='100%' height='100%' alignItems={'center'}>


                    <VStack width={['100%', '30%']} height='100%'>


                {/* HEADER */}
                <HStack width={'100%'} height={'50px'} justifyContent={'space-between'}>
                    <ArrowLeft2 size={'30px'} color='black' onClick={() => router.back()} />
                    <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>Edit Personal Information</CustomText>
                    <Box></Box>
                </HStack>


                <VStack width={'100%'} height={'100%'} alignItems={'center'} spacing={6}>

                    <VStack mt={"6"} alignItems={'flex-start'} width={'100%'} spacing={0}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Email</CustomText>
                        <CustomInput name='email' isPassword={false} type='text' placeholder='' />
                    </VStack>

                    <HStack width={'100%'} justifyContent={'space-between'}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'12px'} color='brand.chasescrollButtonBlue'>Show Email</CustomText>
                        <Switch isChecked={showEmail} onChange={() => setShowEmail(prev => !prev)} />
                    </HStack>

                    <VStack alignItems={'flex-start'} width={'100%'} spacing={0}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Phone</CustomText>
                        <CustomInput name='mobilePhone' isPassword={false} type='text' placeholder='' />
                    </VStack>


                    <VStack alignItems={'flex-start'} width={'100%'} spacing={0}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Gender</CustomText>
                        <CustomSelect name='gender' option={['Male', 'Female']} isPassword={false} type='text' placeholder='' />
                    </VStack>

                    <VStack alignItems={'flex-start'} width={'100%'} spacing={0}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Date of birth</CustomText>
                        <CustomInput name='dob' isPassword={false} type='date' placeholder='' />
                    </VStack>

                    <Button type='submit' isLoading={editProfile.isLoading} borderWidth={'0px'} variant={'outline'} width='99%' outlineColor={'brand.chasescrollButtonBlue'} color='brand.chasescrollButtonBlue'>Save Changes</Button>


                </VStack>

                    </VStack>

                </VStack>

            </Box>
        </VStack>
    )
}

export default EditProfile