import { Box, HStack, Text } from "@chakra-ui/core";
import React from "react";
import { useHistory } from 'react-router';

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
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Text onClick={goToTopic}>{post.title}</Text>
      </Box>
    </HStack>
  );
};

export default Topic;