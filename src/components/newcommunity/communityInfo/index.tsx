import { useCommunityPageState } from '@/components/Community/chat/state';
import CommunityImage from '@/components/sharedComponent/community_image'
import { ExitButton, LinkButton, MuteButton, PhotoIcon, SettingButton } from '@/components/svg';
import useCustomTheme from '@/hooks/useTheme';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { useCommunity } from '..';
import PeopleCard from '@/components/search_component/other_components/people_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import MediaTab from './mediaTab';

export default function CommunityInfo() {

    const { members, loadingMembers, refectingMembers, refMembers } = useCommunity()
    const { activeCommunity } = useCommunityPageState((state) => state);

    const [search, setSearchValue] = useState("")
    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();

    return (
        <Flex flexDir={"column"} py={"8"} alignItems={"center"} >
            <Box w={"fit-content"} pos={"relative"} >
                <CommunityImage src={activeCommunity?.data?.imgSrc} rounded='36px' size={"97px"} />
                <Box pos={"absolute"} bottom={"2"} right={"0"} >
                    <PhotoIcon />
                </Box>
            </Box>
            <Text fontWeight={"700"} fontSize={"18px"} mt={"2"} >{activeCommunity?.data?.name}</Text>
            <Text color={"#2E2B2BB2"} pb={"6"} fontSize={"12px"} >{activeCommunity?.data?.memberCount} Members</Text>
            {/* <Flex w={"full"} px={"6"} pb={"4"} >
                <InputGroup width={["full", "full", "full"]} zIndex={"20"} position={"relative"} >
                    <InputLeftElement pointerEvents='none'>
                        <IoSearchOutline size={"25px"} color={bodyTextColor} />
                    </InputLeftElement>
                    <Input width={["full", "full", "full"]} value={search} color={bodyTextColor} onChange={(e) => setSearchValue(e.target.value)} type='text' borderColor={borderColor} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} _placeholder={{ color: bodyTextColor }} bgColor={secondaryBackgroundColor} placeholder='Search for users, event or...' />
                </InputGroup>
            </Flex> */}
            <Flex w={"fit-content"} gap={"1"} pb={"6"} >
                <Box as="button" outline={"none"} _hover={{ backgroundColor: "transparent" }} backgroundColor={"transparent"}>
                    <MuteButton />
                </Box>
                <Box as="button" outline={"none"} _hover={{ backgroundColor: "transparent" }} backgroundColor={"transparent"}>
                    <ExitButton />
                </Box>
                <Box as="button" outline={"none"} _hover={{ backgroundColor: "transparent" }} backgroundColor={"transparent"}>
                    <LinkButton />
                </Box>
                <Box as="button" outline={"none"} _hover={{ backgroundColor: "transparent" }} backgroundColor={"transparent"}>
                    <SettingButton />
                </Box>
            </Flex>
            <Flex w={"full"} rounded={"32px"} maxH={"309px"} overflowY={"auto"} borderWidth={"1px"} p={"4"} borderColor={"#D0D4EB"} flexDir={"column"}  >
                <LoadingAnimation length={members?.length} loading={loadingMembers} refeching={refectingMembers} >
                    {members?.map((person: any, i: number) => {
                        if (members.length === i + 1) {
                            return (
                                <Box key={person?.userId} width={"full"} ref={refMembers} >
                                    <PeopleCard community={true} role={person?.role} search={true} person={person?.user} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box key={person?.userId} width={"full"}>
                                    <PeopleCard community={true} role={person?.role} search={true} person={person?.user} />
                                </Box>
                            )
                        }
                    })}
                </LoadingAnimation>
            </Flex>
            <MediaTab />
        </Flex>
    )
}
