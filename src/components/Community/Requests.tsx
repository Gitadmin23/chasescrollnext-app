import useDebounce from '@/hooks/useDebounce';
import { ICommunity } from '@/models/Communitty';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, HStack, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import CustomText from '../general/Text';
import CommunityCard from './CommunityCard';
import { useDetails } from '@/global-state/useUserDetails';
import RequestCard from './RequestCard';

function Requests() {
    const [page, setPage] = React.useState(0);
    const [communites, setCommunites] = React.useState<ICommunity[]>([]);
    const [isLastPage, setIsLastPage] = React.useState(false);

    const { userId } = useDetails((state) => state)

    const { isLoading, isError } = useQuery(['getMyCommunities', page], () => httpService.get(`${URLS.GET_GROUP_REQUESTS}/${userId}`, {
        params: {
            page,
            // size: 20,
        }
    }), {
        onSuccess: (data) => {
            const contents: PaginatedResponse<ICommunity> = data.data;
            setIsLastPage(contents.last);
            //setCommunites(contents.content);
        },
        onError: () => {},
    });
  return (
    <VStack width='100%' height='100%'  alignItems={'center'} paddingTop={'20px'}>
        {
            !isLoading && isError && (
                <HStack paddingX='20px' width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                    <CustomText textAlign={'center'} fontFamily={'Satoshi-Bold'} fontSize='30px' color='grey'>An error occured while getting your communities</CustomText>
                </HStack>
            )
        }
        { isLoading && (
            <Spinner size='md' color='brand.chasescrollButtonBlue' />
        )}
        { !isLoading && !isError && communites.length < 1 && (
            <HStack paddingX='20px' width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                <CustomText textAlign={'center'} fontFamily={'Satoshi-Bold'} fontSize='30px' color='grey'>You have no community request.</CustomText>
            </HStack>
        )}
        { !isLoading && !isError && communites.length > 0 && (
            <Box paddingX='20px' width='100%' height='100%' overflowX={'hidden'} overflowY={'auto'} >
               { communites.map((item, index) => (
                <RequestCard key={index.toString()} community={item} />
               ))}
            </Box>
        )}
    </VStack>
  )
}

export default Requests;