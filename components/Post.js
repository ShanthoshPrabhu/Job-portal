import React from 'react'
import Moment from 'react-moment';

function Post({id,post}) {
    // console.log(key)
    // console.log(id)
    // console.log(post)
//grid grid-flow-row grid-cols-1
const textColors = [' #dc2626','']
const colorArray = ['#fee2e2', '#fce7f3', '#dbeafe', '#ede9fe', '#d1fae5', '#fef3c7', '#ffedd5', '#fef3c7', '#f5f5f5', '#d1fae5'];
const shuffledArray = colorArray.sort(() => Math.random() - 0.5);
  return (
    
    <div className=' relative text-sm flex flex-col justify-evenly m-5 p-3 rounded-lg hover:scale-105 cursor-pointer border-b border-gray-300 hover:bg-[#EDECE9] duration-200 ease-in-out' key={id}>
      {/* <div className="absolute inset-1 -z-20 bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-25 "></div> */}
      <a href={`/${id}`} className='relative text-sm flex flex-col justify-evenly'>
      <div className=' ml-2'>
        <div className=' font-semibold text-base text-black'>Company </div>
        <div className='text-black m-2 ml-2'>{post?.companyName}</div>
      </div>
     <div className=' ml-2 mt-2'>
      <div className=' text-base font-semibold'>Roles</div>
      <div className=' grid grid-flow-row-dense grid-cols-2 m-3 lg:grid-cols-3 xl:grid-cols-2'>
        {post?.category?.map((value,index)=>(
          <div className=' text-black text-xs flex justify-center space-y-3 items-center py-2 p-2 m-2 rounded-md shadow-md' key={index} style={{ backgroundColor: shuffledArray[index % shuffledArray.length] }}>{value}</div>
        ))}
      </div>
     </div>
      <div className=' ml-2 mt-2'>
        <div className='text-base font-semibold'>About</div>
        <div className='text-black m-2 line-clamp-4'>
        {post?.about}
      </div>
      </div>
      <div className=' text-[#37352fa6] text-xs font-semibold'>Posted <Moment fromNow>{post?.timestamp?.toDate()}</Moment></div>
      </a>
    </div>
  )
}

export default Post

//  #fee2e2, #fce7f3, #dbeafe,#ede9fe,#d1fae5,#fef3c7,#ffedd5,#fef3c7,#f5f5f5,#d1fae5