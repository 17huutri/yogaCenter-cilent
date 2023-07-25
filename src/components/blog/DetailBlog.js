import React, { useState } from "react"

import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllBlogs } from '../../helper/blogHelper.js'
import { getFile } from '../../helper/upload.js';
import '../../styles/detail.css'

import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"


export const DetailBlog = () => {

  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState([])

  const { id } = useParams();

  const showImg = (id) => {
    return getFile(id)
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const foundGrade = blogs.find((item) => item._id === id);
      setBlog(foundGrade);
    }
  }, [blogs, id]);
  const fetchData = async () => {
    const blogs = await getAllBlogs();

    setBlogs(blogs.data)

    console.log(blogs)
  }

  // return(
  //     <section className='blog'>
  //       <h1 className="text-3xl font-bold my-4">{blog.title}</h1>
  //       <img className="w-full h-auto mb-4" src={showImg(blog._image)} alt="Blog Post" />
  //       <p className="text-gray-700 text-base">{blog.content}</p>
  //       <p >Author: Sunil</p>

  //       <footer className='boxItems'>
  //      <div className='container '>
  //       <p>Cartsy Medicine - All right reserved - Design & Developed by RedQ, Inc</p>
  //       <div className='social flex'>
  //         <BsFacebook className='icon' />
  //         <RiInstagramFill className='icon' />
  //         <AiFillTwitterCircle className='icon' />
  //         <AiFillLinkedin className='icon' />
  //       </div>
  //     </div>
  //   </footer>

  //     </section>
  // )


  return (
    <>
      {blogs ? (
        <section className='singlePage'>
          <div className='container'>
            <h1 className="mimi">{blog.title}</h1>
            <div className='left'>
              <img src={showImg(blog._image)} alt="Blog Post" />
            </div>
            <div className='right'>
              <div className='buttons'>
                <button className='button'>
                  <BsPencilSquare />
                </button>
                <button className='button'>
                  <AiOutlineDelete />
                </button>
              </div>
              <h1>Benefit Learing Yoga</h1>
              <p>{blog.content}</p>
              <p>{blogs.desca}</p>
              {/* <img src={cover[blog._id]} alt="Blog Post" /> */}

              <p>Author: Sunil</p>

            </div>
          </div>
        </section>
      ) : null}
    </>
  )


}
