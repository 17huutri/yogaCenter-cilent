import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store'
import styles from '../styles/Recovery.module.css';
import { generateOTP, recoveryUser, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player';
import video from '../assets/2.mp4';
import Header from './homepage/Header';
import Footer from './homepage/Footer';

export default function Recovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    recoveryUser(username).then(() => {
      // console.log(OTP)
      return toast.success('OTP has been send to your email!');

    }).catch(error => {
      // handle error or exception
      console.error(error);
    })
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP })
      if (status === 201) {
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP() {

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      // console.log(OTP)
    }).catch(error => {
      // handle error or exception
      console.error(error);
    });

  }

  return (
    <div className='overflow-hidden'>
      <Header />
      <div className="mx-auto">

        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className={styles.videoContainer}>
          <ReactPlayer url={video} playing loop muted width="100%" height="100%" />

          <div className='flex justify-center items-center h-70'>
            <div className={styles.glass}>

              <div className="title flex flex-col items-center">
                <h4 className='text-5xl font-bold'>Recovery</h4>
                <span className='py-4 text-xl w-2/3 text-center text-gray-800'>
                  Enter OTP to recover password.
                </span>
              </div>

              <form className='pt-20' onSubmit={onSubmit}>

                <div className="textbox flex flex-col items-center gap-6">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-900'>
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value)} className={styles.textbox} type="text" placeholder='OTP' />
                  </div>

                  <button className={styles.btn} type='submit'>Recover</button>
                </div>
              </form>

              <div className="text-center py-4">
                <span className='text-gray-900'>Can't get OTP? <button onClick={resendOTP} className='text-red-500'>Resend</button></span>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
