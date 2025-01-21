import { useState } from 'react' 
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { AxiosError } from 'axios';
import image from 'next/image';
import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';  

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

    const compressVideo = async (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.playsInline = true;
            video.muted = true;

            // Set up video source
            const url = URL.createObjectURL(file);
            video.src = url;

            video.onloadedmetadata = () => {
                // Log original video dimensions
                console.log('Original video resolution:', {
                    width: video.videoWidth,
                    height: video.videoHeight,
                    aspectRatio: (video.videoWidth / video.videoHeight).toFixed(2)
                });

                // Create canvas for video frames
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d')!;
                const stream = canvas.captureStream();

                // Set dimensions (720p)
                canvas.width =  (video.videoWidth * 720)/ video.videoHeight;
                canvas.height = 720;

                console.log('Compressed video resolution:', {
                    width: canvas.width,
                    height: canvas.height,
                    aspectRatio: (canvas.width / canvas.height).toFixed(2)
                });

                // Configure MediaRecorder
                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'video/webm;codecs=vp8',
                    videoBitsPerSecond: 2000000 // 2 Mbps
                });

                const chunks: Blob[] = [];
                mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const compressedFile = new File([blob], file.name, { type: 'video/webm' });
                    URL.revokeObjectURL(url);
                    resolve(compressedFile);
                };

                // Start recording
                mediaRecorder.start();
                video.play();

                // Process video frames
                const processFrame = () => {
                    if (video.ended) {
                        mediaRecorder.stop();
                        return;
                    }
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    requestAnimationFrame(processFrame);
                };

                video.onplay = () => requestAnimationFrame(processFrame);
            };

            video.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Video load failed'));
            };
        });
    };

    const fileUploadHandler = async (files: any) => {
        setLoading(true);
        const processedFiles = [];

        try {
            for (const item of files) {
                if (item.type.startsWith('video')) {
                    const compressedVideo = await compressVideo(item);
                    processedFiles.push(compressedVideo);
                } else {
                    processedFiles.push(item);
                }
            }

            const fd = new FormData();
            processedFiles.forEach((file) => {
                fd.append("files[]", file);
            });
            
            uploadImage.mutate({
                file: processedFiles,
                payload: fd
            });

        } catch (error) {
            console.error("Error:", error);
            toast({
                title: 'Error',
                description: 'File processing failed: ' + (error as Error).message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        } finally {
            // setLoading(false);
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
