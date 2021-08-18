import { Container, VStack, Button } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import Topic from "./Topic";
import './Home.css'
import AddNewTopic from "./AddNewTopic";
import { useStateValue } from './Context';
import {db} from "./config";
import { Link } from "react-router-dom";

function Home(){
    const [{loggedinuser}, dispatch] = useStateValue();
    const [topics, setTopics] = useState([]);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

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

     function AddTopic() {
      if (loggedinuser) {
        return <AddNewTopic />;
      }
      return <Link to={"/login"} className="header__link"><AddNewTopic /></Link>;
    }

    const filterPosts = (topics, query) => {
      if (!query) {
          return topics;
      }
      return topics.filter((post) => {
          const postName = post.title.toLowerCase();
          return postName.includes(query);
      });
  };

  const filteredPosts = filterPosts(topics, searchQuery);


      return (
          <div className="home">
            <div className="element">
          <div className="searchbar">
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Rechercher un sujet"
            name="s"
            class="searchbar__input"
        />
          </div>
          <div className="button">
          <AddTopic  />
          <Button onClick={refreshPage} colorScheme="blue" className="button__Refresh" >Actualiser</Button>
          </div>
          </div>
          <Container maxW="md" centerContent p={8}>
            <VStack spacing={8} w="100%">
              {filteredPosts.map((post) => (
                <Topic post={post} key={post.id} />
              ))}
            </VStack>
          </Container>
          </div>
      );
}

export default Home;