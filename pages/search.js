import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { db } from '@/firebase';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Moment from 'react-moment';
import moment from 'moment';



function search() {
  const [searchValue, setSearchValue] = useState('');
  const [posts,setPosts]=useState([]);
  const [filteredPosts,setFilteredPosts]=useState([]);
  const router = useRouter();
   console.log(searchValue)
   async function getData(){
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    )
  }
  
 
  async function handleSearch () {
    
    console.log('posts',posts)
    //x.filter(obj => obj.category.includes(inputValue));
    const filter = posts?.filter((post)=>{
    const data = post?.category?.filter(cat => cat.toLowerCase().includes(searchValue.toLowerCase()))
      console.log('data',data)
      return data?.length > 0;
    })
    console.log('filter',filter)
    setFilteredPosts(filter)
//     const q = query(collection(db, "posts"), where('category', 'array-contains', searchValue));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });
  };                                    //onClick={()=>router.push(`/${post?.id}`)}
useEffect(()=>{
   getData()
},[])
  return (
    <div className=' flex flex-col justify-center px-6 sm:px-20 md:px-28 lg:px-36 xl:px-44 items-center '>
      <div className=" z-50 ml-2 mt-5 w-11/12 lg:w-[550px] xl:w-[750px]">
       <div className="flex items-center bg-black p-2 rounded-full relative shadow-lg">
        <MagnifyingGlassIcon className="text-gray-500 h-5 z-50 ml-2" />
        <input
          type="text"
          className="bg-black text-white w-[80%] xl:py-[6px] outline-none py-1 ml-2"
          placeholder="Search "
          value={searchValue} onChange={e => {
            setSearchValue(e.target.value)
            handleSearch()
          }}
        />
      </div>
      </div>
      <div className='mt-5 w-11/12'>
        {filteredPosts.map((post,i)=>{
          <div className=' space-y-4 p-2 border-b-2 border-gray-300 hover:bg-[#EDECE9] cursor-pointer ' key={i}  onClick={()=>router.push(`/${post?.id}`)}>
             <div className='text-black font-semibold lg:text-base xl:text-lg'>{post?.companyName}</div>
            <div className=' grid grid-flow-row-dense grid-cols-3 m-3'>
            {post.category.map((value,index)=>(
             
              <div className=' text-black text-xs flex justify-center space-y-3 items-center py-2 p-2 m-2 rounded-md shadow-md' key={index} >{value}</div>
             ))}
            </div>
             <div className=' text-[#37352fa6] text-xs font-semibold'>Posted {formattedDate}</div>
          </div>
          
})}
      </div>
      <Navbar/>
    {/* <button onClick={} className=' p-2 font-semibold'>Search</button> <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
    </div>
  );
}

export default search




// const x = [
//   {
//     "id": "lH3F1bXLkHvj1knJNK8F",
//     "category": [
//         "Full Stack Developer",
//         "Data Analyst"
//     ],
//     "data": [
//         {
//             "worktime": "fulltime",
//             "pay": "Monthly-Rs 10,000",
//             "role": "Full Stack Developer",
//             "linknote": "",
//             "note": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//             "link": "",
//             "noofposition": ""
//         },
//         {
//             "linknote": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//             "role": "Data Analyst",
//             "noofposition": "2",
//             "note": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//             "worktime": "Intern",
//             "pay": "12k per month",
//             "link": "https://amazon.com"
//         }
//     ],
//     "about": "This internship is about blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//     "companyName": "Microsoft",
//     "aboutCompany": "",
//     "companyLink": "https://microsoft.com",
//     "endNote": "",
//     "timestamp": null,
//     "postedBy": "Shanthosh Prabhu"
// },
// {
//   "id": "i0EMvwUyIrdHR0iqiSpS",
//   "endNote": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//   "about": "This internship is about blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//   "timestamp": null,
//   "companyName": "Microsoft",
//   "category": [
//       "Full Stack Developer",
//       "Data Analyst"
//   ],
//   "data": [
//       {
//           "worktime": "fulltime",
//           "note": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//           "noofposition": "10",
//           "linknote": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//           "link": "https://google.com",
//           "role": "Full Stack Developer",
//           "pay": "Monthly-Rs 10,000"
//       },
//       {
//           "pay": "12k per month",
//           "role": "Data Analyst",
//           "noofposition": "2",
//           "link": "https://amazon.com",
//           "note": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//           "worktime": "Intern",
//           "linknote": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah "
//       }
//   ],
//   "companyLink": "https://microsoft.com",
//   "aboutCompany": "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
//   "postedBy": "Shanthosh Prabhu"
// }
// ]

// const currentDate = new Date();
          // const timestamp = new Date(post.timestamp);
          // const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;

          // let formattedDate;
          // if (currentDate - timestamp >= tenDaysInMilliseconds) {
          //   formattedDate = moment(timestamp).format("MMM YYYY");
          // } else {
          //   formattedDate = moment(timestamp).fromNow();
          // }
          // return (
            
          // )