import { Button, Modal as ChakraModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export function Modal({ isOpen, onClose, children, heading, primaryAction, secondariAction }: { isOpen: boolean,  onClose: () => void, children: React.ReactNode, heading?: string, primaryAction?: { label: string, onClick: () => void }; secondariAction?: { label: string, onClick: () => void } }) {
  return (
    <>

      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />


          <ModalBody>
            {
              children
            }
          </ModalBody>

          <ModalFooter placeContent={'space-betweens'}>
            {secondariAction && <Button mr={3} onClick={secondariAction.onClick}>
              {secondariAction.label}
            </Button>}
            {primaryAction && <Button mr={3} onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}
