import toast from "react-hot-toast";
import { authenticate, checkemail } from "./helper";

/** validate login page username */
export async function usernameValidateLogin(values) {
  // const errors = usernameVerify({}, values);
  const errors = {};

  if (values.username) {
    // Kiểm tra xem tên người dùng có trống không
    if (!values.username.trim()) {
      errors.username = "Please input your username ";
    } else {
      // Kiểm tra xem tên người dùng đó có tồn tại không
      const { status } = await authenticate(values.username);
      if (status !== 200) {
        errors.exist = toast.error("User dose not exist ...");
      }
    }
  }

  return errors;
}
/**validate email */
// export async function emailValidateRegister(values) {
//   const errors = emailVerify({}, values);

//   const { status } = await authenticate(values.email);

//   if (status === 200) {
//     errors.email = "Email already exists!";
//   }
//   return errors;
// }

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
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

/** validate profile page */
export async function profileValidation(values) {
  const errors = {};

  if (!values.email) {
    errors.email = toast.error("Email Required...!");
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = toast.error("Invalid Email");
  }
  return errors;
}

/** *********************************************** */

/** validate password */
function passwordVerify(errors = {}, values) {
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 1 || values.password.length > 50) {
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
    toast.error(errors.password);
  }

  return errors;
}

/** validate username */
export async function usernameVerify(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Please input your username";
  // } else {
  //   if (values.username.length < 5) {
  //     errors.username = "Username must be between 5 chars";
  //   }
  }
  const { status } = await authenticate(values.username);
  if (status == 200) {
    errors.exist = toast.error("User exist ...");
  }

  // if (values.username.includes(" ")) {
  //   errors.username = "Username cannot contain spaces";
  // }

  // let username = values.username.toLowerCase();
  // if (username !== values.username) {
  //   errors.username = "Username must be lowercase";
  // }

  // if (Object.keys(errors).length) {
  //   toast.error(errors.username);
  //   return errors;
  // }
  return errors;
}
/** validate email */


export async function emailVerify(values) {
  const errors = {};
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { status } = await authenticate(values.email);
  if (!values.email) {
    errors.email = "Please input your Email...!!";
  } else if (status === 500) {
    errors.email = "Email already exists!";
  }else if (!regex.test(values.email)) {
    errors.email = "Invalid Email";
  } 

  if (Object.keys(errors).length) {
    toast.error(errors.email);
    return;
  }
  return errors;
}
export function validateTime(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  if (start.getTime() < end.getTime()) {
    return true;
  }
  
  // return false;
}
