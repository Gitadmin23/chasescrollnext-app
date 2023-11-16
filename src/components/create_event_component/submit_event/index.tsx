import CustomButton from '@/components/general/Button'
import useEventStore from '@/global-state/useCreateEventState';
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Flex, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useMutation } from 'react-query';

function SubmitEvent() {

    const { eventdata, image, tab, updateEvent, changeTab } = useEventStore((state) => state);
    const { userId: user_index } = useDetails((state) => state);
    const router = useRouter()
    const pathname = usePathname();

    // const []
    const toast = useToast()

    const getValidationTheme = () => {
        if (!eventdata?.eventName) {
            return true
        } else if (!eventdata?.eventType) {
            return true
        } else if (!eventdata?.eventDescription) {
            return true
        } else if (!image && !eventdata?.currentPicUrl) {
            return true
        } else {
            return false
        }
    }

    const getValidationInfo = () => {
        if (!eventdata?.startDate) {
            return true
        } else if (!eventdata?.endDate) {
            return true
        } else if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                return true
            }
        } else {
            return false
        }
    } 

    const getValidationAll = () => {
        if (tab === 0) {
            return getValidationTheme()
        } else if (tab === 1) {
            return getValidationInfo()
        } else {
            return getValidationTicket()
        }
    } 

    const getValidationTicket: any =()=> { 
        
        return eventdata?.productTypeData?.every((item:any, index: number) => {

        if(!item.totalNumberOfTickets){
            return true
         } else if(!item.ticketType){
             return true
         } else if(!item.minTicketBuy){
             return true
         } else if(!item.maxTicketBuy){
             return true
         } else if(item.maxTicketBuy <= item.minTicketBuy){
             return true
         }  else if(eventdata?.productTypeData?.length === index+1) {
             return false
         } else {
            return true
         }
        }) 
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
        onSuccess: (data: any) => {
            let newObj: any = { ...eventdata, picUrls: [data?.data?.fileName], currentPicUrl: data?.data?.fileName }
            if (image && !eventdata?.currentPicUrl) {
                createDraft.mutate(newObj)
            } else if (image && eventdata?.currentPicUrl) {
                saveToDraft.mutate(newObj)
            }
        }
    });

    // Create Draft 
    const createDraft = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_DRAFT, data),
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
            updateEvent(data?.data)
            changeTab(1)
            toast({
                title: 'Success',
                description: "Event Saved",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    // Save To Draft
    const saveToDraft = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_DRAFT, data),
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
            updateEvent(data?.data)
            changeTab(tab !== 1 ? 1 : 2)
            toast({
                title: 'Success',
                description: "Event Saved",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    // Create Event From Draft
    const createEventFromDraft = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_EVENT_FROM_DRAFT, data),
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
            router.push("/dashboard/event")
            toast({
                title: 'Success',
                description: "Event Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });  
        }
    }); 

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_EVENT, data),
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
            
            router.push("/dashboard/event")
            toast({
                title: 'Success',
                description: "Event Updated",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            }); 
        }
    });

    const handleClick = React.useCallback(() => {
        if (tab === 0) {
            if (pathname?.includes("edit_event")) {
                changeTab(1)
            } else {
                if (image) {
                    const fd = new FormData();
                    fd.append("file", image);
                    uploadImage.mutate(fd)
                } else {
                    saveToDraft.mutate(eventdata)
                }
            }
        } else if (tab === 1) {
            if (pathname?.includes("edit_event")) {
                changeTab(2)
            } else {
                saveToDraft.mutate(eventdata)
            }
        } else { 
            if (pathname?.includes("edit_event")) {
                updateUserEvent.mutate(eventdata)
            } else {
                createEventFromDraft.mutate(eventdata)
            } 
        }
    }, [saveToDraft, uploadImage, createEventFromDraft])

    return (
        <Flex alignItems={"center"} justifyContent={"center"} fontSize={["md", "lg"]} fontWeight={"bold"} my={"4"} >
            <CustomButton isLoading={uploadImage?.isLoading || uploadImage?.isLoading || saveToDraft?.isLoading || createEventFromDraft?.isLoading || updateUserEvent?.isLoading} onClick={handleClick} disable={getValidationAll()} _disabled={{ color: "#F04F4F", cursor: "not-allowed" }} width={"400px"} backgroundColor={"transparent"}
                color={"brand.chasescrollBlue"} text='Continue' />
        </Flex>
    )
}

export default SubmitEvent
