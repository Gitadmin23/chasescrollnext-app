import { useDetails } from '@/global-state/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { IEventType } from '@/models/Event';
import { IDonationList } from '@/models/donation';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Spinner, useToast } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { IoIosClose, IoIosMore } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';

interface Props {
    event: IEventType | IDonationList | any,
    draft?: boolean,
    donation?: boolean
}

function DeleteEvent(props: Props) {
    const {
        event,
        draft,
        donation
    } = props

    const pathname = usePathname()
    const toast = useToast()
    const queryClient = useQueryClient()
    const { userId: user_index } = useDetails((state) => state);

    const {  
        secondaryBackgroundColor,
        mainBackgroundColor
    } = useCustomTheme();

    // detete event
    const deleteEvent = useMutation({
        mutationFn: () => httpService.delete((draft ? `/events/delete-draft/${event.id}` : donation ? `/fund-raiser/${event?.id}?id=${event?.id}` : `/events/delete-event/${event.id}`)),
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
            if (data?.data?.message === "Could not delete event") {
                toast({
                    title: 'Error',
                    description: "Event can't be deleted, someone has registered for this event.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); 
            } else {

                toast({
                    title: 'Success',
                    description: data.data?.message,
                    status: 'success',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
            }
            queryClient.refetchQueries(URLS.GET_DRAFT + "?createdBy=" + user_index)
            queryClient.refetchQueries("/events/drafts")
            queryClient.refetchQueries("donationlist")

            queryClient.refetchQueries(URLS.JOINED_EVENT + user_index)
            setOpen(false)
        }
    });

    const [open, setOpen] = useState(false)

    const handleDelete = React.useCallback((e: any) => {
        e.stopPropagation();
        deleteEvent.mutate()
    }, [deleteEvent])

    const openHandler = (item: any) => {
        item.stopPropagation();
        setOpen(true)
    }
 

    return ( 
        <> 
            {((event?.isOrganizer && !pathname?.includes("past")) || pathname?.includes("draft") || pathname?.includes("mydonation")) && (
                <Flex pos={"absolute"} right={"-5px"}  zIndex={"100"} top={"-5px"} >
                    <Box>
                        <Popover isOpen={open} onClose={() => setOpen(false)} >
                            <PopoverTrigger >
                                <Flex as={"button"} justifyContent={"center"} alignItems={"center"} w={"6"} h={"6"} rounded={"full"} bgColor={"red"} onClick={openHandler} >
                                    <IoIosClose color='white' size={"20px"} />
                                </Flex>
                            </PopoverTrigger>
                            <PopoverContent w={"fit-content"} >
                                <PopoverArrow />
                                {/* <PopoverCloseButton />
                                <PopoverHeader>Confirmation!</PopoverHeader> */}
                                <PopoverBody w={"fit-content"} pos={"relative"} zIndex={"100"} >
                                    <Button onClick={handleDelete} fontSize={pathname?.includes("mydonation") ? "12px" : "14px"} isLoading={deleteEvent.isLoading} color={"red"} isDisabled={deleteEvent.isLoading} bg={"transparent"} px={pathname?.includes("mydonation") ? "3" : "6"} >Delete  {pathname?.includes("mydonation") ? "Fundraising" : "Event"}</Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                </Flex>
            )}
        </>
    )
}

export default DeleteEvent
