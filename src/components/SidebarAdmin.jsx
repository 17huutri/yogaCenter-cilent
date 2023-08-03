import React, { useState } from "react";
import {

  FaBars,
  FaUserAlt,

  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaListUl,
  FaSignOutAlt,
  FaUserEdit,
  FaShoppingCart,
  FaMarker,
  FaBookOpen,
  FaBookReader,
  FaHospitalUser,
  FaHome, FaElementor
} from "react-icons/fa";

import { AiFillSchedule } from "react-icons/ai";


import { FaPeopleGroup, FaPeopleLine } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import "../styles/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(true);
  const [showDropdown2, setShowDropdown2] = useState(true);
  const [showBookingDropdown, setShowBookingDropdown] = useState(false);
  const roleId = localStorage.getItem("roleId");
  const isAdmin = roleId === "4";
  const isStaff = roleId === "3";
  const isMentor = roleId === "2";
  const isUser = roleId === "1";

  const menuItemManagement = [
    {
      path: "/showUser",
      name: "User",
      icon: <FaPeopleGroup />,
      visible: !isMentor && !isStaff && !isUser,
    },
    {
      path: "/showAdmins",
      name: "Admin",
      icon: <FaUserAlt />,
      visible: !isMentor && !isStaff && !isUser,
    },
    {
      path: "/showStaffs",
      name: "Staff",
      icon: <FaHospitalUser />,
      visible: isAdmin,
    },
    {
      path: "/showMentors",
      name: "Mentor",
      icon: <FaElementor />,
      visible: isAdmin || isStaff,
    },
    {
      path: "/showCustomers",
      name: "Customer",
      icon: <FaPeopleLine />,
      visible: !isMentor && !isUser,
    },


    // {
    //   path: "/profile",
    //   name: "Profile",
    //   icon: <FaUserEdit />,
    //   visible: isUser
    // },

  ];
  const menuItemContents = [

    {
      path: "/Booking",
      name: "Booking",
      icon: <FaShoppingCart />,
      visible: isAdmin || isStaff,
    },
    {
      path: "/blog",
      name: "Blogs",
      icon: <FaMarker />,
      visible: isAdmin || isStaff,
    },
    {
      path: "/Course",
      name: "Course",
      icon: <FaBookOpen />,
      visible: isAdmin || isStaff,
    },
    {
      path: "/grade",
      name: "Classes",
      icon: <FaBookReader />,
      visible: isAdmin || isStaff,
    },
    {
      path: "/scheduleMentor",
      name: "My Schedule",
      icon: <AiFillSchedule />,
      visible: isMentor
    },
    {
      path: "/scheduleStudent",
      name: "My Schedule",
      icon: <AiFillSchedule />,
      visible: isUser
    },
    // {
    //   path: "/bookingForCustomer",
    //   name: "My Booking",
    //   icon: <AiFillSchedule />,
    //   visible: isUser 
    // },
    {
      path: "/showClassByMentor",
      name: "My Class",
      icon: <AiFillSchedule />,
      visible: isMentor
    },
  ];
  // const menuItemBooking = [

  //   {
  //   path: "/acceptedBooking",
  //   name: "Accepted",
  //   icon: <FaShoppingCart />,
  //   visible: isAdmin || isStaff,
  // },
  // {
  //   path: "/rejectedBooking",
  //   name: "Rejected",
  //   icon: <FaShoppingCart />,
  //   visible: isAdmin || isStaff,
  // },
  // {
  //   path: "/waitingBooking",
  //   name: "Waiting",
  //   icon: <FaShoppingCart />,
  //   visible: isAdmin || isStaff,
  // },]
  // ;
  function userLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("fullName");
    localStorage.removeItem("__paypal_storage__");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    navigate("/");
  }

  return (
    <div className=" main">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Good Life
          </h1>
          {/* <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                    <FaBars onClick={toggle} />
                  </div> */}
        </div>
        {!isMentor &&
          <button onClick={() => setShowDropdown(!showDropdown)}>

            <div className="centered flex" >
              <VscAccount className="barsdp" /> Management
            </div>
          </button>
        }
        {showDropdown &&
          menuItemManagement.map((item, index) => {
            if (item.visible) {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className="link"
                  activeclassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
              );
            }
          })}

        {!isUser &&
          <button onClick={() => setShowDropdown2(!showDropdown2)}>
            <div className="centered flex">
              <FaListUl className="barsdp" /> Tasks
            </div>
          </button>}

        <div className="">
          {showDropdown2 &&
            menuItemContents.map((item, index) => {
              if (item.visible) {
                return (
                  <NavLink
                    to={item.path}
                    key={index}
                    className="link"
                    activeclassName="active"
                  >
                    <div className="icon">{item.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text"
                    >
                      {item.name}
                    </div>
                  </NavLink>

                );

              }
            })}

        </div>

        <div className="profile-logout-container">
          <div className="profile" >
            <NavLink to="/" >
              <FaHome /><span></span>
            </NavLink>


          </div>
          {(
            <div className="profile">
              <NavLink to="/profile" className="user-info">
                <FaUserEdit />
                <span></span>
              </NavLink>
            </div>
          )

          }

          <div className="logout">
            <button onClick={userLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
