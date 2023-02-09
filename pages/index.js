import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import Feed from '@/components/Feed'
import { useRecoilState } from 'recoil'
import { navbarState } from '@/atom/navbarAtom'
import { collection, query, where, getDocs, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { get } from 'https'
import { db } from '@/firebase'
import Login from '@/components/Login'
import { userState } from '@/atom/userAtom'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Listbox} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { userCurrentStatus } from '@/atom/userStatusAtom'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })
export const userCStatus = [
  { name: 'Alumni' },
  { name: 'Student' },
]
export default function Home({providers}) {
  const { data: session , status} = useSession();
  const [active,setActive]=useRecoilState(navbarState);
  const[user,setUser]=useRecoilState(userState);
  const [selected, setSelected] = useState(userCStatus[0]);
  const[userStatus,setUserStatus]=useRecoilState(userCurrentStatus);
  const [isAlumni,setIsAlumni]=useState(false)
  const[input,setInput]=useState('');
  let [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  
   console.log(session)
   console.log('user',user)

  if (!session) return <Login providers={providers} />;

  console.log('user?.alumni === null ',user?.alumni === null )
  {user?.alumni === null && setUserStatus(true)}
 {user?.alumni === true || user?.alumni === false && setUserStatus(false)}
  function closeModal() {
    setUserStatus(false)
  }

  function openModal() {
    setUserStatus(true)
  }

  async function addData(){
    console.log('selected',selected)
    console.log(`selected.name == 'Alumni'`,selected.name == 'Alumni')
    console.log(`selected.name == 'Student'`,selected.name == 'Student')
    console.log(' user?.userId', user?.userId)
    setUserStatus(false)
    if(selected.name == 'Alumni'){
      await updateDoc(doc(db, "users", user?.userId),{
        alumni:true
      });
     router.reload('/')
    }
    if(selected.name == 'Student'){
      await updateDoc(doc(db, "users", user?.userId),{
        alumni:false
      });
      router.reload('/')
    }
   
  }

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
      return setUser(usercheck[0]);
     } 
    })
    
   }

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
        <Transition appear show={userStatus} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="absolute top-[100px] mb-[80px]  left-1/2 z-30 min-w-[400px] mt-3 sm:max-w-[600px] justify-center -translate-x-1/2 transform md:max-w-xl sm:px-0 lg:max-w-4xl xl:w-[1200px]">
                  <div className="flex flex-col rounded-lg bg-white  lg:w-full mb-[100px] min-h-[50vh] sm:w-full md:w-full xl:w-full lg:p-[100px] p-[30px] sm:p-[40px] overflow-y-auto">
                    <div className=" ">
                      <span className="flex font-medium lg:ml-[40px] mt-4 lg:text-lg max-w-[600px]">
                        Are you a student or an alumni? If you're an alumni kindly enter your e-mail below 
                      </span>
                    </div>
                    {selected.name == 'Alumni' ? (
                      <div className="flex flex-col mt-10">
                      <span className="flex font-semibold text-sm md:text-base lg:text-xl">
                       E-mail
                      </span>
                      <div className="flex mt-2">
                        <input
                          type="text"
                          value={input}
                          className=" min-w-[280px] flex-grow lg:w-[500px] max-w-[650px] border-2 border-gray-200 outline-none rounded-md p-2"
                          onChange={e=>setInput(e.target.value)}
                        />
                      </div>
                    </div>
                    ):null}
                    
                    <div className="flex flex-col mt-10 ">
                    <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-[50%] cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-[50%] left-[84px] md:left-[90px] lg:left-[124px] xl:left-[170px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {userCStatus.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={person}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                    </div>
                    {selected.name == 'Alumni' ?(
                      <div className="flex justify-center mt-10">
                      <button
                        className={`inline-flex justify-center rounded-md border border-transparent cursor-pointer ${!input ? ' bg-opacity-20 text-opacity-30 cursor-auto' : null} bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  p-2 `}
                        disabled={!input}
                        onClick={addData}
                      >
                        Confirm
                      </button>
                      </div>
                    ): (
                      <div className="flex justify-center mt-10">
                      <button
                        className={`inline-flex justify-center rounded-md border border-transparent cursor-auto bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  p-2 `}
                        onClick={addData}
                      >
                        Confirm
                      </button>
                    </div>
                    )}
                   
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>     
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