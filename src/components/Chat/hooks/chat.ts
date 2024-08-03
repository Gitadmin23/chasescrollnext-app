
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls'; 
import httpService from '@/utils/httpService';
import {  
  useToast, 
 } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'; 
import useDebounce from '@/hooks/useDebounce';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'; 


const useChat = () => {
    

    const [search, setSearch] = React.useState(''); 

    const debounceValue = useDebounce(search);
    const { results, isLoading, ref: chatref, isRefetching, refetch } = InfiniteScrollerComponent({ url: `${URLS.GET_CHATS}?searchText=${debounceValue ?? ""}`, limit: 15, filter: "id", newdata: debounceValue, name: "getMessages" })

 
    const toast = useToast(); 
   
  
    const createPost   = useMutation({
      mutationFn: (data: any) => httpService.post(`${URLS.CHAT_MESSGAE}`, data),
      onSuccess: () => { 
        refetch()
      },
      onError: () => {
        toast({ 
          title: 'Error',
          description: 'An errorr occured',
          status: 'error',
          position: 'top-right'
        })
      }
    }); 

    return { 
        results,
        isLoading,
        chatref, 
        isRefetching,
        refetch, 
        createPost
    };
}

export default useChat