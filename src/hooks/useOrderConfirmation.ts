import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";



const useOrderConfirmation = () => {

    const toast = useToast()

    const rentalConfirm = useMutation({
        mutationFn: (data: any) =>
            httpService.post(
                `/rental/markAsDone/${data}`, {}
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
                `/orders/markAsPaid/${data}`, {}
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

    return { 
        rentalConfirm,
        serviceConfirm,
        productConfirm,
    };
}

export default useOrderConfirmation