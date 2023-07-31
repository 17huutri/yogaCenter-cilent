import { getMentors } from "../../helper/helper";
import { getAllGrades, detailGrade } from "../../helper/gradeHelper";
import { getAllCourses } from '../../helper/courseHelper';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { getFile } from '../../helper/upload';
import '../../styles/2.css'
export default function Grade() {
    const [grades, setGrades] = useState([]);
    const [mentors, setMentor] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchData = async () => {
        let query = { 'active': 1, 'fullName': '' };
        const mentors = await getMentors(query)
        const grades = await getAllGrades();
        const courses = await getAllCourses();

        setMentor(mentors.data);
        setGrades(grades.data);
        setCourses(courses.data);

        // console.log(grades)
    }
    const showImg = (id) => {
        return getFile(id);
    };
    useEffect(() => {
        fetchData().catch((error) => console.log(error));
    }, []);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchGrade();
        }
    };


    const searchGrade = async () => {
        try {
            const response = await detailGrade(searchTerm);
            setSearchResults(response);
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <div>
            <div className="grid grid-cols-4">
                <div className="bg-gray-200"><img className="w-auto h-auto" src="./assets/poster1.png" alt="yoga" /></div>
                <div className="bg-gray-200"><img className="w-auto h-auto" src="./assets/poster2.png" alt="yoga" /></div>
                <div className="bg-gray-200"><img className="w-auto h-auto" src="./assets/poster3.png" alt="yoga" /></div>
                <div className="bg-gray-200"><img className="w-auto h-auto" src="./assets/poster4.png" alt="yoga" /></div>
            </div>
            <div class="ml-20 max-w-15xl ">
                <div className="space-y-2 mt-15 mb-18">
                    <h2 className="text-center text-5xl font-serif">Classes</h2>
                    <nav class="text-xl flex justify-center">
                        <ol class="list-none p-10 inline-flex">
                            <li class="flex items-center ms-4 " >
                                <a href="" class="text-gray-500">Good Life</a>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H4a1 1 0 010-2h6.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </li>
                            <li class="flex items-center ms-1">
                                <a href="#" className="text-gray-500">Classes</a>

                            </li>

                        </ol>
                    </nav>
                </div>
                <div className="mt-6 my-10">
                    <input
                        type="text"
                        placeholder="Search by grade name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress} // Add the onKeyPress event here
                        className="border border-gray-300 px-4 py-2 rounded-md w-64"
                    />
                    <button
                        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={searchGrade}
                    >
                        Search
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3" style={{ display: 'flex', flexWrap: 'wrap' }}>                    {(searchResults.length > 0 ? searchResults : grades).map((grade) => (
                    <div className="flex-row bg-gray-100 box-content h-auto w-auto p-4"
                        key={grade._id}>
                        <div className="aspect-h-1 aspect-w-1 w-50 overflow-hidden rounded-sm bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <Link to={`/detail/${grade._id}`}>
                                <img
                                    style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                                    src={showImg(grade._image)}
                                    alt=""
                                /></Link>
                        </div>
                        <div className="mt-3">
                            <h5 className="text-center text-3xl font-serif">{grade.gradeName}</h5>
                            <p className="mt-4 font-serif">On : {grade.weekDay}</p>
                            <p className="mt-4 font-serif">Time: {courses.map((course) => {
                                if (grade.course === course._id) {
                                    return grade.startTimeGrade + " to " + grade.endTimeGrade;
                                }
                            })}</p>

                            <p className="mt-4 font-serif">Capacity: 20 (left {20 - grade.nOfStudent})</p>
                            <p className="mt-2 font-serif">Instructor: {mentors.map((mentor) => {
                                if (grade.instructor === mentor._id) {
                                    return mentor.fullName;
                                }
                            })}</p>
                            <p className="mt-4 font-serif text-xl">Course: <b>{courses.map((course) => {
                                if (course._id == grade.course)
                                    return course.courseName;
                            })}</b></p>
                            <p className="mt-4 text-xl font-serif">Price:<b> ${courses.map((course) => {
                                if (grade.course === course._id) {
                                    return course.price;
                                }
                            })}</b></p>
                            <Link
                                to={`/detail/${grade._id}`}
                                style={{
                                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end"
                                }}
                            >
                                <button className="font-serif bg-red-300 hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded-xl ">
                                    Detail
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
                </div>
                <div className='grid grid-cols-2 mt-20 bg-gray-100'>
                    <img className='w-64 h-64 rounded-full' src='./assets/yogaSlogan.png' />
                    <p className='text-lg font-serif mt-14 mr-14'>Yoga is the art of uniting the body, mind, and spirit to discover inner peace, embrace self-awareness, and unlock the limitless potential within.</p>
                </div>

            </div>

        </div>

    )
}