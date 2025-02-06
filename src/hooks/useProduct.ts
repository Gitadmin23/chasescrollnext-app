import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import AWSHook from "./awsHook";
import useProductStore from "@/global-state/useCreateProduct";


const useProduct = (item: any, rental?: boolean) => {

    const toast = useToast()
    const [openRental, setOpenRental] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)

    const { fileUploadHandler, loading, uploadedFile, reset, deleteFile } = AWSHook();

    const validateItemProduct = (item: any) => {
        // List of required fields
        const requiredFields = [
            "creatorID",
            "name",
            "description",
            "price",
            "category",
            "quantity",
        ];

        // Check each field
        for (const field of requiredFields) {
            if (item[field] === "" || item[field] === null || item[field] === undefined) {
                return false; // Field is empty
            }
            console.log(field);

            // Special check for arrays (e.g., images)
            if (Array.isArray(item[field]) && item[field].length === 0) {
                return false; // Array is empty
            }
        }

        return true; // All fields are valid
    }; 
    
    const validateItemRental = (item: any) => {
        // List of required fields
        const requiredFields = [
            "userId",
            "name",
            "description",
            "price",
            "category", 
            "location",
            "maximiumNumberOfDays"
        ];

        // Check each field
        for (const field of requiredFields) {
            if (item[field] === "" || item[field] === null || item[field] === undefined) {
                return false; // Field is empty
            }
            console.log(field);

            // Special check for arrays (e.g., images)
            if (Array.isArray(item[field]) && item[field].length === 0) {
                return false; // Array is empty
            }
        }

        return true; // All fields are valid
    };
    const { image } = useProductStore((state) => state);

    const removeEmptyValues = (obj: any) => {
        const newObj: any = {};

        for (const key in obj) {
            // Check if the value is not empty
            if (
                obj[key] !== "" && // Exclude empty strings
                obj[key] !== null && // Exclude null
                obj[key] !== undefined && // Exclude undefined
                !(Array.isArray(obj[key]) && obj[key].length === 0) // Exclude empty arrays
            ) {
                newObj[key] = obj[key]; // Add non-empty values to the new object
            }
        }

        return newObj;
    };

    const handleSubmitProduce = (e: any) => {
        e.preventDefault();

        if (image.length === 0) {
            toast({
                title: "error",
                description: "Please Select An Image For Your Rental",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        } else {

            if (validateItemProduct(item)) {

                console.log("Item is valid. Submitting...");
                fileUploadHandler(image) 
                setOpenProduct(true)
                // Proceed with form submission

            } else {

                toast({
                    title: "error",
                    description: "Please fill all fields.",
                    status: "error",
                    isClosable: true,
                    duration: 5000,
                    position: "top-right",
                });
                console.log("Item has empty fields. Please fill all fields.");
            }
        }
    };

    const handleSubmitRental = (e: any) => {
        e.preventDefault();
        if (image.length === 0) {
            toast({
                title: "error",
                description: "Please Select An Image For Your Rental",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });

        } else if (validateItemRental(item)) {

            console.log("Item is valid. Submitting...");
            fileUploadHandler(image)
            setOpenRental(true)
            // Proceed with form submission
        } else {
            toast({
                title: "error",
                description: "Please fill all fields.",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
            console.log("Item has empty fields. Please fill all fields.");
        }
    };

    const createProduct = useMutation({
        mutationFn: (data: {
            "creatorID": "string",
            "name": "string",
            "description": "string",
            "images": [
                "string"
            ],
            "price": null,
            "category": "string",
            "quantity": null,
            "hasDiscount": true,
            "discountPrice": null,
            "publish": true
        }) =>
            httpService.post(
                `/products/create`, data
            ),
        onSuccess: (data: any) => {
            toast({
                title: "Create Product",
                description: "",
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        },
        onError: () => { },
    });

    const createRental = useMutation({
        mutationFn: (data: {
            "userId": "",
            "name": "",
            "description": "",
            "category": "",
            "location": "",
            "maximiumNumberOfDays": null,
            "price": null,
            "images": []
        }) =>
            httpService.post(
                `/rental/create`, data
            ),
        onSuccess: (data: any) => {
            // toast({
            //     title: "error",
            //     description: "Error occured ",
            //     status: "error",
            //     isClosable: true,
            //     duration: 5000,
            //     position: "top-right",
            // });
        },
        onError: () => { },
    });

    useEffect(() => {
        if (uploadedFile?.length > 0) {
            if (!rental) {
                createProduct?.mutate(removeEmptyValues({ ...item, images: uploadedFile }))
            } else {
                createRental?.mutate(removeEmptyValues({ ...item, images: uploadedFile }))
            }
        }
    }, [uploadedFile])

    return {
        handleSubmitProduce,
        createProduct,
        createRental,
        loading,
        handleSubmitRental,
        openRental,
        openProduct,
        setOpenProduct,
        setOpenRental
    };

}
export default useProduct