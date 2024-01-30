import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Spinner, useToast } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react'
import { useMutation, useQueryClient } from 'react-query';

interface Props {
    event: any,
    draft?: boolean
}

function DeleteEvent(props: Props) {
    const {
        event,
        draft
    } = props

    const toast = useToast()
    const queryClient = useQueryClient()
    const { userId: user_index } = useDetails((state) => state);

    // detete event
    const deleteEvent = useMutation({
        mutationFn: () => httpService.delete((draft ? "/events/delete-draft/" :"/events/delete-event/") + event.id),
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
            toast({
                title: 'Success',
                description: data.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            queryClient.refetchQueries(URLS.GET_DRAFT + "?createdBy=" + user_index)
            queryClient.refetchQueries(URLS.JOINED_EVENT + user_index)
        }
    });

    const handleSave = React.useCallback((e: any) => {
        e.stopPropagation();
        deleteEvent.mutate()
    }, [deleteEvent])

    return (
        <Box as='button' onClick={handleSave} color={"brand.chasescrollRed"} borderWidth={"1px"} borderColor={"brand.chasescrollRed"} fontWeight={"semibold"} width={"fit-content"} display={"flex"} justifyContent={"center"} fontSize={"xs"} px="3" rounded={"full"} alignItems={"center"} disabled={deleteEvent.isLoading} >
            {(deleteEvent.isLoading) && <Spinner size='sm' color="brand.chasesccrollButtonBlue" />}
            {(!deleteEvent.isLoading) && (
                "delete"
            )}
        </Box>
    )
}

export default DeleteEvent
