import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import {
    getAllBookings,
    createBooking,
    deleteBooking,
    updateBooking,
    rejectBooking,
    getBookings
} from '../helper/bookingHelper.js';
import { getCustomers } from '../helper/helper.js';
import { getAllGrades } from '../helper/gradeHelper.js';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';


export default function Booking() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newData, setNewData] = useState({})
    const [customers, setCustomers] = useState([])
    const [grades, setGrade] = useState([])
    const navigate = useNavigate();
    const handleSelectCustomer = (event, meta) => {
        setNewData({ ...newData, [meta.name]: event.value });
    }
    const handleSelectGrade = (event, meta) => {
        setNewData({ ...newData, [meta.name]: event.value });
    }
    let optionsCustomer = customers.map(function (customer) {
        return { value: customer._id, label: customer.username };
    })
    let optionsGrade = grades.map(function (grade) {
        return { value: grade._id, label: grade.gradeName };
    })
    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    const fetchData = async (status) => {
        let query = { 'isAccepted': status}
        const response = await getBookings(query);
        setData(response.data);
        // console.log(data)

    }

    useEffect(() => {
        if (roleId < 3) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        } else {
            let dataPromise = fetchData(status);
            // toast.promise(dataPromise, {
            //     loading: 'Loading...',
            //     success: <b>Successfully...!</b>,
            //     error: <b>Failed !!!</b>
            // })
            // dataPromise.then(function () { navigate('/booking') }).catch(error => {
            //     console.error(error);
            // });
        }

    }, []);

    const handleDelete = async (event, id) => {
        event.currentTarget.disabled = true;
        try {
            setNowStatus(-1)
            await deleteBooking(id);
            let dataPromise = fetchData(nowStatus);
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/booking') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            toast.error('Failed');
        }
    }
    function showStatus(status) {
        if (status == -1) return 'Rejected'
        else if (status == 0) return 'Waiting'
        else if (status == 1) return 'Accepted'
    }
    const handleCreate = async (event, data) => {
        // event.preventDefault()
        try {
            let createPromise = await createBooking(data);
            setShowModal(false);
            let dataPromise = fetchData(status);
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/booking') }).catch(error => {
                console.error(error);
            });


        } catch (error) {
            console.log(error)
        }
    }
    const createModal = () => {
        setShowModal(true);
    }
    const [nowStatus,setNowStatus] = useState();
    const handleUpdate = async (event, id) => {
        // event.currentTarget.disabled = true;
        // event.preventDefault()
        try {
            const response = await updateBooking(id); // Call your update function to update the user data
            // console.log(response)
            
            setShowModal(false);
            let dataPromise = fetchData(0);
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/booking') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            toast.error('Something wrong, the class already been full or the user has been in class');
            console.log(error)
        }
    }
    const handleReject = async (event, id) => {
        event.currentTarget.disabled = true;
        // event.preventDefault()
        try {
            const response = await rejectBooking(id); // Call your update function to update the user data
            setShowModal(false);
            setNowStatus(-1)
            let dataPromise = fetchData(0);
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/booking') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.log(error)
        }
    }
    function showPayment(payment){
        if(!payment) return 'Cash'
        else return 'PayPal'
    }
    // Tính toán các chỉ số cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingPerPage, setBookingPerPage] = useState(10);

    const indexOfLastBooking = currentPage * bookingPerPage;
    const indexOfFirstUser = indexOfLastBooking - bookingPerPage;
    const currentdata = data.slice(indexOfFirstUser, indexOfLastBooking);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [status,setStatus] = useState(0)
    const handleSelectFilter = async (event, meta) => {
        
        fetchData(event.value)
    }
    const filterData = [
        {
            isAccepted: -1, name: 'REJECTED'
        },
        {
            isAccepted: 0, name: 'WAITING'
        },
        {
            isAccepted: 1, name: 'ACCEPTED'
        },
    ]
    let optionsFilter = filterData.map(function (choose) {
        return { value: choose.isAccepted, label: choose.name };
    })
    function convertDate(day){
        const date = new Date(day);
        var options = {hour : "numeric",minute : "numeric"};
        return date.toLocaleDateString('vi-VN',options);
    }
    return (


        <div className='max-w-4x2' style={{ marginLeft: '15rem' }}>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='my-10 mt-6 flex items-center'>
            <Select options={optionsFilter} name='isAccepted'
                defaultValue={optionsFilter[1]}
                placeholder="Status" onChange={(event, meta) => handleSelectFilter(event, meta)} />
           </div>
            <div class="">
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>
                            <th className='px-6 pt-5 pb-4'>Class</th>
                            <th className='px-6 pt-5 pb-4'>Name</th>
                            <th className='px-6 pt-5 pb-4'>Payment</th>
                            <th className='px-6 pt-5 pb-4'>Created At</th>
                            <th className='px-6 pt-5 pb-4'>Status</th>
                            <th className='px-6 pt-5 pb-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {currentdata.map((data) => (
                            <tr key={data._id}>


                                <td className='px-6 py-4'>{data.grade.gradeName}</td>
                                <td className='px-6 py-4'>{data.user.fullName}</td>
                                <td className='px-6 py-4'>{showPayment(data.payment)}</td>
                                <td className='px-6 py-4'>{convertDate(data.createdAt)}</td>
                                <td className='px-6 py-4'>{showStatus(data.isAccepted)}</td>
                                <td className='px-6 py-4'>
                                    {data.isAccepted == 0 &&
                                        <button
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                                            onClick={(event) => handleUpdate(event, data._id)}
                                        >
                                            Accept
                                        </button>
                                    }

                                    {data.isAccepted == 0 && <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={(event) => handleReject(event, data._id)}
                                    >
                                        Reject
                                    </button>}
                                    {data.isAccepted == 1 && roleId == 4 &&
                                        <button
                                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                            onClick={(event) => handleDelete(event, data._id)}
                                        >
                                            Delete
                                        </button>
                                    }
                                    {data.isAccepted == -1 && roleId == 4 &&
                                        <button
                                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                            onClick={(event) => handleDelete(event, data._id)}
                                        >
                                            Delete
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    bookingPerPage={bookingPerPage}
                    totalBooking={data.length}
                    currentdata={currentPage}
                    paginate={paginate}
                />
            </div >

        </div>

    )
} const Pagination = ({ bookingPerPage, totalBooking, currentdata, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalBooking / bookingPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-4 flex justify-center">
            <ul className="inline-flex space-x-2">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`rounded-lg px-3 py-1 ${number === currentdata
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
