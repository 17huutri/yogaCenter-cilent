import React, { useState } from 'react'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'
import { FaPen } from 'react-icons/fa';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
// import Footer from './homepage/Footer';
// import Header from './homepage/Header';

export default function Profile() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      fullName: apiData?.fullName || '',
      phone: apiData?.phone || '',
      email: apiData?.email || '',
      description: apiData?.description || '',
      address: apiData?.address || ''
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || apiData?.profile || '' })
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    // apiData?.profile = base64;
  }

  // logout handler function
  // function userLogout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('roleId');
  //   localStorage.removeItem('username');
  //   navigate('/')
  // }

  if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (

    <div className='bg-slate-200'>

      <div className="max-w-7xl mx-auto px-44 py-8 ml-60">
        <div className="relative">

          <img src='assets/anhBia.png' alt="Ảnh bìa" className="w-full h-72 object-cover rounded-t-lg" />
          <Toaster position='top-center' reverseOrder={false}></Toaster>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <label htmlFor="profile">
              <img src={file || apiData?.profile || avatar} className={`${styles.profile_img} ${extend.profile_img} w-48 h-48 object-cover rounded-full border-4 border-white absolute bottom-0 left-4 -mb-10 ml-8`} alt="avatar" />
            </label>
            <input onChange={onUpload} type="file" id='profile' name='profile' />
          </form>
          <h1 className=' text-center mt-8 text-4xl font-serif'><b>{apiData?.fullName}</b></h1>
        </div>
        <div className='py-16'>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col">
              <label className='ml-24 text-lg'>Full name</label>
              <div className='ml-24 text-lg'>
                <input {...formik.getFieldProps('fullName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Full Name*' />
              </div>
              <label className='ml-24 mt-5 text-lg'>Phone</label><div className='ml-24'><input {...formik.getFieldProps('phone')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' /></div>
              <label className='ml-24 mt-5 text-lg'>Email</label><div className='ml-24'><input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' /></div>
              <label className='ml-24 mt-5 text-lg'>Address</label><div className='ml-24'><input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' /></div>
              <label className='ml-24 mt-5 text-lg'>Description</label><div className='ml-24'><textarea rows="5" cols="50" {...formik.getFieldProps('description')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Description*' /></div>
              <div className='ml-24'>
                <button className={styles.btn} type='submit'>Update</button>
              </div>
            </div>
          </form>

        </div>

      </div>


    </div>
  )
}


