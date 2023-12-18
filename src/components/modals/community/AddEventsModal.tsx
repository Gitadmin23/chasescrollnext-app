import { useCommunityPageState } from '@/components/Community/chat/state';
import EventDetails from '@/components/event_details_component';
import CustomText from '@/components/general/Text';
import { useDetails } from '@/global-state/useUserDetails'
import { IEvent } from '@/models/Events'
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { IMAGE_URL, URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, VStack, useToast, Image } from '@chakra-ui/react';
import { uniqBy } from 'lodash';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';

const EventBox = ({ event }: {
    event: IEvent,
}) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { activeCommunity } = useCommunityPageState((state) => state);
    const { userId } = useDetails((state) => state);


    const savedEvent = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.SAVE_EVENT}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Event saved!',
                status: 'success',
                position: 'top-right',
                duration: 5000
            });
            queryClient.invalidateQueries([`getAllMyEvents-${activeCommunity?.id}`]);
            queryClient.invalidateQueries([`getMyEventsss`, userId]);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while trying to save an event',
                status: 'error',
                position: 'top-right',
                duration: 5000
            })
        }
    })
    return (
        <HStack alignItems={'flex-start'} width='100%' height={'100px'} paddingY={'10px'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'}>
            <Box width='50px' height={'50px'} borderRadius={'10px'} bg={'lightgrey'} overflow={'hidden'}>
                <Image alt='om' src={`${IMAGE_URL}${event.currentPicUrl}`} width='100%' height='100%' objectFit={'cover'} />
            </Box>

            <VStack flex={1} alignItems={'flex-start'} spacing={0}>
                <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>{event.eventName}</CustomText>
                <CustomText fontFamily={'DM-Regular'} fontSize={'14px'}>{event.eventDescription.length > 50 ? event.eventDescription.substring(0, 50) + '...' : event.eventDescription}</CustomText>

                <Button onClick={() => savedEvent.mutate({
                    eventID: event.id,
                    typeID: activeCommunity?.id,
                    type: 'EVENT',
                })}
                    isLoading={savedEvent.isLoading}
                    width='100px' height='30px' borderRadius={'10px'} variant={'outline'} fontSize={'12px'}>Add</Button>
            </VStack>

        </HStack>
    )
}

function AddEventsModal({ isOpen, onClose }: {
    isOpen: boolean,
    onClose: () => void,
}) {
    const [events, setEvents] = React.useState<IEvent[]>([]);
    const { userId } = useDetails((state) => state);
    const toast = useToast();
    const { events: savedEvents } = useCommunityPageState((state) => state);

    const { isLoading, isError } = useQuery(['getMyEventsss', userId], () => httpService.get(`${URLS.GET_EVENTS}`, {
        params: {
            // createdBy: userId,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<IEvent> = data.data;
            console.log(item);
            const ids = savedEvents.map((item) => item.id);
            setEvents(uniqBy(item.content.filter((item) => !ids.includes(item.id)), 'id'))
        },
        onError: () => { },
    });


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
                        {!isLoading && !isError && events.length < 1 && (
                            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>You have no Events to add!</CustomText>
                            </VStack>
                        )}
                        {
                            events?.map((event: IEvent, index) => (
                                <EventBox key={index} event={event} />
                            ))
                        }
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddEventsModal