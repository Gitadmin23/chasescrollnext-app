import React, { useState } from 'react'

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { AxiosError } from 'axios';
import image from 'next/image';
import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';

const cred = {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY as string
}

const AWSHook = () => {
    const [loading, setLoading] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<Array<any>>([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const toast = useToast()
    const userId = localStorage.getItem('user_id') + "";


    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: {
            file: any,
            payload: any
        }) => httpService.post(URLS.UPLOAD_IMAGE_ARRAY + "/" + userId, data?.payload,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                },
                onUploadProgress: (progressEvent: any) => {
                    const percentage = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentage); // Update progress
                },
            }
            ),
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
        onSuccess: (data: any) => {
            console.log(data?.data);
            setLoading(false)
            const fileArray = Object.values(data?.data);

            console.log(fileArray);
            
            // let urls = fileArraymap((r: any) => ({ file: r.Key, url: r.Location }));
            // results.
            setUploadedFile([...fileArray]);
        }
    });

    const fileUploadHandler = (files: any) => {
        console.log(files);
        setLoading(true);
        console.time('upload');


        const fd = new FormData();
        Array.from(files).map((file: any) => {
            fd.append("files[]", file);
        })
        uploadImage.mutate({
            file: files,
            payload: fd
        })

        // Array.from(files).map((file) => {



        // const params = {
        //     Bucket: 'chasescroll-videos',
        //     Key: file.name,
        //     Body: file,
        //     ContentType: 'application/octet-stream',
        // };

        // return new Promise((resolve, reject) => {
        //     const upload = new Upload({
        //         client: new S3Client({
        //             region: 'eu-west-2',
        //             credentials: cred,
        //         },),
        //         leavePartsOnError: false,
        //         params: params,
        //     });

        //     // upload.on("httpUploadProgress", (progres) => console.log(progres))

        //     upload.done()
        //         .then(
        //             (data) => resolve(data),
        //             (error) => reject(error)
        //         );
        // });
        // });

        // Promise.all(uploadPromises)
        //     .then((results) => {
        //         let urls = results.map((r: any) => ({ file: r.Key, url: r.Location }));

        //         setUploadedFile([...urls, ...uploadedFile]);
        //         setLoading(false);
        //         console.timeEnd('upload');
        //     })
        //     .catch((error) => {
        //         console.error('Error uploading files:', error);
        //         setLoading(false);
        //     });
    };

    const reset = () => {
        setUploadedFile([]);
    }

    const deleteFile = (index: number) => {
        setUploadedFile(prev => prev.filter((_, i) => index !== i));
    }


    return ({ loading, uploadedFile, fileUploadHandler, reset, deleteFile, uploadProgress, setUploadProgress })
}

export default AWSHook