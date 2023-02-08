import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase';
import { userState } from '@/atom/userAtom';
import { useRecoilState } from 'recoil';
import Post from '@/components/Post';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

function User() {
    const[user,setUser]=useRecoilState(userState);
    const [data, setData] = useState([]);
    const router = useRouter();
    const {id} = router.query
   console.log(id)
   console.log('user',user)
  //  if(!user.length){
  //   getUserdata()
  //   return
  //  }
  useEffect(()=>{
    getUserdata()
  },[])
    async function getUserdata(){
        // const docRef = doc(db, "users",id);
        // const docSnap = await getDoc(docRef);
        // setUser(docSnap.data());
        if (!user || !user.bookmarks) return;
        let promises = [];
        user.bookmarks.forEach((value) => {
            if (!value) return;
            promises.push(
            new Promise((resolve) => {
                onSnapshot(doc(db, "posts", value), (snapshot) => {
                resolve({...snapshot.data(), postId: snapshot.id});
                });
            })
            );
        });
        setData(await Promise.all(promises));
    }
    console.log(user)
    console.log(data)
   
  return (
    <div className='relative space-y-8 m-5 '>
        <div className='flex  items-center space-x-3'>
            <div className=' m-2'>
                <img src={user?.image} alt="" className=' w-12 h-12 rounded-full' />
            </div>
            <div className=' text-[#37352fa6] font-medium text-base space-y-3'>
                <div className='space-y-3 '>
                    <div className=' text-black font-semibold'>Name</div>
                    <div className='text-black text-opacity-60'>{user?.name}</div>
                </div>
                <div className='space-y-3'>
                    <div className='text-black font-semibold'>Email</div>
                    <div className='text-black text-opacity-60'>{user?.email}</div>
                </div>
            </div>
        </div>
        <div className=' '>
           <div className=' text-lg font-bold ml-3'>Saved posts</div>
            {data?(
                <div className='  grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 p-3  mx-auto  '>
                {data.map((post) => (
                    <Post key={post?.postId} id={post?.postId} post={post} />
                ))}
            </div>
            ): (
                <h1  className=' m-2 font-bold text-lg'>No saved posts</h1>
            )}
        </div>
        <Navbar/>
    </div>
  )
}

export default User

export const getStaticPaths = async () => {
    let users = []
    async function getData(){
      onSnapshot(
        query(collection(db, "users"), orderBy("timestamp", "desc")),
        (snapshot) => {
          users.push(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      )
    }
    return {
      paths: users.map((user) => ({ params: { id:user.id } })),
      fallback: true,
    };
  };
  
  export const getStaticProps = async (context) => {
    const userId = context.params.id;
    console.log(userId)
  
    return {
      props: {
       id:userId
      },
      revalidate: 1,
    };
  };