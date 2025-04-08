import { ITag } from "@/models/product";
import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

const usePr = () => {

    const query = useQueryClient()
    const toast = useToast()

    const createPr = useMutation({
        mutationFn: (data: {
            eventID: string,
            affiliateType: string,
            percent: number
        }) =>
            httpService.put(
                `/events/create-pr-request?eventID=${data?.eventID}&affiliateType=&${data?.affiliateType}&percent=${data?.percent}`, {}
            ),
        onSuccess: (data: any) => {
            toast({
                title: "success",
                description: data?.data?.message,
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
            query?.invalidateQueries("all-events-details")

        },
        onError: () => { },
    });

    // Create Event From Draft
    const tagServiceAndRental = useMutation({
        mutationFn: (data: {
            "serviceCategories": Array<ITag>,
            "rentalCategories": Array<ITag>,
            "eventID": string,
            "state": string
        }) => httpService.post("/tags/create-request", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: "success",
                description: data?.data?.message,
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        }
    });

    // Create Event From Draft
    const createFundraising = useMutation({
        mutationFn: (data: {
            fundRaiserID: string,
            eventID: string,
            userID: string
        }) => httpService.post("/pinned-fundraisers/create", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: "success",
                description: data?.data?.message,
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });

            query?.invalidateQueries("all-donation")
        }
    });

    return {
        createPr,
        tagServiceAndRental,
        createFundraising
    };
}

export default usePr