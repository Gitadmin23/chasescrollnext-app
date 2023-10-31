import { ICommunity } from '@/models/Communitty'
import { Box, Button, HStack, VStack, Image, Stack, Link, useTab, useToast } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text';
import { RESOURCE_BASE_URL, URLS } from '@/services/urls';
import { useMutation, useQueryClient } from 'react-query';
import { useDetails } from '@/global-state/useUserDetails';
import httpService from '@/utils/httpService';
// import Image from 'next/image'

interface IProps {
    community: ICommunity;
    hasJoined: boolean;
}

function CommunityCard({ community, hasJoined }: IProps) {
    const { userId } = useDetails((state) => state)

    const queryClient = useQueryClient();
    const toast = useToast();
    const { isLoading, mutate } = useMutation({
        mutationFn: () => httpService.post(`${URLS.JOIN_GROUP}`, {
            groupID: community.id,
            joinID: userId,
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['findCommunities']);
            toast({
                title: 'Success',
                description:`You have successfully joined ${community.data.name} community`,
                status: 'success',
                position: 'top-right',
                duration: 5000,
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description:`An error occured while trying to join ${community.data.name}`,
                status: 'success',
                position: 'top-right',
                duration: 5000,
            });
        }
    })
  return (
    <Stack direction={['column', 'row']} width={['100%', '70%']} height={['auto', '230px']} marginBottom='30px'>

        <Box width={['100%', '70%']} height={'100%'} borderWidth={'2px'} borderBottomLeftRadius={'20px'} borderBottomRadius={'20px'} borderTopLeftRadius={'20px'} overflow={'hidden'}>
            <Image src={`${RESOURCE_BASE_URL}${community?.data?.imgSrc}`} height={['100%', '100%']} width={['100%','100%']}  alt='image' objectFit={'cover'} />
        </Box>

        <VStack width={'100%'} height='100%' justifyContent={'center'} paddingLeft={['0px','50px']}>
            <CustomText fontFamily={'Satoshi-Bold'} fontSize={'20px'}>{community?.data?.name}</CustomText>
            <CustomText fontFamily={'Satoshi-Regular'} fontSize={'16px'}>{community?.data?.description}</CustomText>
            { hasJoined && (
                    <HStack>
                        <Link href={`/dashboard/community/chat?activeId=${community.id}`}>
                            <Button variant={'solid'} height='40px' width={'100px'} color='white' bg='brand.chasescrollButtonBlue'>View</Button>    
                        </Link>
                        <Button variant={'ghost'} height='40px' color='brand.chasescrollButtonBlue'>{community?.data.memberCount} Members</Button>
                    </HStack>
            )}
            { !hasJoined && (
                <HStack>
                    <Button onClick={() => mutate()} isLoading={isLoading} variant={'solid'} height='40px' width={'100px'} color='white' bg='brand.chasescrollButtonBlue'>Join</Button>
                    <Button variant={'ghost'} height='40px' color='brand.chasescrollButtonBlue'>{community?.data.memberCount} Members</Button>
                </HStack>
            )}
        </VStack>
    </Stack>
  )
}

export default CommunityCard