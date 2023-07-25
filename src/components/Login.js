import React from "react";
import Content from "./login/loginContent.js"
import Header from "./homepage/Header";
import Footer from "./homepage/Footer";

export default function Login() {
  return (
    <div className='overflow-hidden'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}