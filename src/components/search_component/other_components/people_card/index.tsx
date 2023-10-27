import AddOrRemoveUserBtn from '@/components/sharedComponent/add_remove_user_btn'
import UserImage from '@/components/sharedComponent/userimage' 
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    person: any
}

function PeopleCard(props: Props) {
    const {
        person
    } = props  

	const [isFriend, setisFriend] = React.useState(person?.joinStatus)

    return (
        <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"} py={"8"} borderBottomWidth={"1px"} p={"4"} >
            <Flex width={"fit-content"} gap={"4"} alignItems={"center"} >
                <UserImage data={person} size={50} font='[30px]'  />
                <Box>
                    <Text fontSize={"20px"} fontWeight={"medium"} >{person?.firstName} {person?.lastName}</Text>
                    <Text fontSize={"sm"} fontWeight={"semibold"} color={"brand.chasescrollTextGrey2"} >{person?.username}</Text>
                </Box>
            </Flex> 
            <AddOrRemoveUserBtn width='160px' name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnected": "Disconnected": "Connect"} setJoinStatus={setisFriend} user_index={person?.userId} />
        </Flex>
    )
}

export default PeopleCard
