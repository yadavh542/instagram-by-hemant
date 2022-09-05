import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Post from './Post';

const datas=[
    {
        id:123,
        username:'abc',
        userImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
        caption:'this is a dummy',
    },
    {
        id:124,
        username:'abd',
        userImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
        caption:'this is a dummy',
    },
]

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db,'posts'),orderBy('timestamp', 'desc')),(snapshot:any)=>{
            setPosts(snapshot.docs);
        });

        return()=>{
            unsubscribe();
        }
    },[db])

  return (
    <div>
        {posts?.map((post) => (
            <Post
                key={post.id}
                id={post.id}
                username={post.data().username}
                userImg={post.data().profileImg}
                img={post.data().image}
                caption={post.data().caption}
            />
        ))}
       
    </div>
  )
}

export default Posts;