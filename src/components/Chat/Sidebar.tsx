import CustomText from '@/components/general/Text'
import { HStack, VStack, Button, InputGroup, InputLeftElement, Input, Box, Avatar, useToast } from '@chakra-ui/react'
import { IoMdSearch } from 'react-icons/io'
import React from 'react'
import { THEME } from '@/theme'
import SidebarCard from './SidebarCard'
import { useDetails } from '@/global-state/useUserDetails'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { Chat } from '@/models/Chat'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import useDebounce from '@/hooks/useDebounce'
import { useChatPageState } from './state'
import { useRouter } from 'next/navigation';
import { SearchNormal1 } from 'iconsax-react'
import { IUser } from '@/models/User'


const ARRAY = [1,2,3,4,5,6,7,8,9,10];

function Sidebar() {
    const [chats, setChats] = React.useState<Chat[]>([])
    const [search, setSearch] = React.useState('');
    const [last, setLast] = React.useState(false);
    const [page, setPage] = React.useState(0);

    const intObserver = React.useRef<IntersectionObserver>();

    const router = useRouter();
    const toast = useToast();
    const debounceValue = useDebounce(search);
    const { userId } = useDetails((state) => state);
    const {} = useChatPageState((state) => state);
    const onlineUsers = useQuery(['onlineUser', userId], () => httpService.get(`${URLS.ONLINE_USERS}`), {
        onSuccess: (data) => {
            const item: PaginatedResponse<IUser> = data.data;
            console.log(item);
        },
        onError: (error) => {},
    })
    const { isLoading, isError, }= useQuery(['getChats', userId], () => httpService.get(`${URLS.GET_CHATS}`, {
        params: {
            page: 0,
            searchText: debounceValue,
            size: 20,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<Chat> = data.data;
            setLast(item.last);
            setChats(item.content);
        }
    })

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
   <VStack width='100%' height={'100%'} paddingX={'0px'}>

    <VStack width={'100%'} paddingX={'10px'}>

        {/* ONLINE USERS */}
        {/* <VStack width='100%' height={'120px'} paddingBottom={'10px'} alignItems={'flex-start'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} paddingTop={'10px'}>

            <Box width='100%' height={'100%'} overflowX={'auto'} display={'inline-block'} whiteSpace={'nowrap'} paddingTop={'10px'} >
                { ARRAY.map((item, index) => (
                    <Box display={'inline-block'} width={'45px'} height='45px' position={'relative'}  borderRadius={'20px'}  marginRight={'20px'} key={index.toString()}>
                        <Box width={'10px'} height={'10px'} borderRadius={'5px'} bg='brand.chasescrollButtonBlue' position={'absolute'} right='0px' top="-5px" />
                        <Box width='45px' height='45px' borderRadius='36px 0px 36px 36px' borderWidth={'2px'} borderColor={THEME.COLORS.borderColor}>

                        </Box>
                    </Box>
                ))}
            </Box>
            <CustomText fontFamily={'Satoshi-Medium'} fontSize={'14px'}>Users Online</CustomText>
        </VStack> */}

        <HStack width={'100%'} height={'60px'} justifyContent={'space-between'}>

        <HStack alignItems={'center'}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'3xl'}>Chats</CustomText>
            <Button height={25} borderRadius={15} bg='brand.chasescrollButtonBlue' color='white' fontFamily={'Satoshi-Light'} variant={'solid'} fontSize='12px' width='30px' >5 New</Button>
        </HStack>

        <Button onClick={() => router.push('/dashboard/chats/create')} variant={'unstyled'} width='120px' height={'30px'} borderWidth={'1px'} borderRadius={'20px'} borderColor={'brand.chasescrollButtonBlue'} color='brand.chasescrollButtonBlue' >
            Create Group
        </Button>

        </HStack>

        {/* SEARCH BAR */}
        <InputGroup>
            <InputLeftElement>
                <SearchNormal1 size='25px' color={THEME.COLORS.chasescrollButtonBlue} />
            </InputLeftElement>
            <Input width='100%' height={'45px'} placeholder='search message' borderRadius={'10'} borderWidth={'1px'} borderColor={'lightgrey'} bg='whitesmoke' />
        </InputGroup>
    </VStack>

      {/* CHATS */}
      {
        !isLoading && !isError && chats.length > 0 && (
            <Box width={'100%'} height={'100%'} overflowY={'auto'} paddingBottom={'100px'}>
            {
                 !isLoading && !isError && chats.length > 0 && chats.map((item, index) => {
                     if (index === chats.length - 1) {
                         return <SidebarCard ref={lastChildRef} key={index.toString()} chat={item} />
                     } else {
                         return <SidebarCard key={index.toString()} chat={item} />
                     }
                 })
             }
            </Box>
        )
    }

    {
        !isLoading && !isError && chats.length < 1 && (
            <HStack width={'100%'} height='50px' justifyContent={'center'} alignItems={'center'}>
                <CustomText fontFamily={'Satoshi-Medium'} fontSize={'18'} textAlign={'center'}>You have not joined any group</CustomText>
            </HStack>
        )
    }

    {
        !isLoading && isError && (
            <HStack width={'100%'} height='50px' justifyContent={'center'} alignItems={'center'}>
                <CustomText fontFamily={'Satoshi-Medium'} fontSize={'18'} textAlign={'center'}>You have not joined any group</CustomText>
            </HStack>
        )
    }

   </VStack>
  )
}

export default Sidebar