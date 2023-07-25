import React, { useState } from 'react'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
import Footer from './homepage/Footer';
import Header from './homepage/Header';

export default function Profile() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
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
  function userLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('username');
    navigate('/')
  }

  if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='overflow-hidden'>
    
    <div className="mx-10 px-5 py-10">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-70'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em', paddingBottom: '3em' }}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-1xl w-2/3 text-center text-gray-500'>
              You can update the details.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-10'>
              <label htmlFor="profile">
                <img src={file || apiData?.profile   || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>

              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('phone')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
              </div>
              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('description')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Description*' />
              </div>
              <button className={styles.btn} type='submit'>Update</button>


            </div>
          </form>

        </div>
      </div>
    </div>

    </div>
  )
}