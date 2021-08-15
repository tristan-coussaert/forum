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

  function AddNewComment ({id}) {

    console.log(id);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [content, setContent] = useState("");
    const [isSaving, setSaving] = useState(false);

    const handleSubmit = async () => {
        setSaving(true);
    
        const date = new Date();
    
        await db.collection("topics").doc(id).collection("comments").add({
          content,
          upVotesCount: 0,
          downVotesCount: 0,
          createdAt: date.toUTCString(),
          updatedAt: date.toUTCString(),
        });
    
        onClose();
        setContent("");
        setSaving(false);
      };

    return (
        <>
          <Button onClick={onOpen} colorScheme="blue">
            Ajouter un nouveau commentaire
          </Button>
    
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Ajouter un nouveau commentaire</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl id="post-content">
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      type="post-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Saisir votre message"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <HStack spacing={4}>
                    <Button onClick={onClose}>Fermer</Button>
                    <Button
                      onClick={handleSubmit}
                      colorScheme="blue"
                      disabled={!content.trim()}
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
  }

  export default AddNewComment;