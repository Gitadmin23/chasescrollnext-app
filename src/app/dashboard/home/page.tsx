"use client";
import CustomButton from "@/components/general/Button";
import CustomText from "@/components/general/Text";
import ThreadCard from "@/components/home/ThreadCard";
import CreateMediaPost from "@/components/modals/CreateMediaPost";
import { useDetails } from "@/global-state/useUserDetails";
import { IMediaContent, IMediaPost } from "@/models/MediaPost";
import { IMAGE_URL, URLS } from "@/services/urls";
import { THEME } from "@/theme";
import httpService from "@/utils/httpService";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Spinner,
  Textarea,
  VStack,
  useToast,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import lodash, { uniq } from "lodash";
import React from "react";
import { FiSend, FiImage } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Heart,
  MessageAdd,
  Share,
  DocumentDownload,
  Send2,
  Image as ImgIcon,
} from "iconsax-react";
import { IUser } from "@/models/User";
import ImageModal from "@/components/general/ImageModal";
import PromotionCreationModal from "@/components/modals/promotions/CreatePromitionModal";
import { useShowHomeModal } from "./state";
import Link from "next/link";
import useCustomTheme from "@/hooks/useTheme";
import UpcomingEvents from "@/components/home/UpcomingEvents";

function Home() {
  const [page, setPage] = React.useState(0);
  const [post, setPost] = React.useState("");
  const [posts, setPosts] = React.useState<IMediaContent[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [newIttem, setNew] = React.useState<IMediaContent[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const { showModal: showPromotion, setShowModal: setShow } = useShowHomeModal(
    (state) => state,
  );

  const {
    firstName,
    lastName,
    userId,
    username,
    user: Details,
  } = useDetails((state) => state);

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
    headerTextColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const [user, setUser] = React.useState<IUser | null>(null);

  const intObserver = React.useRef<IntersectionObserver>();
  const toast = useToast();
  const queryClient = useQueryClient();

  const getUser = useQuery(
    ["getUserDets", userId],
    () => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`, {}),
    {
      onSuccess: (data) => {
        setUser(data.data);
        console.log(data.data);
      },
    },
  );

  const { isLoading, isError, refetch } = useQuery(
    ["getPosts", page],
    () =>
      httpService.get(`${URLS.GET_PUBLIC_POST}`, {
        params: {
          page,
        },
      }),
    {
      onSuccess: (data) => {
        setPosts(uniq([...posts, ...data?.data?.content]));
        setHasNextPage(data.data.last ? false : true);
      },
    },
  );

  const lastChildRef = React.useCallback(
    (post: any) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPage((prev) => prev + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage, setPage],
  );

  //MUTATIONS
  const { mutate } = useMutation({
    mutationFn: () =>
      httpService.get(`${URLS.GET_POSTS}`, {
        params: {
          page: 0,
        },
      }),
    onSuccess: (data: any) => {
      console.log(data.data.content[0]);
      const item: IMediaPost = data.data as IMediaPost;
      newIttem.unshift(item.content[0]);
      setNew(lodash.uniq(newIttem));
    },
  });

  const createPostMutation = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: () => {
      toast({
        title: "Post Created",
        description: "Your post has been created an is live",
        duration: 5000,
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      setPost("");
      mutate();
      // setShow(true);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An eror occured while trying to create post",
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const handlePostCreation = React.useCallback(() => {
    if (post.length < 1) return;
    createPostMutation.mutate({
      text: post,
      type: "NO_IMAGE_POST",
      sourceId: userId,
      isGroup: false,
    });
  }, [createPostMutation, post, userId]);

  return (
    <HStack
      width="full"
      h={"full"}
      overflow={"hidden"}
      alignItems={"flex-start"}
      bg={mainBackgroundColor}
      justifyContent={["flex-start", "center"]}
    >
      {/* MODAL */}
      <CreateMediaPost
        mutate={mutate}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <PromotionCreationModal
        isOpen={showPromotion}
        onClose={() => setShow(false)}
        type="POST"
      />

      <Box overflowY={"hidden"} height={"full"} width={["100%", "40%"]}>
        <VStack
          width={"100%"}
          height="180px"
          paddingTop="20px"
          paddingLeft={"20px"}
          paddingRight={["20px", "0px"]}
          overflowY={"hidden"}
          bg={mainBackgroundColor}
        >
          {/* TEXTBOX */}
          <VStack
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            width="100%"
            height="150px"
            bg={secondaryBackgroundColor}
            borderWidth={0}
            shadow={"md"}
            borderColor={"lightgrey"}
            borderRadius={"10px"}
            padding="10px"
          >
            <HStack width="100%" height={"90px"}>
              <Link href={`/dashboard/profile/${Details?.userId}`}>
                <Box
                  width="32px"
                  height="32px"
                  borderRadius={"20px 0px 20px 20px"}
                  borderWidth={"2px"}
                  borderColor={"#D0D4EB"}
                  overflow={"hidden"}
                >
                  {Details?.data?.imgMain?.value === null && (
                    <VStack
                      width={"100%"}
                      height="100%"
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {Details?.username && (
                        <CustomText fontFamily={"DM-Regular"}>
                          {Details?.username[0].toUpperCase()}
                        </CustomText>
                      )}
                    </VStack>
                  )}
                  {Details?.data.imgMain.value !== null && (
                    <>
                      {Details?.data?.imgMain?.value.startsWith("https://") && (
                        <Image
                          src={`${Details?.data.imgMain.value}`}
                          alt="image"
                          width={"100%"}
                          height={"100%"}
                          objectFit={"cover"}
                        />
                      )}

                      {!Details?.data?.imgMain?.value.startsWith(
                        "https://",
                      ) && (
                        <Image
                          src={`${IMAGE_URL}${Details?.data.imgMain.value}`}
                          alt="image"
                          width={"100%"}
                          height={"100%"}
                          objectFit={"cover"}
                        />
                      )}
                    </>
                  )}
                </Box>
              </Link>

              <Textarea
                bg={mainBackgroundColor}
                borderWidth={"0px"}
                borderColor={borderColor}
                fontFamily={"DM-Regular"}
                fontSize={"14px"}
                flex={"1"}
                width="100%"
                placeholder={`What's on your mind @${username.length > 10 ? username.substring(0, 10) + "..." : username ?? ""}`}
                _placeholder={{ color: bodyTextColor }}
                color={
                  colorMode === "light"
                    ? THEME.COLORS.chasescrollButtonBlue
                    : bodyTextColor
                }
                resize={"none"}
                value={post}
                onChange={(e) => setPost(e.target.value)}
              ></Textarea>
              {!createPostMutation.isLoading && (
                <Send2
                  onClick={() => handlePostCreation()}
                  size={"30px"}
                  color={
                    colorMode === "light"
                      ? THEME.COLORS.chasescrollButtonBlue
                      : bodyTextColor
                  }
                />
              )}
              {createPostMutation.isLoading && (
                <Spinner
                  size={"sm"}
                  color={
                    colorMode === "light"
                      ? THEME.COLORS.chasescrollButtonBlue
                      : bodyTextColor
                  }
                />
              )}
            </HStack>

            <HStack>
              <ImgIcon
                size={25}
                color={
                  colorMode === "light"
                    ? THEME.COLORS.chasescrollButtonBlue
                    : bodyTextColor
                }
              />
              <CustomText
                onClick={() => setShowModal(true)}
                fontFamily={"DM-Bold"}
                fontSize={"sm"}
                cursor="pointer"
                color={
                  colorMode === "light"
                    ? "brand.chasescrollButtonBlue"
                    : bodyTextColor
                }
              >
                Add Photos /Video in your post
              </CustomText>
            </HStack>
          </VStack>
        </VStack>

        <Box
          flex="1"
          width={"full"}
          height={"83%"}
          overflow={"auto"}
          paddingX="20px"
          paddingTop="0px"
          paddingBottom={"520px"}
        >
          {!isLoading && isError && (
            <VStack width={"100%"} height={"100px"} justifyItems={"center"}>
              <CustomText>An error occured please retry</CustomText>
              <CustomButton
                isLoading={isLoading}
                text="Retry"
                onClick={() => refetch()}
                backgroundColor={THEME.COLORS.chasescrollButtonBlue}
              />
            </VStack>
          )}
          <VStack width={"100%"} height={["100%", "80%"]}>
            {newIttem.map((item, i) => (
              <ThreadCard post={item} key={i.toString()} />
            ))}
            {posts.map((item, i) => {
              if (i === post?.length - 1) {
                return (
                  <ThreadCard
                    key={i.toString()}
                    post={item}
                    ref={lastChildRef}
                  />
                );
              } else {
                return (
                  <>
                    <ThreadCard
                      key={i.toString()}
                      post={item}
                      ref={lastChildRef}
                    />
                    {i % 9 === 0 && (
                      <Box
                        display={["block", "none"]}
                        width="100%"
                        height={"500px"}
                        marginY={"40px"}
                      >
                        <UpcomingEvents />
                      </Box>
                    )}
                  </>
                );
              }
              // return <ThreadCard key={i.toString()} post={item} />;
            })}
          </VStack>
        </Box>
      </Box>

      <Box
        display={["none", "block"]}
        width={["0%", "40%"]}
        height={"full"}
        bg={mainBackgroundColor}
        marginLeft={"20px"}
        paddingTop={"50px"}
      >
        <UpcomingEvents />
      </Box>
    </HStack>
  );
}

export default Home;
