import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, getMentors, getUser } from '../helper/helper.js';
import { getAllGrades } from '../helper/gradeHelper.js';
import toast, { Toaster } from 'react-hot-toast';
import { getGradeByStudent } from "../helper/newone.js";
import "../styles/scheduleForStudent.css";
export default function Newschedule() {


  const [grades, setGrade] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [day, setDay] = useState('');
  const [evenDay, setEvenDay] = useState('Monday');
  const [oddDay, setOddDay] = useState('Tuesday');
  const [time, setTime] = useState('');
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  let userId = localStorage.getItem('id');
  let username = localStorage.getItem('username');
  let token = localStorage.getItem('token');
  let roleId = localStorage.getItem('roleId');
  const fetchData = async () => {
    if (roleId != 1) {
      navigate('*');
    } else if (token == null) {
      navigate('*');
    } else {
      let query_1 = { 'fullName': '', 'active': 1 };
      const mentors = await getMentors(query_1);
      const user = await getUser({ 'usename': username });
      const grades = await getGradeByStudent(userId);

      setUser(user.data)
      setGrade(grades.data);
      setMentors(mentors.data);
      setDay(grades.data.weekDay)
      setTime(grades.data.startTimeGrade)
      // console.log(day);
      // console.log(time);
      // console.log(mentors.data);
      console.log(user);
    }
  };
  function showMentor(grades, mentors) {
    for (let i = 0; i < mentors.length; i++) {
      // console.log(mentors[i]);
      if (mentors[i]._id == grades.instructor) return mentors[i].fullName;
    }
  }

  function isEvenDay(day) {
    if (day.includes(evenDay))
      return true;
  }
  function isOddDay(day) {
    if (day.includes(oddDay))
      return true;
  }
  function checkTime(time) {
    if (time === '07:00') return 1
    else if (time === '09:00') return 2
    else if (time === '13:00') return 3
    else if (time === '15:00') return 4
    else if (time === '17:00') return 5
  }
  useEffect(() => {
    fetchData().then().catch((error) => { console.log(error) });
  }, []);
  return (
    <div className="shedule " style={{ marginLeft: "20px" }} >

      {/* <p> Your name: {grade.user}</p> */}
      <h1 class="h1 text-center">SCHEDULE</h1>
      <br></br>
      <p class="text-center">Current class : {grades.gradeName}</p>
      <br></br>
      {/* <p>Ex class : {user.ex_grade}</p> */}
      <table class="tablecustomer table-dark table-striped table-borderless table-hover caption-top ">

        <thead>
          <tr>

            <th scope="col" class="text-center fs-4 fw-light txtcolor">Time</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">{evenDay}</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">{oddDay}</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Wednesday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Thursday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Friday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Saturday</th>
            <th scope="col" class="text-center fs-4 fw-light txtcolor">Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-center">7:00AM - 9:00AM</th>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 1 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}
                <br></br>Room : {grades.room}

              </span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 1 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            < td class="text-center">
              {isEvenDay(day) && checkTime(time) == 1 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 1 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 1 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 1 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center">9:00AM - 11:00AM</th>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 2 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 2 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            < td class="text-center">
              {isEvenDay(day) && checkTime(time) == 2 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 2 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 2 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 2 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center">13:00PM - 15:00PM</th>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 3 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 3 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            < td class="text-center">
              {isEvenDay(day) && checkTime(time) == 3 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 3 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 3 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 3 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center">15:00PM - 17:00PM</th>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 4 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 4 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            < td class="text-center">
              {isEvenDay(day) && checkTime(time) == 4 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 4 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 4 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 4 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center">17:00PM - 19:00PM</th>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 5 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 5 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            < td class="text-center">
              {isEvenDay(day) && checkTime(time) == 5 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 5 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isEvenDay(day) && checkTime(time) == 5 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center">
              {isOddDay(day) && checkTime(time) == 5 && (<span class="badge badgecolor text-wrap">Class : {grades.gradeName}
                <br></br>Mentor : {showMentor(grades, mentors)}<br></br>Room : {grades.room}</span>)}
            </td>
            <td class="text-center"></td>
          </tr>
        </tbody>
      </table>


    </div>
  )

}