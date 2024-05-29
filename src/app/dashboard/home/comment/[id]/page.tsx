"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Textarea,
  VStack,
  useToast,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useDetails } from "@/global-state/useUserDetails";
import { THEME } from "@/theme";
import CustomText from "@/components/general/Text";
import { useMutation, useQuery, useQueryClient } from "react-query";
import httpService from "@/utils/httpService";
import { IMAGE_URL, URLS } from "@/services/urls";
import CommentBox from "@/components/home/Comment";
import { useRouter } from "next/navigation";
import { IComment } from "@/models/Comment";
import _, { uniq, uniqBy } from "lodash";
import Link from "next/link";
import useCustomTheme from "@/hooks/useTheme";

function Comment() {
  const [userComments, setUserComments] = React.useState<IComment[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [commentInput, setCommentInput] = React.useState("");
  const router = useRouter();

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const { firstName, lastName, userId, username, user } = useDetails(
    (state) => state,
  );
  const params = useParams();
  const post = params;
  const queryClient = useQueryClient();
  const toast = useToast();

  const intObserver = React.useRef<IntersectionObserver>();

  const { isLoading } = useQuery(
    [`getComments-${post?.id}`, post?.id, page],
    () =>
      httpService.get(`${URLS.GET_ALL_COMMENTS}`, {
        params: {
          page,
          postID: post?.id,
        },
      }),
    {
      onSuccess: (data) => {
        const arr = uniqBy([...userComments, ...data.data.content], "id");
        setUserComments(arr);
        setHasNextPage(data.data.last ? false : true);
      },
    },
  );

  const deleteComment = (id: string) => {
    const arr = userComments.filter((item) => item.id !== id);
    setUserComments(arr);
  };

  const addComment = useMutation({
    mutationFn: (data: any) => httpService.post("/feed/add-comment", data),
    onSuccess: () => {
      queryClient.invalidateQueries([`getComments-${post?.id}`]);
      setCommentInput("");
      toast({
        title: "Success",
        description: "Comment added",
        duration: 5000,
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    },
  });

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

  const addCommentNew = React.useCallback(async () => {
    if (commentInput === "" || addComment.isLoading) return;
    addComment.mutate({ postID: post?.id, comment: commentInput });
  }, [commentInput, addComment, post?.id]);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (commentInput === "" || addComment.isLoading) return;
        addComment.mutate({ postID: post?.id, comment: commentInput });
      }
    },
    [commentInput, addComment, post?.id],
  );

  return (
    <VStack
      width={"100%"}
      height={"100%"}
      padding="20px"
      bg={secondaryBackgroundColor}
    >
      {/* HEADER */}
      <HStack width={"100%"} spacing={[3, 10]}>
        <FiChevronLeft
          fontSize="25px"
          color={bodyTextColor}
          onClick={() => router.back()}
        />
        <HStack width={"100%"}>
          <Link href={`/dashboard/profile/${user?.userId}`}>
            <Box
              width="42px"
              height="42px"
              borderRadius={"20px 0px 20px 20px"}
              borderWidth={"2px"}
              borderColor={"#D0D4EB"}
              overflow={"hidden"}
            >
              {user?.data.imgMain.value === null && (
                <VStack
                  width={"100%"}
                  height="100%"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CustomText fontFamily={"DM-Regular"}>
                    {user?.firstName[0].toUpperCase()}
                    {user?.lastName[0].toUpperCase()}
                  </CustomText>
                </VStack>
              )}
              {user?.data.imgMain.value && (
                <>
                  {user?.data?.imgMain?.value.startsWith("https://") && (
                    <Image
                      src={`${user?.data.imgMain.value}`}
                      alt="image"
                      width={"100%"}
                      height={"100%"}
                      objectFit={"cover"}
                    />
                  )}

                  {!user?.data?.imgMain?.value.startsWith("https://") && (
                    <Image
                      src={`${IMAGE_URL}${user?.data.imgMain.value}`}
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

          <InputGroup>
            <InputRightElement>
              {!addComment.isLoading && (
                <CustomText
                  cursor="pointer"
                  fontFamily={"Satoshi-Medium"}
                  marginRight={"20px"}
                  onClick={addCommentNew}
                  color={
                    colorMode === "light"
                      ? THEME.COLORS.chasescrollButtonBlue
                      : bodyTextColor
                  }
                >
                  Send
                </CustomText>
              )}
              {addComment.isLoading && <Spinner colorScheme="blue" size="sm" />}
            </InputRightElement>
            <Input
              value={commentInput}
              onKeyDown={handleKeyDown}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment"
              bg={mainBackgroundColor}
              width={"100%"}
              borderWidth={1}
              borderColor={borderColor}
            />
          </InputGroup>
        </HStack>
      </HStack>

      {/* CCOMMENTS */}
      <Box
        width={"100%"}
        height={"100%"}
        overflowX={"hidden"}
        overflowY={"auto"}
        marginTop={"30px"}
        paddingX={["0px", "65px"]}
      >
        {userComments.length > 0 &&
          userComments
            .filter((item) => item.user.data !== null)
            .map((item, index) => (
              <>
                {index === userComments.length - 1 ? (
                  <CommentBox
                    deleteComment={deleteComment}
                    ref={lastChildRef}
                    {...item}
                    key={index.toString()}
                  />
                ) : (
                  <CommentBox
                    deleteComment={deleteComment}
                    {...item}
                    key={index.toString()}
                  />
                )}
              </>
            ))}
        {isLoading && (
          <Flex
            flexDir={"column"}
            width={"100%"}
            height="50px"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner colorScheme="blue" size="sm" />
            <CustomText>Loading Comments</CustomText>
          </Flex>
        )}
      </Box>
    </VStack>
  );
}

export default Comment;
