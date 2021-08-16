import React, { useEffect, useState} from 'react'
import { Box, HStack, Text, Container, VStack, Textarea, Heading } from "@chakra-ui/core";
import { useLocation } from 'react-router';
import {db} from "./config";
import './Post.css'
import AddNewComment from "./AddNewComment";


function Post({id, title, content}){

    const location = useLocation();
    const [topics, setTopics] = useState([]);
    useEffect(() => {   
        db.collection("topics").doc(location.state.id).collection("comments")
          .orderBy("createdAt", "asc")
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            setTopics(data);
          });
      }, []);

      useEffect(() => {
        db.collection("topics").doc(location.state.id).collection("comments")
          .orderBy("createdAt", "asc")
          .onSnapshot((querySnapshot) => {
            const _topics = [];
    
            querySnapshot.forEach((doc) => {
              _topics.push({
                id: doc.id,
                ...doc.data(),
              });
            });
    
            setTopics(_topics);
          });
      }, []);

    return(
        <div className="post">
        <Container maxW="md" centerContent p={8}>
            <VStack spacing={8} w="100%">
            <Heading>Sujet : {location.state.title}</Heading>
            <div className="button__addNewComment" >
            <AddNewComment className="button__addNewComment" id={location.state.id} />
            </div>
             <Box bg="gray.100" p={4} rounded="md" w="100%">
                <Text>{location.state.title}</Text>
              </Box>
            </VStack>
          </Container>

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