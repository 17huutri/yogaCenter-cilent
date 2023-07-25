import { useParams } from 'react-router-dom'
import { getAllGrades } from "../helper/gradeHelper";
import { getAllCourses } from '../helper/courseHelper';
import { getMentors } from '../helper/helper';
import { createBooking } from '../helper/bookingHelper';
import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/fetch.hook';
import { getFile } from '../helper/upload';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import toast, { Toaster } from 'react-hot-toast';
export default function Detail() {
  const { id } = useParams();
  const [grades, setGrades] = useState([]);
  const [grade, setGrade] = useState([]);
  const [mentors, setMentor] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newData, setNewData] = useState([]);
  const [{ apiData }] = useFetch();
  // const userId = apiData?._id
  const fetchData = async () => {
    let query = {'active' : 1,'username' : ''};
    const grades = await getAllGrades();
    const courses = await getAllCourses();
    const mentors = await getMentors(query)
    // const userId = apiData?._id;
    setMentor(mentors.data);
    setGrades(grades.data)
    setCourses(courses.data)

  }

  const handleBooking = async (event) => {
    event.preventDefault()
    try {

      let booking = { 'user': apiData?._id, 'grade': id }
      // const response = await createBooking(booking);
      let create = createBooking(booking);

      toast.promise(create, {
        loading: 'Booking...',
        success: <b>Booking Successfully...!</b>,
        error: <b>Something wrong !!!</b>
      });
    } catch (error) {
      console.error(error)
    }
  }
  const showImg = (id) => {
    return getFile(id);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (grades.length > 0) {
      const foundGrade = grades.find((item) => item._id === id);
      setGrade(foundGrade);
    }
  }, [grades, id]);
  return (
    <div className='overflow-hidden'>
      <Header />
      <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-28 lg:max-w-7xl lg:px-8">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h2 className="text-5xl font-serif text-center">{courses.map((course) => {
          if (course._id == grade.course)
            return course.courseName;
        })}</h2>
        <div className="grid grid-cols-12 mt-8">
          <div className='bg-gray-100 col-span-7'>
            <div className='mt-8 ml-8 mr-5'>
              <h3 className="text-3xl text-center">{grade.gradeName}</h3>
              <p className="text-xl mt-4 font-light">{grade.description}</p>
              <p className="mt-4 font-serif">Instructor: {mentors.map((mentor) => {
                if (mentor._id == grade.instructor)
                  return mentor.username;
              })}</p>
              <p className="mt-4 font-serif text-xl">Couse: <b>{courses.map((course) => {
                if (course._id == grade.course)
                  return course.courseName;
              })}</b></p>
              <p className="mt-4 font-serif text-xl">Price: <b>${courses.map((course) => {
                if (course._id == grade.course)
                  return course.price;
              })}</b></p>
              <button className="mt-8 font-serif bg-green-400 hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded-3xl w-36 h-12" onClick={(event) => handleBooking(event)}>Book Now</button>
            </div>

          </div>
          <div className='col-span-5'>
            <img className="w-auto h-96" src={showImg(grade._image)} />
          </div>
        </div>
        <div className='grid grid-cols-2 mt-20 bg-gray-100'>
          <img className='w-64 h-64 rounded-full' src='/assets/yogaSlogan.png' />
          <p className='text-lg font-serif mt-14 mr-14'>Yoga is the art of uniting the body, mind, and spirit to discover inner peace, embrace self-awareness, and unlock the limitless potential within.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}