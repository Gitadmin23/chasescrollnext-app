import SearchComponent from '@/components/search_component'
import useSearchStore from '@/global-state/useSearchData'
import { THEME } from '@/theme'
import { InputGroup, InputLeftElement, Input, Box,  Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor, } from '@chakra-ui/react'
import React from 'react'
import { FiBell } from 'react-icons/fi'
import { IoSearchOutline } from 'react-icons/io5'
import NotificationPage from './NotificationsPage'
import { INotification } from '@/models/Notifications'
import CustomText from '@/components/general/Text'
import {Notification} from 'iconsax-react'
import { useNotification } from '@/global-state/useNotification'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { PaginatedResponse } from '@/models/PaginatedResponse'

interface Props { }

function NotificationBar(props: Props) {
    const { } = props
    const [active, setActive] = React.useState(false);
    const[page, setPage] = React.useState(0);


    const { count, setAllCount } = useNotification((state) => state);

    const {isLoading, isError } = useQuery(['getNotifications', page], () => httpService.get(`${URLS.GET_NOTIFICATIONS}`, {
        params: {
            page,
            // status: status,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<INotification> = data.data;
            const unrread = item.content.filter((item) => item.status === 'UNREAD');
            setAllCount({ count: unrread.length, notifications: item.content });
        },
        onError: () => {}
    })

    return (
        <Box width={"auto"} position={"relative"} borderRadius={'10px'} >
             <Box position={'relative'}>
                <Notification color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' onClick={() => setActive(prev => !prev)} />
                { count > 0 && <Box width={'10px'} height={'10px'} bg='red' borderRadius={'5px'} position={'absolute'} top='0' right='0' /> }
                {/* <CustomText position={'absolute'} top='-10px' right='0'></CustomText> */}
             </Box>
            {active && (
                <Box width={"380px"} left={['-270px','-350px']} borderRadius={'10px'} height={'300px'} maxHeight={'500px'} zIndex={"2000"} position={"absolute"} mt={"2"} >
                    <NotificationPage isLoading={isLoading} />
                </Box>
            )} 
            {active && (
                <Box onClick={()=> setActive(false)} bgColor={"black"} opacity={"0.3"} zIndex={"1000"} position={"fixed"} inset={"0px"} />
            )}
        </Box>
    )
}

export default NotificationBar
