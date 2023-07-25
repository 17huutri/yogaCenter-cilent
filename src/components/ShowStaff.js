
import React, { useState, useEffect } from 'react';
import { getStaffs, deleteUser, updateUser_1, disableUser, ableUser } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';
import Select from 'react-select'
import { DataRole } from '../helper/dataRole.js'

export default function ShowStaffs() {
    const [data, setData] = useState([]);
    const [updatedUserData, setUpdatedUserData] = useState({});

    const [showModal, setShowModal] = useState(false);

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
        let query = { 'username': searchName || '', 'active': active || 0 }
        setCurrentPage(1);
        console.log(query);
        const response = await getStaffs(query);
        setData(response.data);
    };
    let optionsRole = DataRole.map(function (role) {
        return { value: role.roleId, label: role.roleName };
    })
    
    const handleSelectRole = (event, meta) => {
        console.log(meta.name);
        console.log(event.value);
        setUpdatedUserData({ ...updatedUserData, [meta.name]: event.value });
    }
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
    const [filter, setFilter] = useState('');
    useEffect(() => {
        if (roleId < 2) {
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
            dataPromise.then(function () { navigate('/showStaffs') }).catch(error => {
                console.error(error);
            });
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
            dataPromise.then(function () { navigate('/showStaffs') }).catch(error => {
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
    function showActive(activeId) {
        if (activeId == 0) return 'UNACTIVED'
        else if (activeId == 1) return 'ACTIVED'

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
            dataPromise.then(function () { navigate('/showStaffs') }).catch(error => {
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
                    navigate("/showStaffs");
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
            let dataPromise = fetchData(filter);
            toast.promise(dataPromise, {
                loading: "Loading...",
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>,
            });
            dataPromise
                .then(function () {
                    navigate("/showStaffs");
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    // Tính toán các chỉ số cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(10);

    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentdata = data.slice(indexOfFirstUser, indexOfLastUser);
    function valuesContext(value) {
        if (value == null || value == '') return 'Not yet'
        else return value;

    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [searchString, setSearchString] = useState('');
    const handleSelectFilter = async (event, meta) => {

        setActive(event.value);
        fetchData(searchName, event.value);

    }
    async function handleSearch(event, meta) {
        setSearchName(event.target.value);
        fetchData(event.target.value, active);
    }
    return (

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
            <table className='mb-8 w-full overflow-hidden whitespace-nowrap rounded-lg bg-white shadow-sm'>
                <thead>
                    <tr className='text-left font-bold'>
                        <th className='px-6 pt-5 pb-4'>Username</th>
                        <th className='px-6 pt-5 pb-4'>Email</th>
                        <th className="px-6 pb-4 pt-5">Address</th>
                        <th className="px-6 pb-4 pt-5">Phone</th>
                        <th className='px-6 pt-5 pb-4'>Role</th>
                        <th className='px-6 pt-5 pb-4'>Active</th>
                        <th className='px-6 pt-5 pb-4'>Actions</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {data.map((user) => user.username.toLowerCase().includes(searchString.toLowerCase()) && (
                        <tr key={user._id}>
                            <td className='px-6 py-4'>{user.username}</td>
                            <td className='px-6 py-4'>{user.email}</td>
                            <td className='px-6 py-4'>{valuesContext(user.address)}</td>
                            <td className='px-6 py-4'>{valuesContext(user.phone)}</td>
                            <td className='px-6 py-4'>{showRoleName(user.roleId)}</td>
                            <td className="px-6 py-4">
                                {showActive(user.isActive)}  </td>
                            <td className='px-6 py-4'>

                                <>
                                    <button
                                        className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>
                                    {user.isActive == 1 && (
                                        <button
                                            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                                            onClick={() => handleUnactive(user._id)}
                                        >
                                            Unactive
                                        </button>
                                    )}
                                    {user.isActive == 0 && (
                                        <button
                                            className="mr-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                            onClick={() => handleActive(user._id)}
                                        >
                                            Active
                                        </button>
                                    )}

                                </>

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
                                        <label className="block text-gray-700 font-bold mb-2">Role Name :</label>
                                        <Select options={optionsRole} name="roleId" onChange={(event, meta) => handleSelectRole(event, meta)} />
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
            <Pagination
                userPerPage={userPerPage}
                totalUser={data.length}
                currentdata={currentPage}
                paginate={paginate}
            />
        </div >



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
