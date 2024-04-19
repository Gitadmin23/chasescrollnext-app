import CustomButton from '@/components/general/Button'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import UserImage from '@/components/sharedComponent/userimage'
import { CloseIcon, CollaboratorIcon } from '@/components/svg'
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState'
import { useDetails } from '@/global-state/useUserDetails'
import useDebounce from '@/hooks/useDebounce'
import { IEventType } from '@/models/Event'
import { IUser } from '@/models/User'
import httpService from '@/utils/httpService'
import { textLimit } from '@/utils/textlimit'
import { Box, Button, Checkbox, Flex, Heading, Input, InputGroup, InputLeftElement, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { MdEdit } from "react-icons/md";
import SubmitEvent from '../../submit_event'
import { URLS } from '@/services/urls'
import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'

type IProps = {
    btn?: boolean,
    data?: CreateEvent,
}

export default function CollaboratorBtn(props: IProps) {

    const {
        btn,
        data
    } = props

    const [open, setOpen] = useState(false) 
    const [users, setUsers] = React.useState<IUser[]>([]);
    const { eventdata, updateEvent } = useEventStore((state) => state);


    const queryClient = useQueryClient() 

    const { userId } = useDetails((state) => state);
    // const toast = useToast()

    const [search, setSearch] = React.useState('');
    const searchText = useDebounce(search, 1000);

    const { isLoading, isError } = useQuery(['getUserFriends', searchText, userId], () => httpService.get(`/user/get-users-connections/${userId}`, {
        params: {
            searchText
        }
    }), {
        onSuccess: (data) => {
            setUsers(data?.data.content);
        }
    });

    const AddAdmin =(userIndex: string)=> {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }

        if (eventdata?.collaborators?.includes(userIndex)) {
 

            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1); 

            if (!eventdata?.admins?.includes(userIndex)) { 

                clone.admins = [...admin, userIndex] 
            } else { 

                const index = admin.indexOf(userIndex);
                clone?.admins.splice(index, 1); 
            }

            updateEvent(clone);

        } else if (eventdata?.admins?.includes(userIndex)) {
  

            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1); 

            updateEvent(clone); 
        } else {

            if (!clone.admins) {
                clone.admins = [userIndex]
            } else {
                clone.admins = [...admin, userIndex]
            } 

            updateEvent(clone); 

        }
    }

    const AddCollaborators =(userIndex: string)=> {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }
        
        if (eventdata?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            if (!eventdata?.collaborators?.includes(userIndex)) {

                clone.collaborators = [...collaborators, userIndex] 
            } else {


                const index = collaborators.indexOf(userIndex);
                clone?.collaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex)
                clone.collaborators = [...collaborators, userIndex] 
            }
            updateEvent(clone);

        } else if (eventdata?.collaborators?.includes(userIndex)) { 

            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            // clone?.collaborators?.filter((id) => id !== userIndex)

            updateEvent(clone); 
        } else {

            clone.collaborators = [...collaborators, userIndex]
            // clone.collaborators.push(item)

            updateEvent(clone); 

        } 
    }



    const UserCard = (props: IUser & { collaborators: boolean, admin: boolean }) => {
        const { username, userId, data: { imgMain: { value: imgMain } }, firstName, lastName, collaborators, admin } = props;

        const [show, setShow] = useState(false)

        return (
            <Flex width='100%' height={'fit-content'} flexDir={"column"} rounded={"16px"} borderColor={"#B6B6B6"} borderWidth={"1px"} justifyContent={'space-between'} padding='15px'>
                <Flex justifyContent={'space-between'} w={"full"} alignItems={"center"}  >
                    <Flex gap={"1"} height={"full"} alignItems={"center"} >
                        <Box w={"fit-content"} >
                            <UserImage data={props} image={props?.data?.imgMain?.value} size={"40px"} border={"2px"} font={"20px"} />
                        </Box>
                        {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                        <VStack alignItems={'flex-start'} spacing={0}>
                            <Heading fontSize={'16px'} color='black'>{firstName || ''} {lastName || ''}</Heading>
                            <Text color='grey' fontSize={'14px'}>@{textLimit(username, 12) || ''}</Text>
                        </VStack>
                    </Flex>
                    <Checkbox isChecked={show || collaborators || admin} rounded={"full"} onChange={(e) => setShow((prev) => !prev)} />
                </Flex>
                {(show || collaborators || admin) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddAdmin(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddCollaborators(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Coordinator</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        )
    }

    const clickHandler = () => {
        setOpen(true)

        if (data?.eventName) {

            const clone: CreateEvent = {
                id: data?.id,
                picUrls: data?.picUrls,
                eventType: data?.eventType,
                eventName: data?.eventName,
                eventDescription: data?.eventDescription,
                joinSetting: data?.joinSetting,
                locationType: data?.locationType,
                currency: data?.currency,
                currentPicUrl: data?.currentPicUrl,
                eventFunnelGroupID: data?.eventFunnelGroupID,
                mediaType: data?.mediaType,
                currentVideoUrl: data?.currentVideoUrl,
                isPublic: data?.isPublic,
                isExclusive: data?.isExclusive,
                mask: data?.mask,
                attendeesVisibility: data?.attendeesVisibility,
                minPrice: data?.minPrice,
                maxPrice: data?.maxPrice,
                startTime: data?.startTime,
                endTime: data?.endTime,
                startDate: data?.startDate,
                endDate: data?.endDate,
                // expirationDate: "",
                location: data?.location,
                productTypeData: data?.productTypeData,
                collaborators: data?.collaborators,
                admins: data?.admins
            } 

            const cloneAdmin: any = {
                collaborators: data?.collaborators,
                admins: data?.admins
            }


            const admin: any = []
            const collaborator: any = []

            clone?.admins?.map((item: IUser) => {
                return admin.push(item?.userId)
            })
            clone?.collaborators?.map((item: IUser) => {
                return collaborator.push(item?.userId)
            })

            clone.admins = admin 
            clone.collaborators = collaborator 

            updateEvent(clone) 
        }

    }


    const toast = useToast()

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (newdata: any) => httpService.put(URLS.UPDATE_EVENT, newdata),
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
        onSuccess: (message: AxiosResponse<any>) => {
            queryClient.invalidateQueries(['all-events-details' + data?.id]) 

            toast({
                title: 'Success',
                description: "Event has been updated successfully",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setOpen(false)
        }
    }); 


    const updateEventCollaboration = React.useCallback(() => {  

        const clone: any = {}

        clone.admins = eventdata.admins
        clone.collaborators = eventdata.collaborators 
        updateUserEvent.mutate(clone)
    }, []) 


    return (
        <>
            {btn && (
                <Button onClick={() => clickHandler()} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>Edit Collaborator</Button>
            )}
            {!btn && (
                <Flex onClick={() => setOpen(true)} as={'button'} gap={"1"} alignItems={"center"} >
                    <CollaboratorIcon />
                    <Text color={"#1732F7"} lineHeight={"22px"} >{(eventdata?.admins?.length !== 0 || eventdata?.collaborators?.length !== 0) ? (eventdata?.admins ? eventdata?.admins?.length : 0) + (eventdata?.collaborators ? eventdata?.collaborators?.length : 0) : "Add Event "} Collaborators.</Text>
                </Flex>
            )}
            <ModalLayout open={open} close={setOpen} closeIcon={false} >
                <Flex w={"full"} px={"6"} pt={"8"} >
                    <Box>
                        <Text color={"#121212"} fontSize={"24px"} lineHeight={"31.25px"} fontWeight={"bold"} >Select Collaborators</Text>
                        <Text color={"#626262"} lineHeight={"20.83px"} >Kindly select users to collaborate with on this event and assign roles.</Text>
                    </Box>
                    <Box w={"fit-content"} >
                        <Box onClick={() => setOpen(false)} as='button'>
                            <CloseIcon second={true} />
                        </Box>
                    </Box>
                </Flex>
                <Flex px={"6"} py={"4"} >
                    <InputGroup width={["full", "full", "full"]} zIndex={"20"} position={"relative"} >
                        <InputLeftElement pointerEvents='none'>
                            <IoSearchOutline size={"25px"} color='#B6B6B6' />
                        </InputLeftElement>
                        <Input width={["full", "full", "full"]} value={search} onChange={(e) => setSearch(e.target.value)} type='text' borderColor={"#CCCCCC"} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} bgColor={"white"} placeholder='Search for users, event or...' />
                    </InputGroup>
                </Flex>

                <LoadingAnimation loading={isLoading} >
                    <Flex flexDir={"column"} gap={"4"} maxH={"300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                        {users.map((item, index) => (
                            <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                        ))}
                    </Flex>
                </LoadingAnimation>

                {btn && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg='white' py={'20px'} >
                        <CustomButton text='Submit' isLoading={updateUserEvent?.isLoading} onClick={() => updateEventCollaboration()} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}

                {!btn && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg='white' py={'20px'} >
                        <CustomButton text='Done' onClick={() => setOpen(false)} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}
            </ModalLayout>
        </>
    )
}
