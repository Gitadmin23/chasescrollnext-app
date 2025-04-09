import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";



const useOrderConfirmation = () => {

    const toast = useToast()

    const query = useQueryClient()

    const rentalConfirm = useMutation({
        mutationFn: (data: any) =>
            httpService.post(
                `/reciept/markAsReceived/${data}`, {}
            ),
        onSuccess: (data: any) => {
            console.log(data?.data);
            query?.invalidateQueries("order")
            toast({
                title: "Successful",
                description: "",
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            }); 
        },
        onError: () => { },
    });


    const serviceConfirm = useMutation({
        mutationFn: (data: {
            "bookingID": string,
            "completedWithIssues": boolean,
            "userID": string
        }) =>
            httpService.put(
                `/booking/user-mark-as-done`, data
            ),
        onSuccess: (data: any) => {
            console.log(data?.data);

            toast({
                title: "Successful",
                description: "",
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            }); 
        },
        onError: () => { },
    });

    const productConfirm = useMutation({
        mutationFn: (data: any) =>
            httpService.post(
                `/orders/markAsReceived/${data}`, {}
            ),
        onSuccess: (data: any) => {
            console.log(data?.data);
            query?.invalidateQueries("order")
            toast({
                title: "Successful",
                description: "",
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            }); 
        },
        onError: () => { },
    });

    return { 
        rentalConfirm,
        serviceConfirm,
        productConfirm,
    };
}

export default useOrderConfirmation