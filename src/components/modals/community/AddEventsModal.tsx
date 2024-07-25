import { useCommunityPageState } from "@/components/Community/chat/state";
// import EventDetails from '@/components/event_details_component';
import CustomText from "@/components/general/Text";
import { useDetails } from "@/global-state/useUserDetails";
import useDebounce from "@/hooks/useDebounce";
import { IEvent } from "@/models/Events";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { IMAGE_URL, URLS } from "@/services/urls";
import httpService from "@/utils/httpService";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
  useToast,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Spinner,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { uniqBy } from "lodash";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiSearch } from "react-icons/fi";
import { IoPin, IoPinSharp } from "react-icons/io5";
import { IoIosPin } from "react-icons/io";
import { AiOutlinePushpin } from "react-icons/ai";
import ModalLayout from "@/components/sharedComponent/modal_layout";
import { boolean } from "zod";
import useCustomTheme from "@/hooks/useTheme";
import EventImage from "@/components/sharedComponent/eventimage";
import { textLimit } from "@/utils/textlimit";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import EventLocationDetail from "@/components/sharedComponent/event_location";
import LoadingAnimation from "@/components/sharedComponent/loading_animation";
import { useCommunity } from "@/components/newcommunity";

function AddEventsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const { userId } = useDetails((state) => state);
  const [search, setSeearch] = React.useState("");
  const toast = useToast();
  const { events: savedEvents } = useCommunityPageState((state) => state);

  const {
    bodyTextColor,
    mainBackgroundColor,
    headerTextColor,
    secondaryBackgroundColor,
    primaryColor,
    borderColor
  } = useCustomTheme();
  const { colorMode } = useColorMode();
  const { communityEvent } = useCommunity()

  const debounceValue = useDebounce(search, 500);
  const { isLoading, isError } = useQuery(
    ["getMyEventsss", userId, debounceValue],
    () =>
      httpService.get(`${URLS.GET_EVENTS}`, {
        params: {
          // createdBy: userId,
          page: 0,
          eventName: debounceValue,
        },
      }),
    {
      onSuccess: (data) => {
        const item: PaginatedResponse<IEvent> = data.data;
        const ids = savedEvents.map((item) => item.id);
        setEvents(
          uniqBy(
            item.content.filter((item) => !communityEvent.includes(item.id)),
            "id",
          ),
        );
      },
      onError: () => { },
    },
  );

  const EventBox = ({ event }: { event: IEvent }) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { activeCommunity } = useCommunityPageState((state) => state);
    const { userId } = useDetails((state) => state);


    const {
      bodyTextColor,
      mainBackgroundColor,
      headerTextColor,
      secondaryBackgroundColor,
      primaryColor,
      borderColor
    } = useCustomTheme();
    const { colorMode } = useColorMode();

    const savedEvent = useMutation({
      mutationFn: (data: any) => httpService.post(`${URLS.SAVE_EVENT}`, data),
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: "Event saved!",
          status: "success",
          position: "top-right",
          duration: 5000,
        });
        
        // queryClient.invalidateQueries([`getAllMyEvents-${activeCommunity?.id}`]);
        // queryClient.invalidateQueries([`getMyEventsss`, userId]);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "An error occured while trying to save an event",
          status: "error",
          position: "top-right",
          duration: 5000,
        });
      },
    });
    return ( 
      <Flex w={"full"} alignItems={"center"} px={"2"} justifyContent={"space-between"} >
        <Flex gap={"3"} align={"center"} >
          <Flex width={"fit-content"} >
            <EventImage
              data={event}
              width={"100px"}
              height={"100px"}
            />
          </Flex>
          <Flex flexDir={"column"} >
            <Text fontSize={"18px"} fontWeight={"700"} >
              {textLimit(capitalizeFLetter(event.eventName), 13)}
            </Text>
            <Text fontSize={"14px"} fontWeight={"400"} >
              {textLimit(capitalizeFLetter(event.eventDescription), 60)}
            </Text>
            <EventLocationDetail
              iconsize={"14px"}
              fontWeight={"medium"}
              fontsize={"14px"}
              location={event?.location}
              locationType={event?.locationType}
              length={20}
            />
          </Flex>
        </Flex>
        <Button
          role="button"
          onClick={() =>
            savedEvent.mutate({
              eventID: event.id,
              typeID: activeCommunity?.id,
              type: "EVENT",
            })
          }
        >
          {savedEvent.isLoading ? (
            <Spinner size={"xs"} />
          ) : (
            <Flex
              w={"full"}
              color={"#5D70F9"}
              gap={"1px"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <AiOutlinePushpin />
              <Text fontSize={"10px"}>Pin</Text>
            </Flex>
          )}
        </Button>
      </Flex>
    );
  };


  return (
    <ModalLayout
      open={isOpen}
      size={"lg"}
      close={onClose}
      bg={mainBackgroundColor}
      title={
        <VStack
          paddingX="10px"
          width="100%"
          height={"100px"}
          borderBottomWidth={"1px"}
          borderBottomColor={"lightgrey"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          spacing={0}
        >
          <CustomText
            fontFamily={"DM-Bold"}
            fontSize={"20px"}
            color={bodyTextColor}
          >
            Events
          </CustomText>
          <CustomText
            fontFamily={"DM-Regular"}
            fontSize={"15px"}
            color={bodyTextColor}
          >
            Please select an event to add to your community
          </CustomText>
        </VStack>
      }
      closeIcon={true}
    >
      <Box width="100%" height="450px" overflowY={"auto"} paddingX="20px">
        <LoadingAnimation loading={isLoading} length={events?.length} >
        {events?.map((event: IEvent, index) => (
          <Flex key={index} w={"full"} py={"4"} borderBottomWidth={"1px"} borderBottomColor={borderColor} >
            <EventBox event={event} />
          </Flex>
        ))}
        </LoadingAnimation>
      </Box>
    </ModalLayout>
  );
}

export default AddEventsModal;
