import { useDetails } from '@/global-state/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { IEventType } from '@/models/Event';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Spinner, useToast } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { IoIosMore } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';

interface Props {
    event: IEventType,
    draft?: boolean
}

function DeleteEvent(props: Props) {
    const {
        event,
        draft
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
        mutationFn: () => httpService.delete((draft ? "/events/delete-draft/" : "/events/delete-event/") + event.id),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'success',
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
        // <Box as='button' onClick={handleDelete} color={"brand.chasescrollRed"} borderWidth={"1px"} borderColor={"brand.chasescrollRed"} fontWeight={"semibold"} width={"fit-content"} display={"flex"} justifyContent={"center"} fontSize={"xs"} px="3" rounded={"full"} alignItems={"center"} disabled={deleteEvent.isLoading} >
        //     {(deleteEvent.isLoading) && <Spinner size='sm' color="brand.chasesccrollButtonBlue" />}
        //     {(!deleteEvent.isLoading) && (
        //         "delete"
        //     )}
        // </Box>
        <>

            {((event?.isOrganizer && !pathname?.includes("past")) || pathname?.includes("draft")) && (
                <Flex pos={"absolute"} right={["6", "6", "20", "20"]} zIndex={"100"} top={["6", "6", "1", "1"]} >
                    <Box>
                        <Popover isOpen={open} onClose={() => setOpen(false)} >
                            <PopoverTrigger >
                                <Button onClick={openHandler} bg={mainBackgroundColor} _hover={{backgroundColor: mainBackgroundColor}}  >
                                    <IoIosMore size={"30px"} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent w={"fit-content"} >
                                <PopoverArrow />
                                {/* <PopoverCloseButton />
                                <PopoverHeader>Confirmation!</PopoverHeader> */}
                                <PopoverBody w={"fit-content"} pos={"relative"} zIndex={"100"} >
                                    <Button onClick={handleDelete} isLoading={deleteEvent.isLoading} color={"red"} isDisabled={deleteEvent.isLoading} bg={"transparent"} px={"6"} >Delete Event</Button>
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
