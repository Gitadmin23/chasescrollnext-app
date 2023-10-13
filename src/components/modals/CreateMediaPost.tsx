import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalContent } from '@chakra-ui/react';
import SelectImages from './mediapostPages/SelectImages';
import ShowImages from './mediapostPages/ShowImages';
import Success from './mediapostPages/Success';

interface IProps {
    isOpen: boolean;
    onClose: () => void
}

function CreateMediaPost({isOpen, onClose}:IProps) {
    const [stage, setStage] = React.useState(1);
    const [files, setFiles] = React.useState<File[]>([]);

    const handleImagePicked = React.useCallback((Files: FileList, goNext?: boolean) => {
        console.log(Files)
        if (goNext) {
            const arrs: File[] = [];
            for (let i = 0; i < Files.length; i++) {
                arrs.push(Files[i]);
            }
            setFiles(prev => [...prev, ...arrs]);
            setStage(prev => prev+1);
            return;
        }
        const arrs: File[] = [];
            for (let i = 0; i < Files.length; i++) {
                arrs.push(Files[i]);
            }
            setFiles(prev => [...prev, ...arrs]);
    }, []);

    const handleSetStage = React.useCallback((page: number) => {
        setStage(page);
    }, []);

    const emptyFiles = React.useCallback(() => {
        setFiles([]);
    }, [])

    const handleSwitch = React.useCallback(() => {
        switch(stage) {
            case 1: {
                return <SelectImages setImage={handleImagePicked} />
            }
            case 2: {
                return <ShowImages setEmpty={emptyFiles} stage={stage}  handleStage={handleSetStage} files={files as any} setImage={handleImagePicked} />
            }
            case 4: {
                return <Success onClose={onClose} />
            }
            default: {
                return <ShowImages setEmpty={emptyFiles} stage={stage} handleStage={handleSetStage} files={files as any} setImage={handleImagePicked} />
            }
        }
    }, [stage, handleImagePicked, emptyFiles, handleSetStage, files, onClose]);


  return (
    <Modal isOpen={isOpen} onClose={() => {
        setStage(1);
        setFiles([]);
        onClose()
        }} closeOnEsc={true} closeOnOverlayClick={true} size='md' isCentered>
        <ModalOverlay />
        <ModalContent width={'100%'} height={'600px'} bg='white' padding='0px' overflow={'hidden'} borderRadius={'10px'}>
            <ModalBody width='100%' height='100%' padding='0px' overflow={'hidden'}>
                {handleSwitch()}
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default CreateMediaPost