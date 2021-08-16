import React, { useEffect, useState} from 'react'
import { Box, HStack, Text, Container, VStack, Heading } from "@chakra-ui/core";
import { useLocation } from 'react-router';
import {db} from "./config";
import './Post.css'
import AddNewComment from "./AddNewComment";
import { useStateValue } from './Context';
import { Link } from "react-router-dom";
import { FaTextWidth } from 'react-icons/fa';


function Post(){

    const location = useLocation();
    const [{loggedinuser}, dispatch] = useStateValue();
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

      function AddComment() {
        if (loggedinuser) {
          return <AddNewComment id={location.state.id} />;
        }
        return <Link to={"/login"} className="header__link"><AddNewComment id={location.state.id}/></Link>;
      }

    return(
        <div className="post">
        <Container maxW="md" centerContent p={8}>
            <VStack spacing={8} w="100%">
            <Heading>Sujet : {location.state.title}</Heading>
            <div className="button__addNewComment" >
            <AddComment/>
            </div>
             <Box bg="gray.100" p={4} rounded="md" w="100%">
                <Text>{location.state.content}</Text>
                <Text>{location.state.author}</Text>
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