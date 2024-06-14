import useCustomTheme from "@/hooks/useTheme";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

type props = {
  open: any;
  close: any;
  size?: any;
  bg?: any;
  rounded?: boolean;
  children: React.ReactNode;
  title?: any;
  titlecolor?: string;
  scrollBehavior?: "outside" | "inside";
  closeIcon?: boolean;
  titleAlign?: any;
};

export default function ModalLayout({
  open,
  close,
  closeIcon,
  children,
  size,
  bg,
  rounded,
  title,
  scrollBehavior,
  titlecolor,
  titleAlign,
}: props) {
  const {
    bodyTextColor,
    mainBackgroundColor,
    headerTextColor,
    secondaryBackgroundColor,
    primaryColor,
  } = useCustomTheme();
  const { colorMode } = useColorMode();
  // const [size, setSize] = React.useState("md")

  return (
    <Modal
      onClose={close}
      scrollBehavior={scrollBehavior ? scrollBehavior : "inside"}
      size={size ? size : "md"}
      isOpen={open}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        zIndex={10}
        backgroundColor={bg ? bg : mainBackgroundColor}
        maxHeight={"90vh"}
        rounded={rounded ? "0px" : "6px"}
        padding="0px"
        margin="16px"
        w="full"
        h={scrollBehavior ? "full" : "auto"}
      >
        {(title || closeIcon) && (
          <>
            <ModalHeader
              zIndex={20}
              color={titlecolor ? titlecolor : bodyTextColor}
              textAlign={titleAlign ? titleAlign : "center"}
            >
              {title}
            </ModalHeader>
            <ModalCloseButton
              color={titlecolor ? titlecolor : bodyTextColor}
              zIndex={20}
            />
          </>
        )}
        <ModalBody
          overflowX={"hidden"}
          backgroundColor={bg ? bg : "#fff"}
          borderRadius={rounded ? "0px" : "8px"}
          margin="0px"
          padding="0px"
          h={scrollBehavior ? "full" : "auto"}
          w="full"
        >
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
