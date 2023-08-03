import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getAllGrades, getAllGradesForSchedule, getGradeById } from '../helper/gradeHelper';
import { getAllCourses, getCourseById } from '../helper/courseHelper';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { getMentors } from '../helper/helper';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import '../styles/Calendar.css';

const Calendar = () => {
  const calendarRef = React.createRef();
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  const [day, setDay] = useState([])
  const [evenDay, setEvenDay] = useState('Monday,Wednesday,Friday')
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([])
  function getTime(time) {
    var timeStr = time;
    var currentDate = new Date();

    // Extract the year, month, and day from the current date
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var day = currentDate.getDate();

    // Construct the date string in YYYY-MM-DD format
    var dateString = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

    // Concatenate the date string and time string
    var dateTimeString = dateString + ' ' + timeStr;

    // Create a new Date object using the combined date and time string
    var dateTimeObj = new Date(dateTimeString);
    return dateTimeObj;
  }
  function checkTime(time) {
    if (time === '07:00') return 1
    else if (time === '09:00') return 2
    else if (time === '13:00') return 3
    else if (time === '15:00') return 4
    else if (time === '17:00') return 5
  }
  function getMentorName(mentors, id) {
    for (let i = 0; i < mentors.length; i++) {
      // console.log(mentors[i].fullName)
      if (mentors[i]._id == id) return mentors[i].fullName;
    }
  }
  function getEvenSlot(start, end, grade, mentorName) {
    const events = [];
    let startDay = new Date(start);
    let endDay = new Date(end);

    // console.log(grade);
    for (let loop = startDay.getTime(); loop <= endDay.getTime(); loop += 24 * 60 * 60 * 1000) {
      const testDate = new Date(loop);
      // console.log(testDate);
      let time = getTime(grade.startTimeGrade + loop)
      if (testDate.getDay() === 1) {
        events.push({
          class: `Class : ${grade.gradeName}`,
          room: `Room : ${grade.room}`,
          mentor: `Mentor : ${mentorName}`,
          time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
          title: `${grade.startTimeGrade}`,
          start: testDate,

        });
      }
      if (testDate.getDay() === 3) {
        events.push({
          class: `Class : ${grade.gradeName}`,
          room: `Room : ${grade.room}`,
          mentor: `Mentor : ${mentorName}`,
          time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
          title: `${grade.startTimeGrade}`,
          start: testDate,

        });
      }
      if (testDate.getDay() === 5) {
        events.push({
          class: `Class : ${grade.gradeName}`,
          room: `Room : ${grade.room}`,
          mentor: `Mentor : ${mentorName}`,
          time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
          title: `${grade.startTimeGrade}`,
          start: testDate,

        });
      }
    }
    // console.log(events)
    return events
  }
  function getOddSlot(start, end, grade, mentorName) {
    const events = [];
    let startDay = new Date(start);
    let endDay = new Date(end);
    let time = getTime(grade.startTimeGrade)
    for (let loop = startDay.getTime(); loop <= endDay.getTime(); loop += 24 * 60 * 60 * 1000) {
      const testDate = new Date(loop);
      if (testDate.getDay() === 2) {
        events.push({
          class: `Class : ${grade.gradeName}`,
          room: `Room : ${grade.room}`,
          mentor: `Mentor : ${mentorName}`,
          time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
          title: `${grade.startTimeGrade}`,
          start: testDate,

        });
      }
      if (testDate.getDay() === 4) {
        events.push({
          class: `Class : ${grade.gradeName}`,
          room: `Room : ${grade.room}`,
          mentor: `Mentor : ${mentorName}`,
          time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
          title: `${grade.startTimeGrade}`,
          start: testDate,

        });
      }
      if (testDate.getDay() === 6) {
        events.push({
          class: `Class : ${grade.gradeName}`,
          room: `Room : ${grade.room}`,
          mentor: `Mentor : ${mentorName}`,
          time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
          title: `${grade.startTimeGrade}`,
          start: testDate,

        });
      }
    }
    // console.log(events)
    return events
  }
  function getSchedule(eventSource) {
    // console.log(eventSource);
    calendarRef.current.getApi().setOption('events', eventSource);
    // calendarRef.current.getApi().setOption('slotDuration', '02:00'); // Set slot duration to 2 hours
  }
  const data = [
    // {
    //     _id: '64bb9ca59cd2a6f3f007f5d4' // user.grade.split 
    // },
    {
      _id: '64bb9b469cd2a6f3f007f5c2'
    },
    {
      _id: '64bb95879cd2a6f3f007f58a'
    },




  ]
  const EventItem = ({ info }) => {
    const { event } = info;
    // console.log(event)
    return (
      <div>
        <div className="event-item">
          <p className="event-class">{event.extendedProps.class}</p>
          <p >{event.extendedProps.mentor}</p>
          <p >{event.extendedProps.time}</p>
        </div>
      </div>
    );
  };
  const [events, setEvents] = useState([])
  const [allClass, setAllClass] = useState([]);


  const fetchDataForAllEvents = async () => {

    let allClass = await getAllGradesForSchedule();

    const eventSources = [];

    try {
      for (const grade of allClass.data) {

        // const grades = await getGradeById(e._id);
        // const courses = await getCourseById(grade.course);
        // let mentorName = getMentorName(mentors.data, grade.instructor)
        let eventSource = [];
        if (calendarRef.current) {
          if (grade.weekDay === evenDay) {
            eventSource = eventSource.concat(getEvenSlot(grade.course.startTime, grade.course.endTime, grade, grade.instructor.fullName));
          } else {
            eventSource = eventSource.concat(getOddSlot(grade.course.startTime, grade.course.endTime, grade, grade.instructor.fullName));
          }

          eventSources.push(...eventSource);
          eventSources.sort();
        }
      }
      setEvents(eventSources);
      getSchedule(eventSources);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    fetchDataForAllEvents().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <div className='mt-40' >
      <div className="px-8">
        <Header />
      </div>
      <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
          headerToolbar={{
            left: 'next today',
            center: 'title',
            right: 'dayGridWeek'
          }}
          eventContent={(info) => <EventItem info={info} />}
          editable={true}

        />
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;