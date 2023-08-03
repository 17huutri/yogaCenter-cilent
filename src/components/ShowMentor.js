import React, { useState, useEffect } from 'react';
import { getMentors, deleteUser, updateUser_1, disableUser, ableUser } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';
import Select from 'react-select'
import { DataRole, DataRoleForStaff } from '../helper/dataRole.js'
import avatar from '../assets/profile.png';
import {

    FaPortrait
} from "react-icons/fa";
import { getAllGrades } from '../helper/gradeHelper';
export default function ShowMentors() {
    const [data, setData] = useState([]);
    const [updatedUserData, setUpdatedUserData] = useState({});
    const [grades, setGrades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [detail, setDetail] = useState([]);
    const navigate = useNavigate()
    const handleChange = (event) => {
        setUpdatedUserData({ ...updatedUserData, [event.target.name]: event.target.value });

    }
    function showRoleName(roleId) {
        if (roleId == 1) return 'CUSTOMER'
        else if (roleId == 2) return 'MENTOR'
        else if (roleId == 3) return 'STAFF'
        else if (roleId == 4) return 'ADMIN'
    }
    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    const fetchData = async (searchName, active) => {
        let query = { 'fullName': searchName || '', 'active': active || 0 }
        setCurrentPage(1);
        // console.log(query);
        const grades = await getAllGrades()
        const response = await getMentors(query);
        setData(response.data);
        setGrades(grades.data);
    };
    const [filter, setFilter] = useState('');
    const [active, setActive] = useState('1');
    const [searchName, setSearchName] = useState();
    const filterData = [
        {
            isActive: 0, name: 'UNACTIVED'
        },
        {
            isActive: 1, name: 'ACTIVED'
        },
    ]
    let optionsFilter = filterData.map(function (choose) {
        return { value: choose.isActive, label: choose.name };
    })
    useEffect(() => {
        if (roleId < 1) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        } else {
            let dataPromise = fetchData();
            // toast.promise(dataPromise, {
            //     loading: 'Loading...',
            //     success: <b>Successfully...!</b>,
            //     error: <b>Failed !!!</b>
            // })
            // dataPromise.then(function () { navigate('/showMentors') }).catch(error => {
            //     console.error(error);
            // });
        }


    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await deleteUser(userId);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/showMentors') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (user) => {
        setUpdatedUserData(user);
        setShowModal(true);
    }
    let optionsRoleForAdmin = DataRole.map(function (role) {
        return { value: role.roleId, label: role.roleName };
    })
    const handleSelectRole = (event, meta) => {
        // console.log(meta.name);
        // console.log(event.value);
        setUpdatedUserData({ ...updatedUserData, [meta.name]: event.value });
    }
    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const response = await updateUser_1(updatedUserData._id, updatedUserData); // Call your update function to update the user data
            setShowModal(false);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/showMentors') }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
    const handleActive = async (userId) => {
        try {
            await ableUser(userId);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: "Loading...",
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>,
            });
            dataPromise
                .then(function () {
                    navigate("/showMentors");
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const handleUnactive = async (id) => {
        try {
            await disableUser(id);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: "Loading...",
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>,
            });
            dataPromise
                .then(function () {
                    navigate("/showMentors");
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const handleShow = (user) => {
        setDetail(user)
        setShowCard(true);
    }
    // Tính toán các chỉ số cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(10);

    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentdata = data.slice(indexOfFirstUser, indexOfLastUser);
    let optionsRoleForStaff = DataRoleForStaff.map(function (role) {
        return { value: role.roleId, label: role.roleName };
    })
    function valuesContext(value) {
        if (value == null || value == '') return 'Not yet'
        else return value;

    }
    function showActive(activeId) {
        if (activeId == 0) return 'UNACTIVED'
        else if (activeId == 1) return 'ACTIVED'

    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleSelectFilter = async (event, meta) => {

        setActive(event.value);
        fetchData(searchName, event.value);

    }
    const [searchString, setSearchString] = useState('');
    async function handleSearch(event, meta) {
        setSearchName(event.target.value);
        fetchData(event.target.value, active);
    }
    return (
        <div className='max-w-4x2' style={{ marginLeft: '15rem' }}>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="my-10 mt-6 flex items-center">
                <Select
                    options={optionsFilter}
                    name="active"
                    defaultValue={optionsFilter[0]}
                    placeholder="Active status"
                    onChange={(event, meta) => handleSelectFilter(event, meta)}
                />
                <input
                    type="text"
                    placeholder="Search by name"
                    onChange={(event, meta) => handleSearch(event, meta)}
                    className="ml-4 w-64 rounded-md border border-gray-300 px-4 py-2"
                />
            </div>

            <div className='max-w-4x2 mx-auto'>
                <table className='mb-8 w-full overflow-hidden whitespace-nowrap rounded-lg bg-white shadow-sm'>
                    <thead>
                        <tr className='text-left font-bold'>
                            <th className='px-6 pt-5 pb-4'>Name</th>
                            <th className='px-6 pt-5 pb-4'>Email</th>

                            <th className='px-6 pt-5 pb-4'>Detail</th>
                            <th className='px-6 pt-5 pb-4'>Active</th>
                            <th className='px-6 pt-5 pb-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {data.map((user) => (
                            <tr key={user._id}>
                                <td className='px-6 py-4'>{user.fullName}</td>
                                <td className='px-6 py-4'>{user.email}</td>

                                <td className="px-6 py-4"><button onClick={() => handleShow(user)} className="mr-2 rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-slate-700"><FaPortrait></FaPortrait></button></td>
                                <td className="px-6 py-4">
                                    {showActive(user.isActive)}  </td>
                                <td className='px-6 py-4'>
                                    {roleId == 4 && (
                                        <button
                                            className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>)}


                                    {user.isActive == 1 && roleId == 4 && (
                                        <button
                                            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                                            onClick={() => handleUnactive(user._id)}
                                        >
                                            Unactive
                                        </button>
                                    )}
                                    {user.isActive == 0 && roleId == 4 && (
                                        <button
                                            className="mr-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                            onClick={() => handleActive(user._id)}
                                        >
                                            Active
                                        </button>
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
                                        <h3 className="text-3xl font-semibold">Update User</h3>
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
                                        {/* <div className="mb-4">
                    <label className="mb-2 block font-bold text-gray-700">
                      Role:
                    </label>
                    <input
                      type="number"
                      name="roleId"
                      value={updatedUserData.roleId}
                      onChange={handleChange}
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div> */}

                                        <div className="mb-4">
                                            <label className="block text-gray-700 ml-6 font-bold mb-2">Role Name :</label>
                                            {roleId == 4 && (
                                                <Select options={optionsRoleForAdmin} name="roleId" onChange={(event, meta) => handleSelectRole(event, meta)}  className="w-40 rounded ml-6" />
                                            )
                                            }
                                            {roleId == 3 && (
                                                <Select options={optionsRoleForStaff} name="roleId" onChange={(event, meta) => handleSelectRole(event, meta)}className="w-40 rounded ml-6"  />
                                            )
                                            }
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
                                                onClick={(event) => handleUpdate(event)}
                                            >
                                                Save Changes
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
                {showCard ? (
                    <>
                        <div className="fixed inset-1  z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                            <div className="relative mx-auto my-6 w-auto max-w-3xl">
                                {/*content*/}

                                {/*header*/}
                                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-300 p-5">

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
                                <div>

                                    <div className=" bg-gradient-to-r from-purple-500 to-green-400 rounded-md">
                                        <div className="grid grid-cols-3">
                                            <div className="col-span-1"></div>
                                            <img className="rounded-full w-4/5 col-span-1 ml-8 mt-16" src={detail.profile || avatar} alt='profile' />
                                            <div className="col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-2 ml-20 mt-14">
                                            <div className="col-span-1 ml-10 mb-8">
                                                <p><b>Name:</b> {detail.fullName}</p>

                                                <p><b>Email:</b> {detail.email}</p>
                                                <p><b>Phone: </b>{detail.phone}</p>

                                                <p><b>Status: </b>{detail.isActive ? 'Active' : 'Unactive'}</p>
                                            </div>
                                            <div className="col-span-1 mb-8">
                                                <p><b>Address: </b>{detail.address}</p>

                                                <p><b>Role: </b>{detail.roleId == 2 ? 'Mentor' : ''}</p>

                                                <p><b>Description: </b>{detail.description}</p>
                                            </div>
                                        </div>






                                        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                                            <button
                                                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                                                type="button"
                                                onClick={() => setShowCard(false)}
                                            >
                                                Close
                                            </button>

                                        </div>
                                    </div>
                                    {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Update
                                    </button> */}
                                </div>
                                {/*footer*/}

                            </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </>
                ) : null}
                <Pagination
                    userPerPage={userPerPage}
                    totalUser={data.length}
                    currentdata={currentPage}
                    paginate={paginate}
                />
            </div >

        </div>

    )
} const Pagination = ({ userPerPage, totalUser, currentdata, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUser / userPerPage); i++) {
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