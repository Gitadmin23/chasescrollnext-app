import CustomText from '@/components/general/Text';
import { useDetails } from '@/global-state/useUserDetails'
import { IEvent } from '@/models/Events'
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react';
import { uniqBy } from 'lodash';
import React from 'react'
import { useQuery } from 'react-query';

function AddEventsModal({ isOpen, onClose }: {
    isOpen: boolean,
    onClose: () => void,
}) {
    const [events, setEvents] = React.useState<IEvent[]>([])
    const { userId } = useDetails((state) => state);

    const { isLoading, isError } = useQuery(['getMyEvents', userId], () => httpService.get(`${URLS.GET_EVENTS}`, {
        params: {
            createdBy: userId,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<IEvent> = data.data;
            console.log(item);
            setEvents(uniqBy(item.content, 'id'))
        },
        onError: () => {},
    })
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            <ModalBody>
                <HStack width='100%' height={'60px'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'}>
                    <CustomText>My Events</CustomText>
                </HStack>
                <Box width='100%' height='450px' overflowY={'auto'}>
                    { !isLoading && !isError && events.length < 1 && (
                        <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>You have no Events to add!</CustomText>
                        </VStack>
                    )}
                </Box>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default AddEventsModal