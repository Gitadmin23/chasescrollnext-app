"use client"
import { useDetails } from "@/global-state/useUserDetails";
import InfiniteScrollerComponent from "@/hooks/infiniteScrollerComponent";
import useDebounce from "@/hooks/useDebounce";
import useCustomTheme from "@/hooks/useTheme";
import { IComment } from "@/models/Comment";
import { ICommunity } from "@/models/Communitty";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { URLS } from "@/services/urls";
import httpService from "@/utils/httpService";
import { useColorMode } from "@chakra-ui/react";
import { uniqBy } from "lodash";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCommunityPageState } from '@/components/Community/chat/state';


const useCommunity = () => {

    const [searchText, setSearchText] = React.useState('');
    const [postID, setpostID] = React.useState('');
    const [comment, setComment] = React.useState<string>('');
    const [commentData, setCommentData] = React.useState(Array<any>);
    const [showEmoji, setShowEmoi] = React.useState(false);
    const intObserver = React.useRef<IntersectionObserver>();
    const queryClient = useQueryClient();
  
    const { drawerOpen, setAll, activeCommunity, activeMessageId, commentHasNext, commentPage, comments } = useCommunityPageState((state) => state);

    const debounceValue = useDebounce(searchText, 500);
    const { userId } = useDetails((state) => state)

    const { results: communites, isLoading: loadingCommunity, ref: refCommunity, isRefetching: refectingCommunity } = InfiniteScrollerComponent({ url: `${URLS.JOINED_GROUPS}?userID=${userId}&searchText=${debounceValue ?? ""}`, limit: 15, filter: "id", newdata: debounceValue })

    // comment



    const getComments = useQuery(['getMessageComments', postID, commentPage], () => httpService.get(`${URLS.GET_ALL_COMMENTS}`, {
        params: {
            postID: postID,
            page: commentPage,
        }
    }), {
        enabled: postID !== null,
        onSuccess: (data) => {
            const item: PaginatedResponse<IComment> = data.data;
            if (item.content.length > 0) {
                if (item.content[0].id !== postID) {
                    console.log(item.content[0].id);
                    console.log(postID);
                    
                    setAll({ comments: item.content });
                } else {
                    if (comments.length > 0) {
                        const arr = [...comments, ...item?.content];
                        setAll({ comments: uniqBy(arr, 'id'), commentHasNext: item.last ? false : true })
                        setCommentData(uniqBy(arr, 'id'))
                        console.log();
                        
                    } else {
                        setAll({ comments: uniqBy(item?.content, 'id'), commentHasNext: item.last ? false : true })
                        setCommentData(uniqBy(item?.content, 'id'))
                        console.log(item?.content);
                    }
                }
            }
        },
        onError: () => { }
    }); 

    console.log(comments);
    

    // muatation
    const createComment = useMutation({
        mutationFn: (data: {
            postID: string,
            comment: string
        }) => httpService.post(`${URLS.ADD_COMMENT}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['getMessageComments']);
            queryClient.invalidateQueries([`getSinglePost-${activeMessageId}`]);
            setComment('');
        },
    });

    const commentlastChildRef = React.useCallback((post: any) => {
        if (getComments.isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && commentHasNext) {
                setAll({ commentPage: commentPage + 1 });
            }
        });
        if (post) intObserver.current.observe(post);
    }, [getComments.isLoading, commentHasNext, setAll, commentPage]);


    // functioons

    const handleCreateComment = (data: {
        postID: string,
        comment: string
    }) => {
        if (comment === '') return; 
        createComment.mutate(data);
    }

    return {
        communites,
        loadingCommunity,
        refectingCommunity,
        refCommunity,
        setSearchText,
        handleCreateComment,
        commentlastChildRef,
        getComments,
        comment,
        setComment,
        showEmoji,
        setShowEmoi,
        createComment,
        commentData,
        setpostID
    };
}

export default useCommunity