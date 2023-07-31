import React from 'react';
import Logo from '../../assets/img/logo.png';
import { FaYoutube, FaInstagram, FaGithub, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-300" style={{ marginTop: 50 }}>
      <div className='container mx-auto '>
        <div className='flex flex-col justify-between items-center lg:flex-row gap-y-5'>
          <a href='#'><img src={Logo} alt='' className='w-[370px] h-[300px]' /></a>
          <div className='text-center lg:text-left'>
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <p>1900 668 668</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <p>151-157 Le Van Viet, Hiep Phu Ward, District 9, HCMC</p>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <p>
                Monday - Friday: 6:00 to 23:00</p>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <p>Saturday - Sunday: 8:00 to 22:00</p>
            </div>
          </div>
          <div className='flex gap-x-4 text-orange text-lg'>
            <div className='w-[80px] h-[80px] bg-white rounded-full flex justify-center items-center shadow-primary cursor-pointer hover:text-paragraph transition'>
              <FaInstagram />
            </div>
            <div className='w-[80px] h-[80px] bg-white rounded-full flex justify-center items-center shadow-primary cursor-pointer hover:text-paragraph transition'>
              <FaYoutube />
            </div>
            <div className='w-[80px] h-[80px] bg-white rounded-full flex justify-center items-center shadow-primary cursor-pointer hover:text-paragraph transition'>
              <FaGithub />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p>&copy; Copyright 2023 @ GoodLife. All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
