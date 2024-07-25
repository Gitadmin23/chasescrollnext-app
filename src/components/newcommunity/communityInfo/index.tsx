import { useCommunityPageState } from '@/components/Community/chat/state';
import CommunityImage from '@/components/sharedComponent/community_image'
import { DeleteButton, EditButton, ExitButton, PhotoIcon, SettingButton, ShareButton } from '@/components/svg';
import useCustomTheme from '@/hooks/useTheme';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { useCommunity } from '..';
import PeopleCard from '@/components/search_component/other_components/people_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import MediaTab from './mediaTab';
import { useDetails } from '@/global-state/useUserDetails';
import ShareEvent from '@/components/sharedComponent/share_event';

interface IProps {
    setTab?: any
}

export default function CommunityInfo({ setTab }: IProps) {

    const { members, loadingMembers, refectingMembers, refMembers, deleteGroup, leaveGroup, activeCommunity } = useCommunity()
    // const { activeCommunity } = useCommunityPageState((state) => state);
    // const [tab, setTab] = useState(false)
    const { userId } = useDetails((state) => state);

    const [search, setSearchValue] = useState("")
    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();


    const self = userId === activeCommunity?.creator.userId;


    return (
        <Flex flexDir={"column"} py={"8"} alignItems={"center"} >
            <Box w={"fit-content"} pos={"relative"} >
                <CommunityImage src={activeCommunity?.data?.imgSrc} rounded='36px' size={"97px"} />
                {/* <Box pos={"absolute"} bottom={"2"} right={"0"} >
                    <PhotoIcon />
                </Box> */}

                {/* <Button width='100%' height='30px' variant={'solid'} isLoading={updateGroup.isLoading} onClick={handleUpdateGroup} >Save</Button> */}
            </Box>
            <Text fontWeight={"700"} fontSize={"18px"} mt={"2"} >{activeCommunity?.data?.name}</Text>
            <Text color={"#2E2B2BB2"} pb={"6"} fontSize={"12px"} >{activeCommunity?.data?.memberCount} Members</Text>
            <Flex w={"fit-content"} gap={"3"} pb={"6"} >
                {!self && (
                    <Button w={"76px"} bgColor={mainBackgroundColor} h={"64px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"0px"} rounded={"12px"} style={{ boxShadow: "0px 1px 3px 1px #0000001A" }} isLoading={leaveGroup?.isLoading} isDisabled={leaveGroup?.isLoading} onClick={() => leaveGroup.mutate()} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} >
                        <Flex justifyContent={"center"} alignItems={"center"} w={"30px"} h={"30px"} >
                            <ExitButton />
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"13px"} textAlign={"center"} color={"red"} >Leave</Text>
                    </Button>
                )}
                {self && (
                    <Button w={"76px"} bgColor={mainBackgroundColor} h={"64px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"0px"} rounded={"12px"} style={{ boxShadow: "0px 1px 3px 1px #0000001A" }} isLoading={deleteGroup?.isLoading} isDisabled={deleteGroup?.isLoading} onClick={() => deleteGroup.mutate()} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} >

                        <Flex justifyContent={"center"} alignItems={"center"} w={"30px"} h={"30px"} >
                            <DeleteButton />
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"13px"} color={"red"} textAlign={"center"} >Delete</Text>
                    </Button>
                )}
                <ShareEvent community={true} type='COMMUNITY' id={activeCommunity?.id} showText={false} />
                {self && (
                    <Button onClick={() => setTab(true)} w={"76px"} bgColor={mainBackgroundColor} h={"64px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"0px"} rounded={"12px"} style={{ boxShadow: "0px 1px 3px 1px #0000001A" }} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} >
                        <Flex justifyContent={"center"} alignItems={"center"} w={"30px"} h={"30px"} >
                            <EditButton />
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"13px"} textAlign={"center"} color={"#5D70F9"} >Edit</Text>
                    </Button>
                )}
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
