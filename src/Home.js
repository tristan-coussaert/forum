import { Container, Flex, Spinner, VStack, Button } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import Topic from "./Topic";
import './Home.css'
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


      useEffect(() => {
        db.collection("topics")
          .orderBy("createdAt", "desc")
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

      const refreshPage = ()=>{
        window.location.reload();
     }

    

      return (
          <div className="home">
          <div className="button">
          <AddNewTopic />
          <Button onClick={refreshPage} colorScheme="blue" className="button__Refresh" >Actualiser</Button>
          </div>
          <Container maxW="md" centerContent p={8}>
            <VStack spacing={8} w="100%">
              {topics.map((post) => (
                <Topic post={post} key={post.id} />
              ))}
            </VStack>
          </Container>
          </div>
      );
}

export default Home;