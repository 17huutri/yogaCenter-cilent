import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { getMentors } from '../helper/helper';
import { getAllCourses } from '../helper/courseHelper';
import { deleteGrade, createGrade, getAllGrades } from '../helper/gradeHelper'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getFile, uploadFile } from '../helper/upload';
import convertToBase64 from "../helper/convert";

export default function Grade() {
    const [mentors, setMentor] = useState([])
    // const [customers, setCustomers] = useState([])
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileUpload, setSelectedFileUpload] = useState();
    const [courses, setCourses] = useState([])
    const [grades, setGrades] = useState([])
    const [newData, setNewData] = useState([])
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        let query_1 = {'active' : 1,'username' : ''};
        const courses = await getAllCourses();
        const mentors = await getMentors(query_1)
        const grades = await getAllGrades();
        setMentor(mentors.data);
        setCourses(courses.data)
        setGrades(grades.data)
    }
    let formData = new FormData();
    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    let navigate = useNavigate()
    const chooseDayInWeek = [
        {
            id: 1, value: 'Monday,Wednesday,Friday'
        },
        {
            id: 2, value: 'Tuesday,Thursday,Saturday'
        },
    ]
    useEffect(() => {
        if (roleId < 2) {
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
            dataPromise.then(function () { navigate('/grade') }).catch(error => {
                console.error(error);
            });
        }
    }, []);
    const handleChange = (event) => {
        setNewData({ ...newData, [event.target.name]: event.target.value });
    }
    const handleCreate = async (event, data) => {
        event.preventDefault();
        formData.append("file", selectedFileUpload);
        let file = await uploadFile(formData);
        data._image = file.data._id;
        try {



            const response = await createGrade(data);
            setShowModal(false);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/grade') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.error(error)
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteGrade(id);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/grade') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.error(error)
        }
    }
    const onUpload = async (event) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setSelectedFileUpload(event.target.files[0]);
        setSelectedFile(base64);
    };
    const showImg = (id) => {
        return getFile(id);
    };
    const createModal = () => {
        setShowModal(true);
    }
    const handleSelectMentor = (event, meta) => {
        setNewData({ ...newData, [meta.name]: event.value });
    }
    const handleSelectCourse = (event, meta) => {
        setNewData({ ...newData, [meta.name]: event.value });
    }
    const handleSelectDay = (event, meta) => {
        setNewData({ ...newData, [meta.name]: event.value });
    }
    let optionsMentor = mentors.map(function (mentor) {
        return { value: mentor._id, label: mentor.username };
    })
    let optionsCourse = courses.map(function (course) {
        return { value: course._id, label: course.courseName };
    })
    let optionsDay = chooseDayInWeek.map(function (day) {
        return { value: day.value, label: day.value };
    })
  
    // Tính toán các chỉ số cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [gradePerPage, setGradePerPage] = useState(3);

    const indexOfLastGrade = currentPage * gradePerPage;
    const indexOfFirstGrade = indexOfLastGrade - gradePerPage;
    const currentgrades = grades.slice(indexOfFirstGrade, indexOfLastGrade);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className='max-w-4x2' style={{ marginLeft: '8rem' }}>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => createModal()}>
                    New Grade
                </button>
            </div>

            <div className='max-w-4x2 mx-auto'>
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>

                            <th className='px-6 pt-5 pb-4'>Mentor</th>
                            <th className='px-6 pt-5 pb-4'>Number Of Student</th>
                            <th className='px-6 pt-5 pb-4'>Course</th>
                            <th className='px-6 pt-5 pb-4'>Grade Name</th>
                            <th className='px-6 pt-5 pb-4'>Image</th>
                            <th className='px-6 pt-5 pb-4'>Room</th>
                            <th className='px-6 pt-5 pb-4'>On</th>
                            <th className='px-6 pt-5 pb-4'>From</th>
                            <th className='px-6 pt-5 pb-4'>To</th>
                            <th className='px-6 pt-5 pb-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {currentgrades.map((grade) => (
                            <tr key={grade._id}>


                                <td className='px-6 py-4'>{mentors.map((mentor) => {
                                    if (grade.instructor == mentor._id)
                                        return mentor.username

                                    // data cua? booking
                                })}</td>
                                <td className='px-6 py-4'>{grade.nOfStudent}</td>
                                <td className='px-6 py-4'>{courses.map((course) => {
                                    if (grade.course == course._id)
                                        return course.courseName


                                })}</td>
                                <td className='px-6 py-4'>{grade.gradeName}</td>
                                <td className="px-6 py-4">
                                    <img src={showImg(grade._image)} alt="" />
                                </td>

                                <td className='px-6 py-4'>{grade.room}</td>
                                <td className='px-6 py-4'>{grade.weekDay}</td>
                                <td className='px-6 py-4'>{grade.startTimeGrade}</td>
                                <td className='px-6 py-4'>{grade.endTimeGrade}</td>
                                <td className='px-6 py-4'>

                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleDelete(grade._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showModal ? (
                    <>
                        <div

                            className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-1 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Create Grade
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <form>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Course :</label>
                                            <Select options={optionsCourse} name="course" onChange={(event, meta) => handleSelectCourse(event, meta)} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Mentor :</label>
                                            <Select options={optionsMentor} name="instructor" onChange={(event, meta) => handleSelectMentor(event, meta)} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Grade Name :</label>
                                            <input type="text" name="gradeName" onChange={(event) => handleChange(event)} ></input>
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
                                            <label className="block text-gray-700 font-bold mb-2">Description :</label>
                                            <input type="text" name="description" onChange={(event) => handleChange(event)} ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Room :</label>
                                            <input type="text" name="room" onChange={(event) => handleChange(event)} ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Day :</label>
                                            <Select options={optionsDay} name="weekDay" onChange={(event, meta) => handleSelectDay(event, meta)} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">From :</label>
                                            <input type="time" name="startTimeGrade" onChange={(event) => handleChange(event)} ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">To :</label>
                                            <input type="time" name="endTimeGrade" onChange={(event) => handleChange(event)}></input>

                                        </div>

                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={(event) => handleCreate(event, newData)}                                        >
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
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <Pagination
                    gradePerPage={gradePerPage}
                    totalGrade={grades.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div >

        </div>

    )
} const Pagination = ({ gradePerPage, totalGrade, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalGrade / gradePerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-4 flex justify-center">
            <ul className="inline-flex space-x-2">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`rounded-lg px-3 py-1 ${number === currentPage
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
