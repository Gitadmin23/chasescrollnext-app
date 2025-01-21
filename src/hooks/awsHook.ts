import React, { useRef, useState } from 'react'

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { AxiosError } from 'axios';
import image from 'next/image';
import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { set } from 'lodash';

const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
let loaded = false;

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

    const fileUploadHandler = async (files: any) => {

        setLoading(true);
        const compressedFiles = [];

        try {
            for (const item of files) {
                if (item.type.startsWith('video')) {
                    console.log('Original video:', item);

                    const compressedFile = await new Promise<File>((resolve, reject) => {
                        // Create video element
                        const video = document.createElement('video');
                        video.preload = 'metadata';
                        video.autoplay = true;
                        video.muted = true;

                        video.onloadedmetadata = () => {
                            // Create canvas
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d')!;

                            // Calculate dimensions to maintain aspect ratio at 720p
                            const targetHeight = 720;
                            const aspectRatio = video.videoWidth / video.videoHeight;
                            const width = Math.round(targetHeight * aspectRatio);

                            // Set dimensions
                            canvas.width = width;
                            canvas.height = targetHeight;

                            // Draw video frame
                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                            // Convert to blob with compression
                            canvas.toBlob(
                                (blob) => {
                                    if (blob) {
                                        const newFile = new File([blob],
                                            `compressed_${item.name}`,
                                            { type: 'video/mp4' }
                                        );

                                        console.log('Compression results:', {
                                            originalSize: `${(item.size / (1024 * 1024)).toFixed(2)} MB`,
                                            newSize: `${(newFile.size / (1024 * 1024)).toFixed(2)} MB`,
                                            ratio: `${((newFile.size / item.size) * 100).toFixed(2)}%`,
                                            dimensions: `${width}x720`
                                        });

                                        resolve(newFile);
                                    } else {
                                        reject(new Error('Compression failed'));
                                    }
                                },
                                'video/mp4',
                                0.6  // Slightly higher quality for 720p
                            );
                        };

                        video.onerror = () => reject(new Error('Video load failed'));
                        video.src = URL.createObjectURL(item);
                    });

                    console.log('Compressed file:', compressedFile);
                    compressedFiles.push(compressedFile);
                } else {
                    compressedFiles.push(item);
                }
            }

            console.log(compressedFiles);
            console.log(files);

            // Handle non-video files
            const fd = new FormData();
            compressedFiles.forEach((file) => {
                fd.append("files[]", file);
            });
            uploadImage.mutate({
                file: files,
                payload: fd
            });

        } catch (error) {
            console.error("Error:", error);
            toast({
                title: 'Error',
                description: 'Video compression failed: ' + (error as Error).message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
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
