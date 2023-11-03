import React from 'react'
import HeaderLayout from './header_layout'
import { NetworkIcon } from '@/components/svg'
import httpService from '@/utils/httpService'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { URLS } from '@/services/urls'

interface Props {
    user_index: string
}

function NetworkHeader(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any) 
    
    // react query
    const { isLoading, isRefetching } = useQuery(['get-joined-network'], () => httpService.get(URLS.GET_USER_CONNECTION_LIST+""+user_index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {           
            setData(data.data); 
        }
    }) 

    return (
        <HeaderLayout name='Network' count={data?.length} icon={<NetworkIcon />} link={`/dashboard/profile/${user_index}/network`} />
    )
}

export default NetworkHeader
