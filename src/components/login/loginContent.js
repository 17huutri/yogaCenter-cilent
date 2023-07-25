import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/profile.png";
import { useFormik } from "formik";
import { usernameValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";
import { passwordValidate } from "../../helper/validate";
import { verifyPassword } from "../../helper/helper";
import styles from "../../styles/Username.module.css";

export default function Login() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    if (roleId != null) {
      navigate("/profile");
    } else {
    }
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: usernameValidate,
    passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username: values.username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Wrong username or password !!!</b>,
      });

      loginPromise
        .then((res) => {
          let { token, roleId, username, id } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("roleId", roleId);
          localStorage.setItem("username", username);
          localStorage.setItem("id", id);
          navigate("/");
        })
        .catch((error) => {
          // handle error or exception
          console.error(error);
        });
    },
  });

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex h-full items-center justify-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Welcome !!!</h4>
            <span className="text-1xl w-2/3 py-4 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps("password")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Login
              </button>
            </div>

            <div className="py-4 text-center">
              <span className="text-gray-500">
                Not a Member?{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
            <div className="py-4 text-center">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" to="/UserRecovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  )
}
