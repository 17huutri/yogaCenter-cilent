
import React, { useState, useEffect } from 'react';
import { getAdmins, deleteUser, updateUser_1 } from '../helper/helper';
import "../styles/1.css"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';
import Select from 'react-select'
export default function ShowAdmins() {
    const [data, setData] = useState([]);
    const [updatedUserData, setUpdatedUserData] = useState({});

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
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
    const fetchData = async (searchName,active) => {
        
            let query = { 'username': searchName || '', 'active': active || 0 }
            setCurrentPage(1);
            console.log(query);
            const response = await getAdmins(query);
            setData(response.data);
        ;
    }
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
        if (roleId != 4) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        } else {
            let dataPromise = fetchData(filter);
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/showAdmins') }).catch(error => {
                console.error(error);
            });
        }

    }, []);


    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/showAdmins') }).catch(error => {
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
    function valuesContext(value) {
        if (value == null || value == '') return 'Not yet'
        else return value;

    }
    function showActive(activeId) {
        if (activeId == 0) return 'UNACTIVED'
        else if (activeId == 1) return 'ACTIVED'

    }
    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            await updateUser_1(updatedUserData._id, updatedUserData);
            setShowModal(false);
            let dataPromise = fetchData();
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/showAdmins') }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Tính toán các chỉ số cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(10);

    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentdata = data.slice(indexOfFirstUser, indexOfLastUser);

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
        <div className=''>
            <div className='max-w-4x2' style={{ marginLeft: '15rem' }}>

                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <Select options={optionsFilter} name='active'
                    defaultValue={optionsFilter[0]}
                    placeholder="Active status" onChange={(event, meta) => handleSelectFilter(event, meta)} />
                <div className="mt-6 my-10">
                    <input
                        type="text"
                        placeholder="Search user"
                        onChange={(event, meta) => handleSearch(event, meta)}
                        className="border border-gray-300 px-4 py-2 rounded-md w-64"

                    />

                </div>
                <div className='mb-8 w-full overflow-hidden whitespace-nowrap rounded-lg bg-white shadow-sm'>
                    <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                        <thead>
                            <tr className='text-left font-bold'>
                                <th className='px-6 pt-5 pb-4'>Username</th>
                                <th className='px-6 pt-5 pb-4'>Email</th>
                                <th className="px-6 pb-4 pt-5">Address</th>
                                <th className="px-6 pb-4 pt-5">Phone</th>
                                <th className='px-6 pt-5 pb-4'>Role</th>
                                <th className="px-6 pb-4 pt-5">Active</th>


                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {currentdata.map((user) => user.username.toLowerCase().includes(searchString.toLowerCase()) && (
                                <tr key={user._id}>
                                    <td className='px-6 py-4'>{user.username}</td>
                                    <td className='px-6 py-4'>{user.email}</td>
                                    <td className='px-6 py-4'>{valuesContext(user.address)}</td>
                                    <td className='px-6 py-4'>{valuesContext(user.phone)}</td>
                                    <td className='px-6 py-4'>{showRoleName(user.roleId)}</td>
                                    <td className="px-6 py-4">
                                        {showActive(user.isActive)}  </td>
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
                                                Update User
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
                                                <label className="block text-gray-700 font-bold mb-2">Name:</label>
                                                <input type="text" name="username" value={updatedUserData.username} onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                                <input type="text" name="email" value={updatedUserData.email} onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2">Role:</label>
                                                <input type="text" name="role" value={updatedUserData.roleId} onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
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
                                                    onClick={(event) => handleUpdate(event)}                                        >
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
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
