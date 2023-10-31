import { useCommunityPageState } from '@/app/dashboard/community/chat/state';
import CustomText from '@/components/general/Text'
import { RESOURCE_BASE_URL } from '@/services/urls';
import { Avatar, HStack, VStack,  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Image,
  Box
 } from '@chakra-ui/react'
import React from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'


function CommunityChatHeader() {
  const { activeCommunity } = useCommunityPageState((state) => state);

  return (
   <HStack width='100%' height={'100px'} bg='white' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} paddingX={'20px'} justifyContent={'space-between'}>

    <HStack>
          <Box width='45px' height='45px' borderRadius={'36px 0px 36px 36px'} borderWidth={'2px'} borderColor={'brand.chasescrollBlue'} overflow={'hidden'}>
                    { activeCommunity?.data.imgSrc === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{activeCommunity.data.name[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        activeCommunity?.data.imgSrc && (
                            <Image src={`${RESOURCE_BASE_URL}${activeCommunity.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                        )
                    }
            </Box>
        <VStack alignItems={'flex-start'} spacing={0}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} color='brand.chasescrollButtonBlue'>{activeCommunity?.data.name}</CustomText>
            <CustomText fontFamily={'DM-Regular'} fontSize={'11px'}>{activeCommunity?.data.memberCount} Members</CustomText>
        </VStack>
    </HStack>

   <Menu>
      <MenuButton>
        <IoMdInformationCircleOutline color='grey' fontSize='25px' />
      </MenuButton>
      <MenuList padding='0px'>
        <MenuItem height={'50px'}>Group information</MenuItem>
        <MenuItem height={'50px'} color={'red'}>Report community</MenuItem>
        <MenuItem height={'50px'} color='red' >Exit community</MenuItem>
      </MenuList>
   </Menu>

   </HStack>
  )
}

export default CommunityChatHeader