import React, { useEffect, useState } from 'react';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
    HeartIcon as HeartIconFilled
} from "@heroicons/react/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';


const Post = ({id,username,img,userImg,caption}:any) =>{
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { data: session}:any = useSession();
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    // Fetch comments from firebase
    useEffect(() => 
        onSnapshot(query(collection(db, 'posts',id,'comments'),orderBy('timestamp','desc')),
        (snapshot:any)=>setComments(snapshot.docs))
    ,[db,id]);
    
    // send comment to firebase
    const sendComment=async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment: commentToSend,
            username: session?.user?.username,
            userImage: session?.user?.image,
            timestamp:serverTimestamp(),
        })
    }

    // Fetch Likes from firebase
    useEffect(() => 
        onSnapshot(collection(db, 'posts',id,'likes'),
        (snapshot:any)=>setLikes(snapshot.docs))
    ,[db,id]);

    // Send Likes to firebase
    const sendLikes = async () => {

        if(hasLiked){
            await deleteDoc(doc(db, 'posts',id,'likes',session.user.uid));
        }else{
            await setDoc(doc(db, 'posts', id, 'likes',session.user.uid),{
                username: session.user.username,
            });
        }
       
    }

    // setHasLiked
    useEffect(() =>
        
        setHasLiked(likes.findIndex((like:any)=>
        like.id === session?.user?.uid)!== -1)
       
       ,[likes]);

  return (
    <div className='my-4 border bg-white rounded-md'>
        {/* header */}
        <div className='flex items-center p-3 '>
            <img className='h-10 w-10 rounded-full object-contain border p-1' src={userImg} alt="" />
            <p className='flex-1 ml-2 font-bold'>{username}</p>
            <DotsHorizontalIcon className='h-6 cursor-pointer'/>
        </div>
        {/* img */}
        <img src={img} className='w-full object-contain' alt="" />
        {/* buttons */}
        <div className='p-3 mt-2 flex justify-between'> 
        <div className='flex space-x-4'>
            {hasLiked?<HeartIconFilled onClick={sendLikes} className='postBtn text-red-500'/>:
            <HeartIcon onClick={sendLikes} className='postBtn hover:text-red-500'/>
            }
            
            <ChatIcon className='postBtn'/>
            <PaperAirplaneIcon className='postBtn hover:rotate-45'/>
        </div>
        <BookmarkIcon className='postBtn'/>
        </div>

        {/* Likes count Show */}
        
        <p className='font-semibold text-sm p-3'>{likes.length} Likes</p>
       
        

        {/* caption */}
        <p className='px-3 truncate'>
            <span className='font-bold mr-1'>{username} </span>
            {caption}
        </p>
        {/* comments */}
        {comments.length>0 && (
            <div className=' h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin px-6 py-4'>
                { 
                    comments.map(comment =>(
                        <div key={comment.id} className='flex items-center space-x-2 mb-3 text-sm px-5'>
                            {/* <hr className='absolute left-5 top-10 h-8 border-x border-black'/> */}
                            <img 
                            className='h-6 w-6 rounded-full'
                            src={comment.data().userImage} alt="userImage" />
                            <p className=' ml-2 flex-1'><span className='font-bold '>{comment.data().username}    </span>{comment.data().comment}</p>
                            
                            <Moment className='font-semibold text-gray-500 text-xs' fromNow>{comment.data().timestamp?.toDate()}</Moment>
                        </div>
                    ))
                    
                }
            </div>
        )}

        {/* input box */}
        <form className='flex items-center p-3 '>
            <EmojiHappyIcon className='postBtn'/>
            <input 
            
            value={comment}
            onChange={(e:any)=>setComment(e.target.value)}
            type="text"
            placeholder='Add a Comment...'
            className='border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-full px-4'
            />
            <button 
            type='submit'
            disabled={!comment.trim()}
            onClick={sendComment}
            className='font-semibold text-blue-500'>Post</button>
        </form>
    </div>
  )
}

export default Post;