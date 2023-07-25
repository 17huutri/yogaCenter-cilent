import React, { useState, useEffect } from "react";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../helper/courseHelper";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Course() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const handleChange = (event) => {
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };
  let roleId = localStorage.getItem('roleId');
  let token = localStorage.getItem('token');
  let navigate = useNavigate()
  const fetchData = async () => {
    const response = await getAllCourses();
    setData(await response.data);
  };

  useEffect(() => {
    if (roleId < 4) {
      navigate('*');
  } else if (token == null) {
      navigate('*');
  } else {
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
          loading: 'Loading...',
          success: <b>Successfully...!</b>,
          error: <b>Failed !!!</b>
      })
      dataPromise.then(function () { navigate('/course') }).catch(error => {
          console.error(error);
      });
  }

  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteCourse(id);
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
          loading: 'Loading...',
          success: <b>Successfully...!</b>,
          error: <b>Failed !!!</b>
      })
      dataPromise.then(function () { navigate('/course') }).catch(error => {
          console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createModal = () => {
    setShowModal(true);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await createCourse(newData);
      setShowModal(false);
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
          loading: 'Loading...',
          success: <b>Successfully...!</b>,
          error: <b>Failed !!!</b>
      })
      dataPromise.then(function () { navigate('/course') }).catch(error => {
          console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleUpdateCourse = async (event) => {
    event.preventDefault();
    try {
      const response = await updateCourse(selectedCourse._id, selectedCourse);
      setShowEditModal(false);
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
          loading: 'Loading...',
          success: <b>Successfully...!</b>,
          error: <b>Failed !!!</b>
      })
      dataPromise.then(function () { navigate('/course') }).catch(error => {
          console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };
  // Tính toán các chỉ số cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage, setCoursePerPage] = useState(10);

  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentdata = data.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className='max-w-4x2' style={{marginLeft: '15rem'}}>
       <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div>
          <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => createModal()}
          >
            New Course
          </button>
        </div>
        <table className="mb-8 w-full overflow-hidden whitespace-nowrap rounded-lg bg-white shadow-sm">
          <thead>
            <tr className="text-left font-bold">
              <th className="px-6 pb-4 pt-5">Course Name</th>
              <th className="px-6 pb-4 pt-5">Price</th>
              <th className="px-6 pb-4 pt-5">Start</th>
              <th className="px-6 pb-4 pt-5">End</th>
              <th className="px-6 pb-4 pt-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentdata.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4">{course.courseName}</td>
                <td className="px-6 py-4">{course.price}$</td>
                <td className="px-6 py-4">{course.startTime}</td>
                <td className="px-6 py-4">{course.endTime}</td>
                <td className="px-6 py-4">
                  <button
                    class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 ml-2"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <form onSubmit={handleCreate}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="courseName">
                        Course Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="courseName"
                        type="text"
                        name="courseName"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                        Price
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        name="price"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="startTime">
                        Start Date
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="startTime"
                        type="date"
                        name="startTime"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">
                        End Date
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="endTime"
                        type="date"
                        name="endTime"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {showEditModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <form onSubmit={handleUpdateCourse}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="courseName">
                        Course Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="courseName"
                        type="text"
                        name="courseName"
                        required
                        value={selectedCourse.courseName}
                        onChange={(event) =>
                          setSelectedCourse({
                            ...selectedCourse,
                            courseName: event.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                        Price
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        name="price"
                        required
                        value={selectedCourse.price}
                        onChange={(event) =>
                          setSelectedCourse({
                            ...selectedCourse,
                            price: event.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="startTime">
                        Start Date
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="startTime"
                        type="date"
                        name="startTime"
                        required
                        value={selectedCourse.startTime}
                        onChange={(event) =>
                          setSelectedCourse({
                            ...selectedCourse,
                            startTime: event.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">
                        End Date
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="endTime"
                        type="date"
                        name="endTime"
                        required
                        value={selectedCourse.endTime}
                        onChange={(event) =>
                          setSelectedCourse({
                            ...selectedCourse,
                            endTime: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
          <Pagination
        coursePerPage={coursePerPage}
        totalCourse={data.length}
        currentdata={currentPage}
        paginate={paginate}
      />
      </div>
  
  );
}const Pagination = ({ coursePerPage, totalCourse, currentdata, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourse / coursePerPage); i++) {
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
                number === currentdata
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
