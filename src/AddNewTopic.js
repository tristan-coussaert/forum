import {
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
  } from "@chakra-ui/core";
  import React, { useState } from "react";
  import {db} from "./config";
  
  const AddNewTopic = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [isSaving, setSaving] = useState(false);
  
    const handleSubmit = async () => {
      setSaving(true);
  
      const date = new Date();
  
      await db.collection("topics").add({
        title,
        upVotesCount: 0,
        downVotesCount: 0,
        createdAt: date.toUTCString(),
        updatedAt: date.toUTCString(),
      });
  
      onClose();
      setTitle("");
      setSaving(false);
    };
  
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue">
          Ajouter un nouveau sujet
        </Button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Ajouter un nouveau sujet</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="post-title">
                  <FormLabel>Sujet du topic</FormLabel>
                  <Textarea
                    type="post-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <HStack spacing={4}>
                  <Button onClick={onClose}>Fermer</Button>
                  <Button
                    onClick={handleSubmit}
                    colorScheme="blue"
                    disabled={!title.trim()}
                    isLoading={isSaving}
                  >
                    Sauvegarder
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </>
    );
  };
  
  export default AddNewTopic;