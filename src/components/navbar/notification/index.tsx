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

interface Props { }

function NotificationBar(props: Props) {
    const { } = props
    const [active, setActive] = React.useState(false);

    return (
        <Box width={"auto"} position={"relative"} borderRadius={'10px'} >
             <Box position={'relative'}>
                <Notification color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' onClick={() => setActive(prev => !prev)} />
                <CustomText position={'absolute'} top='-10px' right='0'>3</CustomText>
             </Box>
            {active && (
                <Box width={"380px"} left={['-270px','-350px']} borderRadius={'10px'} height={'300px'} maxHeight={'500px'} zIndex={"20"} position={"absolute"} mt={"2"} >
                    <NotificationPage />
                </Box>
            )} 
            {active && (
                <Box onClick={()=> setActive(false)} bgColor={"black"} opacity={"0.3"} zIndex={"10"} position={"fixed"} inset={"0px"} />
            )}
        </Box>
    )
}

export default NotificationBar
