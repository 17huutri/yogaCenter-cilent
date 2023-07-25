import toast from 'react-hot-toast'
import { authenticate } from './helper'

/** validate login page username */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    
  
    if (values.username) {  
      // Kiểm tra xem tên người dùng có trống không
      if(!values.username.trim()) {
        errors.username = "Please input your username ";
      } else {   
        // Kiểm tra xem tên người dùng đó có tồn tại không
        const { status } = await authenticate(values.username);
        if (status !== 200) {
          errors.exist = toast.error('User dose not exist ...');
        }
      }
    }
  
    return errors; 
  }

/** validate password */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}
export async function confirmPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

/** validate register form */
export async function registerValidation(values) {
    const errors = usernameValidate({}, values);
    passwordVerify(errors, values);
    emailValidate(errors, values);

    return errors;
}

/** validate profile page */
/** validate profile page */
export async function profileValidation(values) {
  const errors = {};

  if (!values.email) {
    errors.email = toast.error('Email Required...!');
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = toast.error('Invalid Email');
  }
  return errors;
} 


/** *********************************************** */

/** validate password */
function passwordVerify(errors = {}, values) {
    if (!values.password) {
      errors.password = "Password is required"; 
    } else if (values.password.length < 8 || values.password.length > 50) {
      errors.password = "Password must be 8-50 characters long";
    } else {  
      const hasUppercase = /[A-Z]/.test(values.password); 
      const hasLowercase = /[a-z]/.test(values.password);
        
      if (!hasUppercase) {
        errors.password = "Password must contain at least 1 uppercase letter";
      }
    
      if (!hasLowercase) {
        errors.password = "Password must contain at least 1 lowercase letter";
      }
    }
    
    // Hiển thị lỗi ngay khi người dùng đang nhập
    if (Object.keys(errors).length > 0 && values.password) {
      toast.error(errors.password)  
    }
    
    return errors;
  }

/** validate username */
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!');
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/** validate email */
// function emailVerify(error = {}, values) {
//     if (!values.email) {
//         error.email = toast.error("Email Required...!");
//     } else if (values.email.includes(" ")) {
//         error.email = toast.error("Wrong Email...!")
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         error.email = toast.error("Invalid email address...!")
//     }

//     return error;
// }

export function emailValidate(values) {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email) {
      errors.email = "Email not be empty";
    } else if (!regex.test(values.email)) {
      errors.email = "Wrong format email";
    } 
    return errors; 
  }