import { IconButton, Text, VStack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import {db} from "./config";

function RatingButtons({ post }) {
    const [isVoting, setVoting] = useState(false);
    const [votedPosts, setVotedPosts] = useState([]);
  
    const handleClick = async (type) => {
      setVoting(true);
  
      let upVotesCount = post.upVotesCount;
      let downVotesCount = post.downVotesCount;
  
      const date = new Date();
  
      if (type === "upvote") {
        upVotesCount = upVotesCount + 1;
      } else {
        downVotesCount = downVotesCount + 1;
      }
  
      await db.collection("topics").doc(post.id).set({
        title: post.title,
        content: post.content,
        upVotesCount,
        downVotesCount,
        createdAt: post.createdAt,
        updatedAt: date.toUTCString(),
      });
  
    };
  
    return (
      <>
        <VStack>
          <IconButton
            size="lg"
            colorScheme="purple"
            aria-label="Upvote"
            icon={<FiArrowUp />}
            onClick={() => handleClick("upvote")}
          />
          <Text bg="gray.100" rounded="md" w="100%" p={1}>
            {post.upVotesCount}
          </Text>
        </VStack>
        <VStack>
          <IconButton
            size="lg"
            colorScheme="yellow"
            aria-label="Downvote"
            icon={<FiArrowDown />}
            onClick={() => handleClick("downvote")}
          />
          <Text bg="gray.100" rounded="md" w="100%" p={1}>
            {post.downVotesCount}
          </Text>
        </VStack>
      </>
    );
  };
  
  export default RatingButtons;