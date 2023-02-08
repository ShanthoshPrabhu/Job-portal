import { db } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';


function CreatePost() {
  const [data, setData] = React.useState([
    {role:'Full Stack Developer',worktime:'', pay:'',link:'', linknote:'', note:'',noofposition:''},
  ]);
 const [loading,setLoading]=React.useState(false);
 const [about,setAbout]=React.useState('');
 const [companyName,setCompanyName]=React.useState('');
 const [companyLink,setCompanyLink]=React.useState('');
 const [aboutCompany,setAboutCompany]=React.useState('');
 const [endNote,setEndNote]=React.useState('');

 

  const wTime = []  
  data?.map((value)=>{
    if(value.worktime != ''){
      wTime.push(value?.worktime);
    }
  })
// console.log('wTime',wTime.length)


 const user = {
  name:'Shanthosh Prabhu',
  email:'ashanthoshprabhu@gmail.com',
  isAlumini:true,
  id:12345678907,
  contact:356789543928
 }
 const Jobs = [
    { role: 'Full Stack Developer'},
    { role: 'Frontend Developer'},
    { role: 'Backend Developer'},
    { role: 'Data Analyst' },
    { role: 'Data Scientist' },
    { role: 'Data Engineer' },
  ]



  function handleChange (e, index) {
    const updateddata = [...data];
    updateddata[index][e.target.name] = e.target.value;
    setData(updateddata);
  };

  function addTab () {
    setData([...data, {role:'Full Stack Developer',worktime:'', pay:'',link:'', linknote:'', note:'',noofposition:''}]);
  };

  function removeTab (index) {
    const updateddata = [...data];
    updateddata.splice(index, 1);
    setData(updateddata);
  };
  
  async function uploadPost(){
    setLoading(true)
    const category = []
    data?.map((value)=>{
      category.push(value?.role);
    })
    const postData = {
      postedBy:user?.name,
      about:about,
      data:data,
      category:category,
      companyName:companyName,
      companyLink:companyLink,
      aboutCompany:aboutCompany,
      endNote:endNote,
      timestamp:serverTimestamp()
    }
    console.log(postData)
    await addDoc(collection(db,'posts'),postData)
    console.log('cat',category)
    setLoading(false)
    setAbout('')
    setAboutCompany('')
    setCompanyLink('')
    setCompanyName('')
    setEndNote('')
  }
 

  return (
    <div className=' xl:w-[900px] lg:ml-[62px] lg:mr-[62px] xl:mx-[309px] mx-0 my-10 min-w-[400px] border-none text-[#37352fa6] mb-40'>
        <div className=' flex p-2  m-5 font-sans'>
          <label className=' w-[100px] font-semibold pt-2'>About </label>
          <textarea type="text"  name="about" placeholder='empty' className=' w-[82%] text-black bg-[#FBFBFA] active:bg-white hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105 h-[110px] ml-2 px-2 py-2 rounded-md text-base outline-none border-none ' value={about} onChange={(e) => setAbout(e.target.value)}/>
        </div>
      {data.map((input, index) => (
        <div key={index} className='my-5 mx-2 xl:mx-0 p-0 sm:p-3 border border-gray-300 rounded-lg'>
          <div className=' flex flex-col md:flex-row xl:w-[900px]'>
            <div className='  xl:[430px]'>
                <div className=' flex p-2 items-center m-5'>
                    <span className=' w-[100px] font-semibold '>Role </span>
                    <select name="role" className='w-[280px] cursor-pointer bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105  px-4 rounded-md outline-none p-2' value={input.role} onChange={(e) => handleChange(e, index)}>
                    {Jobs?.map((job,i)=>(
                        <option key={i} value={job?.role} className=' text-gray-700 active:bg-amber-100 active:text-amber-900' >{job?.role}</option>
                    ))}
                    </select>
                </div>
                <div className=' flex p-2 items-center m-5 '>
                    <label className=' w-[25%] font-semibold'>Work time </label>
                    <input type="text" placeholder='empty (full-time or intern)' name="worktime" className='w-[75%] ml-2 text-black h-10 rounded-md px-2 text-base outline-none border-none active:bg-white  bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' value={input.worktime} onChange={(e) => handleChange(e, index)} />
                </div>
                <div className='flex p-2 items-center m-5 ]'>
                    <label className=' w-[100px] font-semibold'>Pay </label>
                    <input type="text" placeholder='empty (optional)' name="pay" className='w-[300px] ml-2 h-10 text-black px-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' value={input.pay} onChange={(e) => handleChange(e, index)} />
                </div>
                <div className='flex p-2 items-center m-5 ]'>
                    <label className=' w-[100px] font-semibold '>No of positions </label>
                    <input type="text" placeholder='empty (optional)' name="noofposition" className='w-[300px]  text-black ml-2 h-10 px-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' value={input.noofposition} onChange={(e) => handleChange(e, index)} />
                </div>
            </div>
            <div className=' xl:w-[430px]'>
                <div className=' flex p-2 items-center m-5'>
                    <label className=' w-[100px] font-semibold'>Link</label>
                    <input type="text" placeholder='empty (optional)' name="link"  className='w-[300px] ml-2 text-black h-10 px-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' value={input.link} onChange={(e) => handleChange(e, index)} />
                </div>
                <div className=' flex p-2 m-5'>
                    <label className=' w-[100px] font-semibold pt-2'>About link</label>
                    <textarea type="text" placeholder='empty (optional)' name="linknote"  className=' w-[300px] h-[90px] text-black ml-2 px-2 py-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' value={input.linknote} onChange={(e) => handleChange(e, index)} />
                    {/* <input type="text" placeholder='empty (optional)' name="linknote"  className='w-[300px] ml-2 text-black h-10 px-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' value={input.linknote} onChange={(e) => handleChange(e, index)} /> */}
                </div>
                <div className=' flex p-2 m-5 '>
                <label className=' w-[100px] font-semibold pt-2'>Note</label>
                <textarea type="text" placeholder='empty'  name="note" className=' w-[300px] h-[90px] text-black ml-2 px-2 py-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' value={input.note} onChange={(e) => handleChange(e, index)} />
                </div>
            </div>
          </div>
          {data?.length == 1 ? null:(
             <button className=" ml-8 mb-3 px-6 hover:scale-105 group flex items-center rounded-md bg-black text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm" onClick={() => removeTab(index)}>
              <span className=' text-lg mr-3 ml-1 h-4 flex items-center justify-center font-bold'> - </span>Remove tab
            </button>
          )}
          
          {/* <button className={` ml-8 py-1 mb-3 h-10 px-6 font-semibold hover:scale-105 rounded-md bg-black text-white flex items-center justify-center ${data?.length == 1 && 'hover:scale-100 opacity-60'}`} disabled={data?.length == 1} onClick={() => handleRemove(index)}>Remove</button> */}
        </div>
        
      ))}
       <button className=" ml-8 mb-3 px-6 hover:scale-105 group flex items-center rounded-md bg-black text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm" onClick={addTab}>
            <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
         Add another tab
        </button>
      {/* <button className=' ml-8 p-2 h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 mt-6 hover:scale-105 ' onClick={handleAdd}>Add another</button> */}
       <div className='flex flex-col md:flex-row mt-16 text-base'>
         <div className=' p-3'>
            <div className=' flex p-2 items-center m-5'>
                <label className=' w-[100px] font-semibold'>Company Name </label>
                <input type="text" placeholder='empty' name="companyname" value={companyName} onChange={e=>setCompanyName(e.target.value)} className='w-[300px]  text-black ml-2 h-10 px-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' />
            </div>
            <div className=' flex p-2  m-5'>
                <label className=' w-[100px] font-semibold pt-2'>About Company </label>
                <textarea type="text" placeholder='empty (optional)' name="aboutcompany" value={aboutCompany} onChange={e=>setAboutCompany(e.target.value)} className=' w-[300px]  text-black h-[90px] ml-2 px-2 py-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' />
            </div>
         </div>
         <div className='p-3'>
            <div className=' flex p-2 items-center m-5'>
                    <label className=' w-[100px] pr-2 font-semibold'>Company link </label>
                    <input type="text" placeholder='empty ' name="companylink" value={companyLink} onChange={e=>setCompanyLink(e.target.value)} className='w-[300px]  text-black ml-2 h-10 px-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' />
            </div>
            <div className=' flex p-2 m-5'>
                <label className=' w-[100px] font-semibold pt-2'>Note </label>
                <textarea type="text" placeholder='empty (optional)'  name="finalnote" value={endNote} onChange={e=>setEndNote(e.target.value)} className=' w-[300px] h-[90px]  text-black ml-2 px-2 py-2 rounded-md text-base outline-none border-none active:bg-white bg-[#FBFBFA] hover:bg-[#EDECE9] focus:shadow-lg focus:scale-105' />
            </div>
        </div>
       </div>
       <button className={`ml-8 mb-3 px-6 hover:scale-105 group flex items-center rounded-md bg-black text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm `} disabled={!about || !companyName || !companyLink || wTime.length == 0 || wTime.length != data.length} onClick={uploadPost}>
        Upload post
        </button>
    </div>
  );
}

export default CreatePost;
//${!about || !data.role || !companyName || !companyLink && 'bg-opacity-80'}