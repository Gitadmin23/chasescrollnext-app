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
import AWSHook from '@/hooks/awsHook';

interface Iprops {
    id?: string
    type?: any,
    promotion?: boolean,
}

function SubmitEvent(props: Iprops) {

    const {
        id,
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

    const { fileUploadHandler, loading, uploadedFile, reset, deleteFile } = AWSHook();

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<Array<string>>([])

    const [payload, setPayload] = useState([] as any)

    // const []
    const toast = useToast()
    const getValidationTheme = () => {
        payload.every((item: any) => {
            if (!item?.name) {
                toast({
                    description: "Please Enter Fundraising Name",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("name");

                return
            } else if (!item?.description) {
                toast({
                    description: "Please Enter Fundraising Description",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("des");
                return
            } else if (!item?.purpose) {
                toast({
                    description: "Please Enter Fundraising Purpose",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("purpose");
                return
            } else if (!item?.goal) {
                toast({
                    description: "Please Enter Fundraising Target",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("goal");
                return
            } else if (!item?.endDate) {
                toast({
                    description: "Please Enter End Date",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("endDate");
                return
            } else if (getValidationImageBtn() && !pathname?.includes("edit")) {
                toast({
                    description: "Please Enter Fundraising Image",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("image");
                return
            } else if (getValidationThemeBtn()) {
                toast({
                    description: "Please Fill Fundraising Information ",
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

    const getValidationThemeBtn = () => {
        return payload?.every((item: any, index: number) => {
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
            else if (getValidationImageBtn() && !pathname?.includes("edit")) {
                return true
            } else if (data.length === index + 1) {
                return false
            }
            else {
                return true
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
        onSuccess: (groupData) => {

            const clone = [...data]
            uploadedFile?.map((item, index) => {
                clone[index] = { ...clone[index], fundRaiserGroupId: groupData?.data?.id, bannerImage: item }
            })
            createDonation.mutate({ items: clone })
            // setstopData(true)
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
                description: "Fundraisier Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            router?.push("/dashboard/donation")
        }
    });

    // Create Draft 
    const editDonation = useMutation({
        mutationFn: (payload: any) => httpService.put(`/fund-raiser/edit/${id}`, payload),
        onError: (error: AxiosError<any, any>) => {

            console.log("work");

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
            toast({
                title: 'Success',
                description: "Updated Fundraisier",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            router?.push("/dashboard/donation/" + id)
        }
    });

    // const handleClick = React.useCallback(() => {
    //     getValidationTheme()
    // }, [])

    const createFundraisingData = () => {
        if (!pathname?.includes("edit")) {
            fileUploadHandler(image)
        } else {
            if (image?.length > 0) {
                fileUploadHandler(image)
            } else {
                console.log(data[0]);
                
                editDonation?.mutate({ ...data[0] })
            }
        }
    }

    useEffect(() => {
        setPayload(data)
    }, [data])

    useEffect(() => {
        if (uploadedFile?.length > 1) {
            createGroupDonation.mutateAsync({
                creatorID: data[0]?.creatorID,
                name: data[0]?.name,
                bannerImage: uploadedImage[0],
                description: data[0].description
            })
        } else if (uploadedFile?.length > 0) {
            let newObj: any = [...data]
            newObj[0] = { ...data[0], bannerImage: uploadedFile[0] }
            if (!pathname?.includes("edit")) {
                createDonation.mutate({ items: newObj })

            } else { 
                editDonation?.mutate({ ...newObj[0] })
            }
            reset()
        }
    }, [uploadedFile])

    return (
        <Flex w={"full"} alignItems={"center"} justifyContent={"center"} fontSize={["md", "lg"]} fontWeight={"bold"} >
            {!pathname?.includes("edit") ? (
                <CustomButton borderWidth={"0px"} backgroundColor={(getValidationThemeBtn() || getValidationImageBtn()) ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={createDonation?.isLoading || loading || createGroupDonation?.isLoading} onClick={getValidationTheme} _disabled={{ cursor: "not-allowed" }} borderRadius={"999px"} width={["full", "full", "300px", "300px"]}
                    text={'Submit'} />
            ) : (
                <CustomButton borderWidth={"0px"} backgroundColor={(getValidationThemeBtn()) ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={createDonation?.isLoading || loading || createGroupDonation?.isLoading} onClick={getValidationTheme} _disabled={{ cursor: "not-allowed" }} borderRadius={"999px"} width={["full", "full", "300px", "300px"]}
                    text={'Update'} />
            )}

            <ModalLayout close={setOpen} open={open} bg={secondaryBackgroundColor} >
                <SuccessMessageCreateEvent update={(pathname?.includes("edit_event_data") || pathname?.includes("edit_event")) ? true : false} />
            </ModalLayout>
        </Flex>
    )
}

export default SubmitEvent
