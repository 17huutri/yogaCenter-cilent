import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, getMentors, getUser } from '../helper/helper.js';
import { getAllGrades, getGradesOfMentor } from '../helper/gradeHelper.js';
import toast, { Toaster } from 'react-hot-toast';
import Header from "./homepage/Header.js";
import Footer from "./homepage/Footer.js";
import "../styles/scheduleForMentor.css";
export default function Schedulementor() {


  const [grades, setGrade] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [day, setDay] = useState('');
  const [evenDay, setEvenDay] = useState('Monday,Wednesday,Friday');
  // const [oddDay, setOddDay] = useState('Tuesday');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  //   const userId = localStorage.getItem('id')
  let userId = localStorage.getItem('id');
  let roleId = localStorage.getItem('roleId');
  // let username = localStorage.getItem('username');
  let token = localStorage.getItem('token');
  const fetchData = async () => {


    const grades = await getGradesOfMentor(userId);
    //   const mentors = await getMentors();
    setGrade(grades.data);
    //   setMentors(mentors.data);
    //   setDay(grades.data.weekDay)
    // setTime(grades.data.startTimeGrade)
    //   console.log(day);
    //   console.log(time);
    //   console.log(mentors.data);
    console.log(grades.data);

  };
  //   function showMentor(grades, mentors) {
  //     for (let i = 0; i < mentors.length; i++) {
  //       // console.log(mentors[i]);
  //       if (mentors[i]._id == grades.instructor) return mentors[i].fullName;
  //     }
  //   }

  function checkDay(day) {
    console.log(day)
    if (day === evenDay)
      return 2;
    else return 1;
  }
  // function isOddDay(day) {
  //   if (day.includes(oddDay))
  //     return true;
  // }
  function checkTime(time) {
    if (time === '07:00') return 1
    else if (time === '09:00') return 2
    else if (time === '13:00') return 3
    else if (time === '15:00') return 4
    else if (time === '17:00') return 5
    else return false;
  }
  useEffect(() => {
    if (roleId != 2) {
      navigate('*');
    } else if (token == null) {
      navigate('*');
    } else
      fetchData().then().catch((error) => { console.log(error) });
  }, []);
  return (

    <div className="shedule " style={{ marginLeft: "100px" }} >
      {/* <p> Your name: {grade.user}</p> */}
      <h1 class="h1 text-center">SCHEDULE</h1>
      <table class="tablementor table-dark table-striped table-borderless table-hover caption-top ">

        <thead>

          <tr>

            <th scope="col" class="text-center fs-4 fw-light txtcolor">Time</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Monday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Tuesday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Wednesday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Thursday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Friday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Saturday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Sunday</th>

          </tr>
        </thead>
        {grades.map((grade, index) => (

          <tbody>
            <tr>
              <th scope="row" class="hi">{(<p>{grade.startTimeGrade} - {grade.endTimeGrade}</p>)}</th>
              <td class="text-center">
                {(<span class="bb badge bg-danger text-wrap">{(checkDay(grade.weekDay) % 2 == 0) && checkTime(grade.startTimeGrade) && (<p>Class : {grade.gradeName}<br></br>Room : {grade.room}</p>
                )}

                </span>)}
              </td>
              <td class="text-center">
                {(<span class="bb badge badgecolor text-wrap">{(checkDay(grade.weekDay) % 2 == 1) && checkTime(grade.startTimeGrade) && (<p>Class : {grade.gradeName}<br></br>Room : {grade.room}</p>)}
                </span>)}
              </td>
              <td class="text-center">
                {(<span class="bb badgehover badge bg-primary text-wrap">{(checkDay(grade.weekDay) % 2 == 0) && checkTime(grade.startTimeGrade) && (<p>Class : {grade.gradeName}<br></br>Room : {grade.room}</p>)}
                </span>)}
              </td>
              <td class="text-center">
                {(<span class="bb badge badgecolor text-wrap">{(checkDay(grade.weekDay) % 2 == 1) && checkTime(grade.startTimeGrade) && (<p>Class : {grade.gradeName}<br></br>Room : {grade.room}</p>)}
                </span>)}
              </td>
              <td class="text-center">
                {(<span class="bb badge bg-danger text-wrap">{(checkDay(grade.weekDay) % 2 == 0) && checkTime(grade.startTimeGrade) && (<p>Class : {grade.gradeName}<br></br>Room : {grade.room}</p>)}
                </span>)}
              </td>
              <td class="text-center">
                {(<span class="bb badge badgecolor text-wrap">{(checkDay(grade.weekDay) % 2 == 1) && checkTime(grade.startTimeGrade) && (<p>Class : {grade.gradeName}<br></br>Room : {grade.room}</p>)}
                </span>)}
              </td>
              <td class="text-center"></td>


            </tr>


          </tbody>
        ))}
      </table>


    </div>
  )

}