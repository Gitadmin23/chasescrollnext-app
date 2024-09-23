import CustomText from "@/components/general/Text";
import { INotification } from "@/models/Notifications";
import {
  Box,
  HStack,
  useColorMode,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import useModalStore from "@/global-state/useModalSwitch";
import UserImage from "../sharedComponent/userimage";
import useNotificationHook from "@/hooks/useNotificationHook";

function NotificationCard({ notification }: { notification: INotification }) {

  const router = useRouter();
  const { userId } = useDetails((state) => state);

  const {
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
    headerTextColor,
  } = useCustomTheme();

  const { colorMode } = useColorMode();
  const { setNotifyModal } = useModalStore((state) => state)
  const { joinEvent, rejectEvent, markAsRead, setIndex, setStatus, status } = useNotificationHook()

  useEffect(() => {
    setIndex(notification?.id)
    setStatus(notification?.status)
  }, [])

  const handleClick = () => {
    switch (notification.type) {
      case "CHAT": {
        router.push(`/dashboard/chats?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "GROUP_REQUEST_ACCEPTED": {
        router.push(`/dashboard/community?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "EVENT": {
        router.push(`/dashboard/event/details/${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "FRIEND_REQUEST": {
        router.push(`/dashboard/profile/${userId}/network?tab=request`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "GROUP_REQUEST": {
        router.push(`/dashboard/community?tab=request`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "COLLABORATOR_MEMBER_INVITE_ACCEPTED" : {
        router.push(`/dashboard/event/details/${notification.typeID}`)
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      } 
      case "ADMIN_MEMBER_INVITE_ACCEPTED": {
        router.push(`/dashboard/event/details/${notification.typeID}`)
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      } 
      case "GROUP": {
        router.push(`/dashboard/community?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      default: {
        break;
      }
    } 
  };

  return (
    <HStack
      as={"button"}
      onClick={handleClick}
      textAlign={"left"}
      // alignItems={"center"}
      spacing={0}
      justifyContent={"space-between"}
      width="100%"
      height={"auto"}
      paddingY={"10px"}
      borderBottomWidth={"1px"}
      borderBottomColor={borderColor}
      paddingX="10px"
      bg={
        status === "UNREAD"
          ? mainBackgroundColor
          : secondaryBackgroundColor
      }
    >
      <Box width={"fit-content"} >
        <UserImage size={"50px"} border={"2px"} image={notification?.createdBy?.data?.imgMain.value} data={notification?.createdBy} />
      </Box>
      <Flex
        w={"full"} flexDir={"column"}
        paddingX="10px"
      >
        <CustomText
          fontSize={"14px"}
          fontFamily={"DM-Medium"}
          color={
            colorMode === "light"
              ? "brand.chasescrollButtonBlue"
              : headerTextColor
          }
        >
          {notification.title?.replaceAll("Collaborator", "Volunteer")?.replaceAll("collaborator", "Volunteer")}
        </CustomText>
        {(notification?.type === "ADMIN_MEMBER_INVITE_REQUEST" || notification?.type === "COLLABORATOR_MEMBER_INVITE_REQUEST") ? (
          <CustomText fontSize={"12px"} lineHeight={"17px"} whiteSpace="break-spaces" fontFamily={"DM-Regular"}>
            {notification.message?.replaceAll("Collaborator", "volunteer")?.replaceAll("collaborator", "volunteer")}
          </CustomText>
        ) : (
          <CustomText fontSize={"12px"} lineHeight={"17px"} whiteSpace="break-spaces" fontFamily={"DM-Regular"}>
            {notification.message.length > 40
              ? notification.message.substring(0, 40) + "..."
              : notification.message}
          </CustomText>
        )}
        <Flex gap={"8"} mt={"1"} alignItems={"center"} >
          {((notification?.type === "ADMIN_MEMBER_INVITE_REQUEST" || notification?.type === "COLLABORATOR_MEMBER_INVITE_REQUEST") && status === "UNREAD") && (
            <Flex gap={"3"} >
              <Button isLoading={joinEvent?.isLoading} isDisabled={joinEvent?.isLoading} onClick={() => joinEvent.mutate({
                id: notification.typeID,
                "resolve": true
              })} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: primaryColor }} color={"white"} bgColor={primaryColor} borderWidth={"1px"} borderColor={primaryColor} px={"6"} >Accept</Button>
              <Button isLoading={rejectEvent?.isLoading} isDisabled={rejectEvent?.isLoading} onClick={() => rejectEvent.mutate({
                id: notification?.typeID,
                "resolve": false
              })} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} color={primaryColor} bgColor={mainBackgroundColor} borderWidth={"1px"} borderColor={borderColor} px={"6"} >Decline</Button>
            </Flex>
          )}
          <CustomText fontSize={"10px"} fontFamily={"DM-Regular"}>
            {moment(notification.createdDate).fromNow(false)}
          </CustomText>
        </Flex>
      </Flex>
    </HStack>
  );
}

export default NotificationCard;
