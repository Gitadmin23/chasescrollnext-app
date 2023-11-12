import { THEME } from '@/theme'
import { Box, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, VStack, Image } from '@chakra-ui/react'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import React from 'react'
import { useImageModalState } from './imageModalState';
import { IMAGE_URL } from '@/services/urls';

function ImageModal() {
  const [len, setLen] = React.useState(0);
  const [currentInx, setCurrentInx] = React.useState(0);
  const { images, setAll, isOpen } = useImageModalState((state) => state);

  React.useEffect(() => {
    setLen(images.length);
  }, [images]);

  const handleForwardMovement = React.useCallback(() => {
    if (currentInx !== len) {
      setCurrentInx(prev => prev++);
    }
  }, [currentInx, len])

  const handleBackwardMovement = React.useCallback(() => {
    if (currentInx !== 0) {
      setCurrentInx(prev => prev--);
    }
  }, [currentInx]);

  return (
    <Modal isOpen={isOpen} onClose={() => setAll({ isOpen: false })} isCentered size={'2xl'}>
      <ModalOverlay />
      <ModalContent bg={'transparent'} height={'450px'} shadow={'none'} overflow={'hidden'}>
        <ModalCloseButton size='lg' color={'white'} />
        <ModalBody bg='transparent'>
          {/* MAIN AREA */}
        <HStack width={'100%'} height={'100%'}>

            { len < 2 && (
              <VStack onClick={handleBackwardMovement} width={'50px'} height={'100%'} justifyContent={'center'}>
                <VStack width={'40px'} height={'40px'} borderRadius={'20px'} justifyContent={'center'} alignItems={'center'} bg='white'>
                  <ArrowLeft2 size={'25px'} color={THEME.COLORS.chasescrollButtonBlue} variant='Outline' />
                </VStack>
              </VStack>
            )}

            {/* MAIN AREA FOR IMAGE */}
            <Box flex='1' bg='red' width={'100%'} height={'450px'} borderRadius={'20px'} overflow={'hidden'}>

              { images.length > 0 && (
                <>
                  { images[currentInx].startsWith('https://') && <Image alt='img' src={images[currentInx]} width='100%' height={'450px'} objectFit={'cover'} />}
              
                  { !images[currentInx].startsWith('https://') && <Image alt='img' src={`${IMAGE_URL}${images[currentInx]}`} width='100%' height={'450px'} objectFit={'cover'} />}
                </>
              )}

            </Box>

            { len < 2 && (
              <VStack onClick={handleForwardMovement} width={'50px'} height={'100%'} justifyContent={'center'}>
                <VStack width={'40px'} height={'40px'} borderRadius={'20px'} justifyContent={'center'} alignItems={'center'} bg='white'>
                  <ArrowRight2 size={'25px'} color={THEME.COLORS.chasescrollButtonBlue} variant='Outline' />
                </VStack>
              </VStack>
            )}
            
        </HStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ImageModal