import React from 'react'
import { HomeIcon } from "@heroicons/react/24/solid";
import { UserIcon} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { navbarState } from '@/atom/navbarAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { userState } from '@/atom/userAtom';
import { useSession } from 'next-auth/react';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';


function Navbar() {
  const [active,setActive]=useRecoilState(navbarState);
  const router = useRouter();
  const[user,setUser]=useRecoilState(userState);
  const { data: session , status} = useSession();
  if(user.length === 0){
    getUsers()
  }
  console.log('uuuuser',user)
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
       await addDoc(collection(db, "users"), {  
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
  return (
    <div className="group xl:mx-[393px]  max-w-7xl w-[360px] sm:w-[500px] md:w-[700px] lg:w-[750px] xl:w-[780px] fixed rounded-full z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 bottom-10">
      {/* <div className="absolute -inset-1 -z-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-10 "></div> */}
      {/* <div className=' absolute blur'></div> */}
        <div className=" shadow-xl leading-none flex items-top space-x-6 rounded-full backdrop-filter backdrop-blur-lg bg-opacity-30 ">
            <div className="flex items-center justify-around h-[54px] font-semibold xl:text-lg ring-1 ring-gray-900/5 rounded-full w-[360px] sm:w-[500px] md:w-[700px] lg:w-[750px] xl:w-[780px] ">
                <div className={`cursor-pointer flex items-center space-x-3 p-2 hover:bg-black hover:bg-opacity-20 hover:border-t-0 hover:rounded-lg ${active == 'home' ? 'border-black border-t-4' : null}`} onClick={()=>{
                  setActive('home')
                  router.push('/')
                }}>
                <HomeIcon className="h-6 w-6 " />
                  <div className=' hidden sm:inline'>Home</div>
                </div>
                <div className={` cursor-pointer flex space-x-3 items-center hover:bg-black hover:bg-opacity-20 p-2 hover:border-t-0 hover:rounded-lg ${active == 'search' ? 'border-black border-t-4' : null}`} onClick={()=>{
                  setActive('search')
                  router.push('/search')
                }}>
                    <MagnifyingGlassIcon className="h-6 w-6 " />
                  <div className=' hidden sm:inline'>Search</div>
                </div>
                {user?.isAlumini ? (
                   <div className={` cursor-pointer flex space-x-3 p-2 items-center hover:bg-black hover:bg-opacity-20 hover:border-t-0 hover:rounded-lg ${active == 'profile' ? 'border-black border-t-4' : null}`} onClick={()=>{
                    setActive('newpost')
                    
                  }}>
                    <UserIcon className=' h-6 w-6 '/>
                    <div className=' hidden sm:inline'>New post</div>
                  </div>
                ):null}
                
                <div className={` cursor-pointer flex space-x-3 p-2 items-center hover:bg-black hover:bg-opacity-20 hover:border-t-0 hover:rounded-lg ${active == 'newpost' ? 'border-black border-t-4' : null}`} onClick={()=>{
                  setActive('profile')
                   router.push(`/user/${user?.userId}`)
                }}>
                  <UserIcon className=' h-6 w-6 '/>
                  <div className=' hidden sm:inline'>Profile</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
//backdrop-filter backdrop-blur-lg bg-opacity-30