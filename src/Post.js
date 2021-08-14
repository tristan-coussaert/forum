import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router';


function Post({id, title, content}){

    const location = useLocation();

    return(
        <div>
        <p>Content: {location.state.content}</p>
        <p>Title: {location.state.title}</p>
        </div>
    )

}

export default Post;