import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import Feed from '@/components/Feed'
import { useRecoilState } from 'recoil'
import { navbarState } from '@/atom/navbarAtom'
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { get } from 'https'
import { db } from '@/firebase'
import Login from '@/components/Login'
import { userState } from '@/atom/userAtom'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({providers}) {
  const { data: session , status} = useSession();
  const [active,setActive]=useRecoilState(navbarState);
  const[user,setUser]=useRecoilState(userState);
   console.log(session)

  if (!session) return <Login providers={providers} />;
  
  async function getUsers(){
    const userRef = collection(db, "users");
    
    getDocs(userRef).then((snapshot)=>{
     
      let value=[]
      snapshot.docs.forEach((doc)=>{
        value.push({...doc.data(),userId:doc.id})
      })
      // console.log('value',value)
      const usercheck = value?.filter(filteredusers =>filteredusers?.email == session?.user?.email)
      console.log('check',usercheck)
     if(usercheck && usercheck[0]){
      // console.log('success')
      // console.log('usercheck[0]',usercheck[0])
    //  console.log()
      return setUser(usercheck[0]);
     } else{
      return addUser();
     }
    })
    
   }
  async function addUser(){
    if(!session){ 
      return
    } else {
      const addData = await addDoc(collection(db, "users"), {  
        image:session?.user?.image,
        name:session?.user.name,
        id:session?.user.uid,
        email:session?.user?.email,
        timestamp:serverTimestamp(),
        bookmarks:[],
    });
    getUsers();
    return
    }
  }
  // useEffect(()=>{
  // //  {status === "authenticif(!session) return
  // if(session){
  //   getUsers()
  // }
  // },[session])
  
  return (
    < >
      <Head>
        <title>Job-portal</title>
      </Head>
      <main className=' max-w-screen-2xl mb-32 flex flex-col items-center '>
        <Image src='/notion.png' width={250} height={250} className=' pb-5 mt-10 '/>
        {/* <button className=' p-2 bg-pink-400' onClick={getUsers}>Add </button> */}
        <div className=' font-semibold flex justify-center items-center ml-2 sm:ml-0 text-2xl pb-5 border-b border-gray-300'>
          Unlock your potential, advance your career
        </div>
        <Navbar/>
        <Feed/>        
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  console.log('pro',providers)
  return {
    props: {providers,session}
  };
}