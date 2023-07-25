import React, { useState, useEffect } from "react";
import { getAllBlogs, deleteBlog, createBlog } from "../helper/blogHelper.js";
import { uploadFile, getFile } from "../helper/upload.js";
import convertToBase64 from "../helper/convert";
import { getAllUser } from "../helper/helper.js";
import useFetch from "../hooks/fetch.hook";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
// import test from "../styles/test.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileUpload, setSelectedFileUpload] = useState();
  const [{ apiData }] = useFetch();
  let formData = new FormData();
  const navigate = useNavigate();

  const fetchData = async () => {
    const blogs = await getAllBlogs();
    setBlogs(blogs.data);
  };

  let id = "";
  let roleId = localStorage.getItem("roleId");
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (roleId < 3 || token == null) {
      navigate("*");
    } else {
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: "Loading...",
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>,
      });
      dataPromise
        .then(function () {
          navigate("/blog");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleChange = (event) => {
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };

  const onUpload = async (event) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setSelectedFileUpload(event.target.files[0]);
    setSelectedFile(base64);
  };

  const handleDelete = async (event, id) => {
    event.currentTarget.disabled = true;
    try {
      const response = await deleteBlog(id);
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: "Loading...",
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>,
      });
      dataPromise
        .then(function () {
          navigate("/blog");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const showImg = (id) => {
    return getFile(id);
  };

  const handleCreate = async (event, data) => {
    event.preventDefault();
    formData.append("file", selectedFileUpload);
    let file = await uploadFile(formData);
    id = file.data._id;
    data.user = apiData._id;
    data._image = id;

    try {
      const response = await createBlog(data);
      setShowModal(false);
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: "Loading...",
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>,
      });
      dataPromise
        .then(function () {
          navigate("/blog");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const createModal = () => {
    setShowModal(true);
  };
  const [showContent, setShowContent] = useState(false);

  const toggleShowContent = () => {
    setShowContent(!showContent);
  };

  // Tính toán các chỉ số cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(3);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-4x2" style={{ marginLeft: "15rem" }}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div class="">
        <div>
          {roleId >= 3 && (
            <>
              <button
                class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={() => createModal()}
              >
                New Blog
              </button>
            </>
          )}
        </div>

        <table className="">
          <thead>
            <tr className="text-left font-bold">
              <th className="px-6 pb-4 pt-5">Title</th>
              <th className="px-6 pb-4 pt-5">Author</th>
              <th className="px-6 pb-4 pt-5">Content</th>
              <th className="px-6 pb-4 pt-5">Image</th>
              <th className="px-6 pb-4 pt-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentBlogs.map((blog) => (
              <tr key={blog._id}>
                {/* Phần nội dung của từng blog */}
                <td className="px-6 py-4">{blog.title}</td>
                {/* <td className='px-6 py-4'>{blog.author}</td> */}
                <td className="px-6 py-4">{blog.user.username}</td>
                <td className='px-6 py-4'>
                {showContent ? blog.content : blog.content.split(' ').slice(0, 20).join(' ')}
                {blog.content.split(' ').length > 20 ? (
                  <span onClick={toggleShowContent} className='text-blue-500 cursor-pointer'>
                    {showContent ? ' Thu gọn' : ' Xem thêm...'}
                  </span>
                ) : (
                  ''
                )}
              </td>
                <td className="px-6 py-4">
                  <img src={showImg(blog._image)} alt="" />
                </td>
                <td className="px-6 py-4">
                  {roleId >= 3 && (
                    <>
                      <button
                        className="rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                        onClick={(event) => handleDelete(event, blog._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal ? (
          <>
            <div className="fixed inset-1  z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="relative mx-auto my-6 w-auto max-w-3xl">
                {/*content*/}
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                    <h3 className="text-3xl font-semibold">Create Blog</h3>
                    <button
                      className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <form>
                    <div className="mb-4">
                      <label className="mb-2 block font-bold text-gray-700">
                        Title :
                      </label>
                      <input
                        type="text"
                        name="title"
                        onChange={(event) => handleChange(event)}
                      ></input>
                    </div>
                    <div class="mb-3">
                      <label
                        for="formFile"
                        class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                      >
                        Click here to upload image
                      </label>
                      <input
                        class="focus:border-primary focus:shadow-te-primary dark:focus:border-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                        type="file"
                        id="formFile"
                        onChange={(event) => onUpload(event)}
                      />
                    </div>
                    <img src={selectedFile}></img>
                    <div className="mb-4">
                      <label className="mb-2 block font-bold text-gray-700">
                        Content :
                      </label>
                      <input
                        type="text"
                        name="content"
                        onChange={(event) => handleChange(event)}
                      ></input>
                    </div>

                    <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                      <button
                        className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                        onClick={(event) => handleCreate(event, newData)}
                      >
                        Create
                      </button>
                    </div>
                    {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Update
                                    </button> */}
                  </form>
                  {/*footer*/}
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}

        {/* Phần phân trang */}
        <Pagination
          blogsPerPage={blogsPerPage}
          totalBlogs={blogs.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

// Component phân trang
const Pagination = ({ blogsPerPage, totalBlogs, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 flex justify-center">
      <ul className="inline-flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`rounded-lg px-3 py-1 ${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
