import React from "react";
import Content from "./register/registerContent.js"
import Header from "./homepage/Header";
import Footer from "./homepage/Footer";

export default function Register() {
  return (
    <div className='overflow-hidden'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}