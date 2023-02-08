import React, { useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from '@/firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { userState } from '@/atom/userAtom';
import { useSession } from 'next-auth/react';



function singlePost({id}) {
  // console.log(data)
  const { data: session , status} = useSession();
  const[user,setUser]=useRecoilState(userState);
  const[data,setData]=useState([]);
  const [bookmark,setBookmark]=useState(false);
console.log(id)
console.log('session ',session )
useEffect(()=>{
  if(id){
    getPostData()
  }
},[id])
async function getPostData (){
  const docRef = doc(db,"posts",id);
  const docSnap = await getDoc(docRef);
   setData(docSnap.data())
 }

 async function getUsers(){
  const userRef = collection(db, "users");
  
  getDocs(userRef).then((snapshot)=>{
   
    let value=[]
    snapshot.docs.forEach((doc)=>{
      value.push({...doc.data(),userId:doc.id})
    })
    console.log('value',value)
    console.log('ession?.user?.email',session?.user?.email)
    const usercheck = value?.filter(filteredusers =>filteredusers?.email == session?.user?.email)
    console.log('check',usercheck)
   if(usercheck && usercheck[0]){
    console.log('success')
    console.log('usercheck[0]',usercheck[0])
  //  console.log()
    return setUser(usercheck[0]);
   } 
  })
  
 }

useEffect(()=>{
  const value = user?.bookmarks?.filter(mark => mark == id)
  // console.log('value',value);
  if(value == id){
     setBookmark(true)
     return
  }else{
    setBookmark(false)
    return
  }
 },[user])

useEffect(()=>{
  getUsers()
},[])
  console.log(data)// 
  async function addToSaved(){
    console.log('b',bookmark)
    setBookmark(true)
    console.log('user?.userId',user?.userId)
    await updateDoc(doc(db, "users", user?.userId),{
      bookmarks:arrayUnion(id)
    });
    getUsers()
    setBookmark(true)
    return
   }

   async function removeFromSaved(){
    // console.log('hey')
    setBookmark(false)
    console.log('user?.userId',user?.userId)
    await updateDoc(doc(db, "users", user?.userId),{
      bookmarks:arrayRemove(id)
    });
    getUsers()
    setBookmark(false)
    return
   }
 
  return (
    <div className=' max-w-2xl  sm:max-w-screen-sm md:max-w-screen-md  pb-40 lg:max-w-7xl xl:max-w-screen-2xl xl:px-[240px] lg:px-8 '>
      <div className=' py-0 w-full px-1 border-b-2 border-black border-opacity-20 mb-4'>
        <div className='flex items-center justify-between backdrop-filter backdrop-blur-lg bg-opacity-30 '>
        <div
          className=" w-9 h-9 flex items-center justify-center cursor-pointer "
          onClick={() => router.push("/")}
        >
          <ArrowLeftIcon className="h-5 " />
        </div>
          <div className=''>
           {bookmark ? (
             <button className=' rounded-lg px-4 pb-1 pt-[3px] m-2 bg-black text-white ' onClick={removeFromSaved}>Remove from saved</button>
           ):(
             <button className=' rounded-lg px-4 pb-1 pt-[3px] m-2 bg-black text-white ' onClick={addToSaved}>Save</button>
           )}
          </div>
        </div>
      </div>
      <div className='px-3 m-4 mb-2 font-medium text-gray-900 md:text-sm lg:text-base text-opacity-60 text-sm'>
        <div className=' '>Posted by</div>
        <div className=''>Posted <Moment fromNow>{data?.timestamp?.toDate()}</Moment></div>
      </div>
      <div className='px-3 m-3 mt-5'>
      <dl className="grid grid-flow-col-dense gap-x-6 gap-y-10 sm:gap-y-16 lg:gap-x-8">
        <div className="border-t border-gray-200 pt-4">
          <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">About</dt>
          <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base"> {data?.about}</dd>
        </div>
      </dl>
      </div>
      {data?.data?.map((value,id)=>(
        <div className=' border shadow-lg p-5 pb-10 m-3 md:my-8 rounded-lg' key={id}>
          <div className=' font-semibold text-xl p-5 text-gray-900 '>{value?.role}</div>
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mx-auto  '>
           <dl className="mt-4 grid grid-flow-col-dense   ">
            <div className="border-t  border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">Work time</dt>
              <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base ">{value?.worktime}</dd>
            </div>
           </dl>
           {value?.noofposition ? (
            <dl className="mt-4 grid grid-flow-col-dense   ">
            <div className="border-t  border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">No of positions </dt>
              <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base">{value?.noofposition}</dd>
            </div>
           </dl>
           ) : null}
           {value?.pay ? (
            <dl className="mt-4 grid grid-flow-col-dense   ">
            <div className="border-t  border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">Pay</dt>
              <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base">{value?.pay}</dd>
            </div>
           </dl>
           ): null}
           
           <dl className="mt-4 grid grid-flow-col-dense   ">
            <div className="border-t  border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">Note</dt>
              <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base">{value?.note}</dd>
            </div>
           </dl>
           {value?.link ? (
            <dl className="mt-4 grid grid-flow-col-dense   ">
            <div className="border-t  border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">Link</dt>
              <dd className=' mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base'><a href={value?.link} className=" hover:underline">{value?.link}</a></dd>
            </div>
           </dl>
           ) : null}
           {value?.linknote ? (
            <dl className="mt-4 grid grid-flow-col-dense   ">
            <div className="border-t  border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">About link</dt>
              <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base">{value?.linknote}</dd>
            </div>
           </dl>
           ) : null}
        </div>
        </div>
      ))}
      <div className=' grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pt-5  mx-auto '>
          <dl className="mt-4 grid grid-flow-col-dense   ">
            <div className="border-t  border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">Company name</dt>
              <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base">{data?.companyName}</dd>
            </div>
          </dl>
          {data?.companyLink ? (
            <dl className="mt-4 grid grid-flow-col-dense ">
            <div className="border-t border-gray-200 pt-8 mx-5">
              <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">Company site</dt>
              <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base"><a href={data?.companyLink} className='hover:underline'>{data?.companyLink}</a></dd>
            </div>
          </dl>
          ):null}
          {data?.aboutCompany ? (
             <dl className="mt-4 grid grid-flow-col-dense ">
             <div className="border-t border-gray-200 pt-8 mx-5">
               <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">About Company</dt>
               <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base">{data?.aboutCompany}</dd>
             </div>
           </dl>
          ): null}
         {data?.endNote ? (
           <dl className="mt-4 grid grid-flow-col-dense ">
           <div className="border-t border-gray-200 pt-8 mx-5">
             <dt className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">Note</dt>
             <dd className="mt-2 text-sm text-gray-500 p-2 md:text-sm lg:text-base">{data?.endNote}</dd>
           </div>
         </dl>
         ):null}
         
      </div>
    </div> 
    // <div>
    //   <button className='p-2 bg-pink-200' onClick={getPostData}>Getdata</button>
    // </div>
  )
}

export default singlePost

export const getStaticPaths = async () => {
  let posts = []
  async function getData(){
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        posts.push(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    )
  }
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const pageId = context.params.id;
  console.log(pageId)  
  const postRef = doc(db,"posts",pageId);
   const docSnap = await getDoc (postRef);
  //  const data = JSON.stringify(docSnap.data())
  return {
    props: {
    id:pageId
    },
    revalidate: 1,
  };
};