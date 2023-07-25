
import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Sidebar  from "./components/SidebarAdmin.jsx";

// components
import ConfirmAccount from "./components/ConfirmAccount"
import Login from "./components/Login"
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import UserRecovery from './components/UserRecovery';
import ShowUser from "./components/ShowUser";
import Grade from "./components/Grade";
import GradeBooking from './components/GradeBooking.js'
import DetailGrade from './components/DetailGrade.js';
// managerment
import ShowCustomer from './components/ShowCustomer.js';
import ShowMentor from './components/ShowMentor.js';
import ShowStaff from './components/ShowStaff.js';
import ShowAdmin from './components/ShowAdmin.js';
// function
import Booking from './components/Booking.js';
import Blog from './components/Blog.js';

import Course from './components/Course.js';
import { AuthorizeUser} from './middleware/auth';
import BlogNew from "./components/blog/BlogNew";
import { DetailBlog } from "./components/blog/DetailBlog";
import Homepage from "./components/Homepage";
import { Homeblog } from "./components/HomeBlog";
import BookingForCustomer from "./components/bookingForCustomer.js";
import ShowStudent from "./components/showStudent.js";
import ShowClassByMentor from "./components/management/ShowClassByMentor.js";
// import Header from "./components/homepage/Header.js";
// import Testing from "./components/Testing.js";
const router = createBrowserRouter([

    {
        path: '/',
        element: <Homepage></Homepage>
    },
    {
        path: '/showClassByMentor',
        element: <Sidebar><ShowClassByMentor></ShowClassByMentor></Sidebar>
    },
    {
        path: '/showStudent/:gradeId',
        element:<ShowStudent></ShowStudent>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
   
    {
        path: '/bookingForCustomer',
        element: <Sidebar><BookingForCustomer></BookingForCustomer></Sidebar>
    },
    {
        path: '/showCustomers',
        element:<Sidebar> <ShowCustomer></ShowCustomer></Sidebar>
    },
    {
        path: '/showMentors',
        element:<Sidebar> <ShowMentor></ShowMentor></Sidebar>
    },
    {
        path: '/showStaffs',
        element:<Sidebar> <ShowStaff></ShowStaff></Sidebar>
    },
    {
        path: '/showAdmins',
        element:<Sidebar> <ShowAdmin></ShowAdmin></Sidebar>
    },

    {
        path: '/showUser',
        element: <Sidebar><AuthorizeUser><ShowUser></ShowUser></AuthorizeUser></Sidebar>
    },

    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/confirmAccount',
        element: <ConfirmAccount></ConfirmAccount>
    },
    {
        path: '/profile',
        element: <Sidebar><AuthorizeUser><Profile /></AuthorizeUser></Sidebar>
    },
    {
        path: '/userRecovery',
        element: <UserRecovery></UserRecovery>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
    {
        path: '/booking',
        element:<Sidebar> <Booking></Booking></Sidebar>
    },
 
    {
        path: '/course',
        element:<Sidebar> <Course></Course></Sidebar>
    },
    {
        path: '/grade',
        element:<Sidebar> <Grade></Grade></Sidebar>
    },
    {
        path: '/blog',
        element:<Sidebar> <Blog></Blog></Sidebar>
    },
    {
        path: '/gradeBooking',
        element: <GradeBooking></GradeBooking>
    },
    {
        path: '/detail/:id',
        element: <DetailGrade></DetailGrade>
    },
    {
        path: '/blog',
        element: <Blog></Blog>
    },

    {
        path: '/blognew',
        element: <BlogNew></BlogNew>
    },

    {
        path: '/detailblog/:id',
        element: <DetailBlog></DetailBlog>
    },
    {
        path: '/homeblog',
        element: <Homeblog></Homeblog>
    }
])
export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>

    )
}