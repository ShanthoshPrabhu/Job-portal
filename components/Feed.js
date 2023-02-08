import { db } from '@/firebase';
import { collection, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Post from './Post';

function Feed() {

  const[posts,setPosts] = useState([]);
  console.log('posts',posts)
  async function getData(){
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    )
    
  }
  useEffect(() =>{
     getData()
    },[]
  );
  //grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3  mx-auto
  return (
    <div className='  grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-3  mx-auto  '>
      {posts.map((post) => (
          <Post key={post?.id} id={post?.id} post={post} />
        ))}
    </div>
  )
}

export default Feed