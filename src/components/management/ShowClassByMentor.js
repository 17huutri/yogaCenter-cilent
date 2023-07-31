import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/fetch.hook';
import { getMentors } from '../../helper/helper';
import { getAllCourses } from '../../helper/courseHelper';
import { getAllGrades } from '../../helper/gradeHelper'
import { Link, useNavigate } from 'react-router-dom';




export default function ShowClassByMentor() {
    const [mentors, setMentor] = useState([])
    // const [customers, setCustomers] = useState([])

    const [courses, setCourses] = useState([])
    const [grades, setGrades] = useState([])
    const [{ apiData }] = useFetch();
    const mentorId = apiData?._id;
    const fetchData = async () => {
        let query = {'fullName' : '','active' : 1}
        const courses = await getAllCourses();
        const mentors = await getMentors(query)
        const grades = await getAllGrades();
        setMentor(mentors.data);
        console.log(mentors);
        setCourses(courses.data);
        setGrades(grades.data);
    }


    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    let navigate = useNavigate()
    useEffect(() => {
        if (roleId > 2) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        } else {
            let dataPromise = fetchData();

            dataPromise.then(function () { navigate('/showClassByMentor') }).catch(error => {
                console.error(error);
            });
        }
    }, []);



    // Tính toán các chỉ số cho phân trang



    return (
        <div className='max-w-4x2' style={{ marginLeft: '15rem' }}>



            <div className='max-w-4x2 mx-auto'>
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>

                            <th className='px-6 pt-5 pb-4'>Mentor</th>
                            <th className='px-6 pt-5 pb-4'>Course</th>
                            <th className='px-6 pt-5 pb-4'>Class</th>
                            <th className='px-6 pt-5 pb-4'>Room</th>
                            <th className='px-6 pt-5 pb-4'>On</th>
                            <th className='px-6 pt-5 pb-4'>From</th>
                            <th className='px-6 pt-5 pb-4'>To</th>

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {grades.map((grade) => (

                            grade.instructor == mentorId ? (<tr key={grade._id}>


                                <td className='px-6 py-4'>{mentors.map((mentor) => {
                                    if (grade.instructor == mentor._id)
                                        return mentor.fullName

                                    // data cua? booking
                                })}</td>
                                <td className='px-6 py-4'>{courses.map((course) => {
                                    if (grade.course == course._id)
                                        return course.courseName


                                })}</td>
                                <td className='px-6 py-4'><Link to={`/showStudent/${grade._id}`}>{grade.gradeName}</Link></td>

                                <td className='px-6 py-4'>{grade.room}</td>
                                <td className='px-6 py-4'>{grade.weekDay}</td>
                                <td className='px-6 py-4'>{grade.startTimeGrade}</td>
                                <td className='px-6 py-4'>{grade.endTimeGrade}</td>

                            </tr>) : null

                        ))}
                    </tbody>
                </table>


            </div >

        </div>

    )
};
