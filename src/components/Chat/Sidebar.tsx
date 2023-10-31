import CustomText from '@/components/general/Text'
import { HStack, VStack, Button, InputGroup, InputLeftElement, Input, Box, Avatar } from '@chakra-ui/react'
import { IoMdSearch } from 'react-icons/io'
import React from 'react'
import { THEME } from '@/theme'
import SidebarCard from './SidebarCard'

const ARRAY = [1,2,3,4,5,6,7,8,9,10];

function Sidebar() {
  return (
   <VStack width='100%' height={'100%'} paddingX={'0px'}>

    <VStack width={'100%'} paddingX={'10px'}>

        {/* ONLINE USERS */}
        <VStack width='100%' height={'120px'} paddingBottom={'10px'} alignItems={'flex-start'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} paddingTop={'10px'}>

            <Box width='100%' height={'100%'} overflowX={'auto'} display={'inline-block'} whiteSpace={'nowrap'} paddingTop={'10px'} >
                { ARRAY.map((item, index) => (
                    <Box display={'inline-block'} width={'40px'} height='40px' position={'relative'}  borderRadius={'20px'}  marginRight={'20px'} key={index.toString()}>
                        <Box width={'10px'} height={'10px'} borderRadius={'5px'} bg='brand.chasescrollButtonBlue' position={'absolute'} right='0px' top="-5px" />
                        <Avatar name='D E'  size={'md'} />
                    </Box>
                ))}
            </Box>
            <CustomText fontFamily={'Satoshi-Medium'} fontSize={'14px'}>Users Online</CustomText>
        </VStack>

        <HStack width={'100%'} height={'60px'} justifyContent={'space-between'}>

        <HStack alignItems={'center'}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'3xl'}>Chats</CustomText>
            <Button height={25} borderRadius={15} bg='brand.chasescrollButtonBlue' color='white' fontFamily={'Satoshi-Light'} variant={'solid'} fontSize='12px' width='30px' >5 New</Button>
        </HStack>

        <Button variant={'outline'} height={'30px'} borderRadius={'20px'} outlineColor={'brand.chasescrollButtonBlue'} color='brand.chasescrollButtonBlue'>Create Community</Button>

        </HStack>

        {/* SEARCH BAR */}
        <InputGroup>
            <InputLeftElement>
                <IoMdSearch fontSize='30px' color={THEME.COLORS.chasescrollButtonBlue} />
            </InputLeftElement>
            <Input width='100%' height={'45px'} placeholder='search message' borderRadius={'20'} borderWidth={'1px'} borderColor={'lightgrey'} bg='whitesmoke' />
        </InputGroup>
    </VStack>

    {/* CHATS */}
    <Box width={'100%'} height={'100%'} overflowX={'hidden'} overflowY={'auto'} paddingX={'10px'}>
        {ARRAY.map((item, index) => (
            <SidebarCard key={index.toString()} />
        ))}
    </Box>

   </VStack>
  )
}

export default Sidebar