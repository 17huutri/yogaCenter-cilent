import React from "react"
import BlogNew from "../components/blog/BlogNew"
import { Category } from "../components/blog/Category"
import Footer from '../components/homepage/Footer';
import Header from "./homepage/Header";

export const Homeblog = () => {
  return (
    <>
      {/*  <Slider />*/}
      <div className="px-8"> <Header /></div>
      <Category />
      <BlogNew />
      <Footer />
    </>
  )
}
