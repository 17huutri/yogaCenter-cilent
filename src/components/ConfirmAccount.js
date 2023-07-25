import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store'
import styles from '../styles/Username.module.css';
import { confirmAccount, generateOTPforRegister, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'
// import Countdown from './countdown';
import Countdown from 'react-countdown';
import Header from './homepage/Header';
import Footer from './homepage/Footer';

export default function Recovery() {

    const { username, email } = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState();
    const navigate = useNavigate()
    const count = 60000;
    const [timer, setTimer] = useState(Date.now());


    useEffect(() => {
        resendOTP();
    }, [username]);

    async function onSubmit(e) {
        e.preventDefault();
        console.log(OTP)
        console.log(e.target.code.value)
        // let OTP = e.target.code.value;
        try {
            let { status } = await verifyOTP({ username, code: OTP })
            if (status === 201) {
                let confirmPromise = confirmAccount({ username })

                toast.promise(confirmPromise, {
                    loading: 'Updating...',
                    success: <b>Registration complete !!!</b>,
                    error: <b>Cannot register account!</b>
                });
                return navigate('/login')
            }
        } catch (error) {
            return toast.error('Wrong OTP! Check email again!')
        }
    }

    // handler of resend OTP
    function resendOTP() {

        let sentPromise = generateOTPforRegister(username, email);
        setTimer(Date.now())
        // console.log(date);
        toast.promise(sentPromise,
            {
                loading: 'Sending...',
                success: <b>OTP has been send to your email!</b>,
                error: <b>Could not Send it!</b>,
            }
        );


        sentPromise.then((OTP) => {
        }).catch(error => {
            // handle error or exception
            console.error(error);
        });

    }

    return (
        <div className=" mx-auto">
            <Header/>
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass}>

                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Confirm your account</h4>
                        <span className='py-4 text-1xl w-2/3 text-center text-gray-500'>
                            Enter OTP to confirm your account.
                        </span>
                    </div>

                    <form className='pt-20' onSubmit={onSubmit}>

                        <div className="textbox flex flex-col items-center gap-6">

                            <div className="input text-center">
                                <span className='py-4 text-sm text-left text-gray-500'>
                                    Enter 6 digit OTP sent to your email address.
                                </span>
                                <input
                                    onChange={(e) => setOTP(e.target.value)}
                                    className={styles.textbox} name='code' type="text" placeholder='OTP'
                                />
                            </div>

                            <button className={styles.btn} type='submit'>Confirm</button>
                        </div>
                    </form>

                    <div className="text-center py-4">
                        <p>OTP expired in :  <Countdown date={timer + count} /></p>
                        <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500'>Resend</button></span>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
        
    )
}
