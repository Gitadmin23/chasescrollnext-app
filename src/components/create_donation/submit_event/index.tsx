import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout';
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState';
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Button, Flex, VStack, useColorMode, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import SuccessMessageCreateEvent from '../success_message';
import { IUser } from '@/models/User';
import useCustomTheme from "@/hooks/useTheme";
import CustomText from '@/components/general/Text';
import { Warning2 } from 'iconsax-react';
import useDonationStore from '@/global-state/useDonationState';

interface Iprops {
    type?: any,
    promotion?: boolean,
}

function SubmitEvent(props: Iprops) {

    const {
        type,
        promotion,
    } = props

    const { 
        secondaryBackgroundColor, 
    } = useCustomTheme(); 

    const { image } = useEventStore((state) => state);
    const { data } = useDonationStore((state) => state);
    const { userId: user_index } = useDetails((state) => state); 
    const pathname = usePathname();

    const [open, setOpen] = useState(false) 

    // const []
    const toast = useToast()

    const getValidationTheme = () => {
        if (!data?.name) {
            toast({
                description: "Please Enter Donation Name",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!data?.goal) {
            toast({
                description: "Please Enter Donation Goal",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!data?.description) {
            toast({
                description: "Please Enter Donation Description",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!data?.endDate) {
            toast({
                description: "Please Enter End Date",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!image) {
            toast({
                description: "Please Enter Donation Image",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else {
            const fd = new FormData();
            fd.append("file", image);
            uploadImage.mutate(fd)
        }
    }

    const getValidationThemeBtn = () => {
        if (!data?.name) {
            return true
        } else if (!data?.purpose) {
            return true
        } else if (!data?.description) {
            return true
        }else if (!data?.endDate) {
            return true
        } else if (!data?.goal) {
            return true
        } else if (!image?.name) {
            return true
        } else {
            return false
        }
    }
    
    console.log(data);
    
    

    const getValidationAll = () => {
        return getValidationThemeBtn()
    }

    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.UPLOAD_IMAGE + "/" + user_index, data,
            {
                headers: {
                    'Content-Type': image.type,
                }
            }),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (newdata: any) => {
            let newObj: any = { ...data, bannerImage: newdata?.data?.fileName}
            createDonation.mutate(newObj)
        }
    });

    // Create Draft 
    const createDonation = useMutation({
        mutationFn: (data: any) => httpService.post("/fund-raiser/create", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: "Donation Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    const handleClick = React.useCallback(() => {
        getValidationTheme()
    }, [uploadImage])

    return (
        <Flex w={"full"} alignItems={"center"} justifyContent={"center"} fontSize={["md", "lg"]} fontWeight={"bold"} >

            <CustomButton borderWidth={"0px"} backgroundColor={getValidationAll() ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={uploadImage?.isLoading || createDonation?.isLoading} onClick={handleClick} _disabled={{ cursor: "not-allowed" }} borderRadius={"999px"} width={"300px"}
                text={'Submit'} />

            <ModalLayout close={setOpen} open={open} bg={secondaryBackgroundColor} >
                <SuccessMessageCreateEvent update={(pathname?.includes("edit_event_data") || pathname?.includes("edit_event")) ? true : false} />
            </ModalLayout>
        </Flex>
    )
}

export default SubmitEvent
