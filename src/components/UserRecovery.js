import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidateLogin } from '../helper/validate';
import { useAuthStore } from '../store/store';

import styles from '../styles/UserRecovery.module.css';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import ReactPlayer from 'react-player';
import video from '../assets/2.mp4';

export default function UserRecovery() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidateLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username);
      navigate('/recovery');
    }
  });

  return (
    <div className={styles.container}>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />

      <div className={styles.videoContainer}>
        <ReactPlayer url={video} playing loop muted width="100%" height="100%" />

        <div className={styles.glass}>
          <div className={styles.title}>
            <h4 className={styles.titleText}>Find your account !</h4>
            <span className={styles.subtitle}>
              Please, let us know your username.
            </span>
          </div>

          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.profile}>
              <img src={avatar} className={styles.profileImg} alt="avatar" />
            </div>

            <div className={styles.textboxContainer}>
              <input
                {...formik.getFieldProps('username')}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
                Recovery
              </button>
            </div>

            <div className={styles.textCenter}>
              <span className={styles.textGray}>
                Something wrong? <Link className={styles.textRed} to="/login">Login Now</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
