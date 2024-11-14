import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout';
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState';
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Button, Flex, VStack, useColorMode, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
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

    // const { image } = useEventStore((state) => state);
    const { data, image, updateDontion } = useDonationStore((state) => state);
    const { userId: user_index } = useDetails((state) => state);
    const pathname = usePathname();

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [stopData, setstopData] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<Array<string>>([])

    // const []
    const toast = useToast()

    const getValidationTheme = () => {
        data?.every((item) => {
            if (!item?.name) {
                toast({
                    description: "Please Enter Fund Raisier Name",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!item?.goal) {
                toast({
                    description: "Please Enter Fund Raisier Goal",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!item?.description) {
                toast({
                    description: "Please Enter Fund Raisier Description",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!item?.endDate) {
                toast({
                    description: "Please Enter End Date",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!getValidationImageBtn) {
                toast({
                    description: "Please Enter Fund Raisier Image",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                createFundraisingData()
            }
        })
    }


    const getValidationImage = () => {
        image?.every((item) => {
            if (!item) {
                toast({
                    description: "Please Enter Fund Raisier Image",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            }
        })
    }

    const getValidationThemeBtn = () => {
        return data?.every((item) => {
            if (!item?.name) {
                return true
            } else if (!item?.purpose) {
                return true
            } else if (!item?.description) {
                return true
            } else if (!item?.endDate) {
                return true
            } else if (!item?.goal) {
                return true
            }
            //  else if (!image?.name) {
            //     return true
            // } 
            else {
                return false
            }
        })
    }

    const getValidationImageBtn = () => {
        return image?.every((item) => {
            if (!item) {
                return true
            } else {
                return false
            }
        })
    }

    const getValidationAll = () => {
        return getValidationThemeBtn()
    }

    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: any) => httpService.post("/resource-api/upload/" + user_index, data,
            {
                headers: {
                    'Content-Type': image[0].type,
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
        onSuccess: async (newdata: any) => {
            const values: any = Object.values(newdata?.data);
            setUploadedImage(values)

            const clone = [...data]

            await values?.map((item: string, index: number) => {

                clone[index] = { ...clone[index], bannerImage: item }

            })

            updateDontion(clone)

            if (values?.length === 2) {
                await createGroupDonation.mutateAsync({
                    creatorID: data[0]?.creatorID,
                    name: data[0]?.name,
                    bannerImage: uploadedImage[0],
                    description: data[0].description
                })
            } else {
                let newObj: any = [...data]
                newObj[0] = { ...data[0], bannerImage: values[0] }
                createDonation.mutate({ items: newObj })
            }
        }
    });

    // Create Draft 
    const createGroupDonation = useMutation({
        mutationFn: (data: {
            creatorID: string,
            name: string,
            bannerImage: string,
            description: string
        }) => httpService.post("/fund-raiser-group/create", data),
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
        onSuccess: () => {
            // toast({
            //     title: 'Success',
            //     description: "Fund Raisier Created",
            //     status: 'success',
            //     isClosable: true,
            //     duration: 5000,
            //     position: 'top-right',
            // }); 
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
                description: "Fund Raisier Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            router?.push("/dashboard/donation")
        }
    });

    const handleClick = React.useCallback(() => {
        getValidationTheme()
    }, [uploadImage])

    const createFundraisingData = () => {
        const fd = new FormData();
        image?.map((item, index) => {
            fd.append("files[]", item);
        })
        uploadImage.mutate(fd)
    } 

    useEffect(() => {
        if (uploadedImage?.length > 0 && createGroupDonation?.isSuccess) {
            if (!stopData) {
                const clone = [...data] 
                data?.map((item, index) => {
                    clone[index] = { ...clone[index], fundRaiserGroupId: createGroupDonation?.data?.data?.id, bannerImage: uploadedImage[index] }
                })
                createDonation.mutate({ items: clone })
                setstopData(true)
            }
        }
    }, [uploadedImage, createGroupDonation])

    return (
        <Flex w={"full"} alignItems={"center"} justifyContent={"center"} fontSize={["md", "lg"]} fontWeight={"bold"} >

            <CustomButton borderWidth={"0px"} backgroundColor={(getValidationAll() || getValidationImageBtn()) ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={createDonation?.isLoading || uploadImage?.isLoading || createGroupDonation?.isLoading} onClick={handleClick} _disabled={{ cursor: "not-allowed" }} borderRadius={"999px"} width={"300px"}
                text={'Submit'} />

            <ModalLayout close={setOpen} open={open} bg={secondaryBackgroundColor} >
                <SuccessMessageCreateEvent update={(pathname?.includes("edit_event_data") || pathname?.includes("edit_event")) ? true : false} />
            </ModalLayout>
        </Flex>
    )
}

export default SubmitEvent
