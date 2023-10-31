import CustomText from '@/components/general/Text'
import { HStack, VStack, Button, InputGroup, InputLeftElement, Input, Box, useToast, Image } from '@chakra-ui/react'
import { IoMdSearch } from 'react-icons/io'
import React from 'react'
import { THEME } from '@/theme'
import SidebarCard from './SidebarCard'
import { useDetails } from '@/global-state/useUserDetails'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { ICommunity } from '@/models/Communitty'
import { uniqBy } from 'lodash';
import { PaginatedResponse } from '@/models/PaginatedResponse'
import useDebounce from '@/hooks/useDebounce'
import Link from 'next/link'


function Sidebar() {
    const [page, setPage] = React.useState(0);
    const [search, setSearch] = React.useState('');
    const [last, setLast] = React.useState(false);
    const [communitiies, setCommunities] = React.useState<ICommunity[]>([]);
    const intObserver = React.useRef<IntersectionObserver>();

    const toast = useToast();
    const debounceValue = useDebounce(search);
    const  { userId } = useDetails((state) => state);
    const { isLoading, isError, } = useQuery(['getJoinedGroups', debounceValue], () => httpService.get(`${URLS.JOINED_GROUPS}`, {
        params: {
            page: 0,
            searchText: debounceValue,
            size: 20,
            userID: userId,
        }
    }), {
        onSuccess: (data) => {
            console.log(data.data);
            const response: PaginatedResponse<ICommunity> = data.data;
            setLast(response.last);
            setCommunities(response.content);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: 'An error occured while getting communiity list',
                status: 'error',
                position: 'top-right'
            })
        }
    });

    const lastChildRef = React.useCallback((post: any) => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
          if (posts[0].isIntersecting && last) {
            setPage(prev => prev + 1); 
          }
        });
        if (post) intObserver.current.observe(post);
       }, [isLoading, last, setPage]);
  return (
   <VStack width='100%' height={'100%'} paddingX={'10px'} spacing={0} alignItems={'flex-start'} >

    <VStack width={'100%'} paddingX={'10px'} borderBottomWidth={'1px'} paddingBottom={'20px'} borderBottomColor={'lightgrey'}>
        <HStack width={'100%'} height={'60px'} justifyContent={'space-between'}>

        <HStack alignItems={'center'}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'20px'}>Community</CustomText>
            <Button height={'16px'} width='42px' borderRadius={15} bg='#5D70F9' color='white' fontFamily={'Satoshi-Light'} variant={'solid'} fontSize='12px' >5 New</Button>
        </HStack>

        <Link href='/dashboard/community/create'>
            <Button variant={'unstyled'}   height={'23px'} width='100px' borderRadius={'20px'} borderWidth={'1px'} borderColor={'brand.chasescrollButtonBlue'} fontSize='12px' color='brand.chasescrollButtonBlue' fontFamily={'DM-Regular'}>New Community</Button>
        </Link>

        </HStack>

        {/* SEARCH BAR */}
        <InputGroup>
            <InputLeftElement>
                <Image src="/assets/images/search-icon.png" width={'20px'} height={'20px'} alt='image' />
            </InputLeftElement>
            <Input width='100%' height={'45px'} placeholder='search message' borderRadius={'12px'} borderWidth={'1px'} borderColor={'lightgrey'} bg='whitesmoke' />
        </InputGroup>
    </VStack>

    {/* CHATS */}
    {
        !isLoading && !isError && communitiies.length > 0 && communitiies.map((item, index) => {
            if (index === communitiies.length - 1) {
                return <SidebarCard ref={lastChildRef} key={index.toString()} community={item} />
            } else {
                return <SidebarCard key={index.toString()} community={item} />
            }
        })
    }

    {
        !isLoading && !isError && communitiies.length < 1 && (
            <HStack width={'100%'} height='50px' justifyContent={'center'} alignItems={'center'}>
                <CustomText fontFamily={'Satoshi-Medium'} fontSize={'18'} textAlign={'center'}>You have not joined any group</CustomText>
            </HStack>
        )
    }

   </VStack>
  )
}

export default Sidebar