import { Box, HStack, Text } from "@chakra-ui/core";
import React from "react";
import { useHistory } from 'react-router';
import RatingButtons from "./RatingButtons";
import { useStateValue } from './Context';

function Topic({ post }) {
    const hist = useHistory()
    
    const goToTopic  = () => {
        hist.push({
            pathname: '/topic',
            state: {
                id: post.id,                
                title: post.title,
                content:post.content
            }
        })
    }

  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
        <RatingButtons post={post} />
      <Box bg="gray.100" p={4} rounded="md" w="100%" onClick={goToTopic}>
        <Text>{post.title}</Text>
        <Text>{post.author}</Text>
      </Box>
    </HStack>
  );
};

export default Topic;