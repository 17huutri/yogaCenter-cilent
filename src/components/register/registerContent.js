import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import {
  registerValidation,
  confirmPasswordValidation, emailVerify, usernameVerify
} from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import { registerUser } from '../../helper/helper'
import { useAuthStore } from '../../store/store'
import ReactPlayer from 'react-player';
import video from '../../assets/2.mp4';


import styles from '../../styles/Username.module.css';

export default function Register() {

  const navigate = useNavigate()
  const [file, setFile] = useState()
  const setUsername = useAuthStore(state => state.setUsername);
  const setEmail = useAuthStore(state => state.setEmail);
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: confirmPasswordValidation, registerValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async values => {
      // const errors =usernameVerify(values) ; 
      const usernameErrors = usernameVerify(values);
      const errors = emailVerify(values);

      console.log(values.email)
      setUsername(values.username);
      setEmail(values.email);
      console.log("Submitting form");
      // if (Object.keys(errors).length) {
      //   return errors; 
      // }
      if (Object.keys(errors).length) {
        toast.error(errors.email);
        return;
      }
      // if (Object.keys(usernameErrors).length) {
      //   toast.error(usernameErrors.username);  
      //   return ;    
      // }

      // if (Object.keys(emailErrors).length) {
      //   toast.error(emailErrors.email);
      // }

      // try {
      //   // Gán thêm dữ liệu profile nếu có
      //   values = await Object.assign(values, { profile: file || "" });

      //   // Gọi API đăng ký và gửi OTP   
      //   let registerPromise = registerUser(values);

      //   // Hiển thị thông báo
      //   toast.promise(registerPromise, {
      //     loading: "Creating...",  
      //     success: <b>Register Successfully...!</b>,
      //     errors: <b>Could not Register.</b>,
      //   });

      //   registerPromise.then(function () { navigate('/confirmAccount') }).catch(error => {
      //     // handle error or exception
      //     console.error(error);
      //   });

      // } catch (error) {
      //   console.error(error);
      // }
      values = await Object.assign(values, { profile: file || '' })
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully...!</b>,
        error: <b>Could not register.</b>
      });

      registerPromise.then(function () { navigate('/confirmAccount') }).catch(error => {
        // handle error or exception
        console.error(error);
      });
    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-70'>
        <div className={styles.video_container}>
          <ReactPlayer
            url={video}
            playing
            loop
            muted
            width="100%"
            height="100%"
          />
          <div className={styles.glassRegister} style={{ width: "50%", paddingTop: '3em' }}>

            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Register</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Happy to join you!
              </span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>

              <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                </label>

                <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' required/>
                <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*'required />
                <input {...formik.getFieldProps('password')}  required onChange={formik.handleChange}
                  onBlur={formik.handleBlur} className={styles.textbox} type="password" placeholder='Password must be 8-50 characters' />
                <input {...formik.getFieldProps('confirm_pwd')} onChange={formik.handleChange}
                  onBlur={formik.handleBlur} className={styles.textbox} required type="password" placeholder='Confirm Password*' />
                <button className={styles.btn} type='submit'>Register</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/login">Login Now</Link></span>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}