import { Container, Flex, Spinner, VStack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import Topic from "./Topic";
import AddNewTopic from "./AddNewTopic";
import {db} from "./config";

function Home(){
    const [topics, setTopics] = useState([]);
    useEffect(() => {   
        db.collection("topics")
          .orderBy("createdAt", "desc")
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            setTopics(data);
          });
      }, []);

      return (
        <>
          <AddNewTopic/>
          <Container maxW="md" centerContent p={8}>
            <VStack spacing={8} w="100%">
              {topics.map((post) => (
                <Topic post={post} key={post.id} />
              ))}
            </VStack>
          </Container>
        </>
      );
}

export default Home;