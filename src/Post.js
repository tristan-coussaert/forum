import React, { useEffect, useState} from 'react'
import { Box, HStack, Text, Container, VStack } from "@chakra-ui/core";
import { useLocation } from 'react-router';
import {db} from "./config";
import AddNewComment from "./AddNewComment";


function Post({id, title, content}){

    const location = useLocation();
    const [topics, setTopics] = useState([]);
    useEffect(() => {   
        db.collection("topics").doc(location.state.id).collection("comments")
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

    return(
        <div>
        <AddNewComment id={location.state.id} />
        <p>Id: {location.state.id}</p>
        <p>Title: {location.state.title}</p>
        <p>Content: {location.state.content}</p>

        <Container maxW="md" centerContent p={8}>
            <VStack spacing={8} w="100%">
              {topics.map((post) => (
                  <HStack key={post.id} w="100%" alignItems="flex-start">
                <Box bg="gray.100" p={4} rounded="md" w="100%">
                  <Text>{post.content}</Text>
                </Box>
              </HStack>
              ))}
            </VStack>
          </Container>
        </div>
    )

}

export default Post;