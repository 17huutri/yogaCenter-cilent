import { getAllBlogs, deleteBlog, createBlog } from '../../helper/blogHelper.js'
import { uploadFile, getFile } from '../../helper/upload.js';
import convertToBase64 from '../../helper/convert.js';
import { useNavigate, Navigate } from "react-router-dom";
import { getAllUser } from '../../helper/helper.js';
import { blog } from '../../assets/data/data.js';
import toast,{ Toast } from 'react-hot-toast';
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import "../../styles/blog.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
export default function BlogNew() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState([]);

  const navigate = useNavigate();
  const showImg = (id) => {
    return getFile(id)
  }
  const fetchData = async () => {
    let query = {'fullName' : '','isActive' : 1}
    const blogs = await getAllBlogs();
    const authors = await getAllUser(query);
    setBlogs(blogs.data)
    setAuthors(authors.data)
  }
  useEffect(() => {
    let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: "Loading...",
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>,
      });
      dataPromise
        .then(function () {
          navigate("/homeblog");
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  return (
    <section className='blog'>

      <div className='container grid grid-cols-3 '>
        {blogs.map((blog) => (

          <div className='box boxItems' key={blog._id}>


            <div className='img'>
              <img src={showImg(blog._image)} alt='' />
            </div>
            <div className='details'>
              <div className='tag'>
                <AiOutlineTags className='icon' />
                <a href='/'>#Yoga</a>
              </div>
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 180)}...</p>
              <Link to={`/detailblog/${blog._id}`}>
                <p className="inline-block bg-yellow-500 hover:bg-black-700 text-black py-2 px-4 rounded" ><button>Read more</button></p>
              </Link>

              <div className='date'>
                <AiOutlineClockCircle className='icon' /> <label htmlFor=''>30/08</label>
                <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  )
}