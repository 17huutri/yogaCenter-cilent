import React from 'react';
import Logo from '../../assets/img/logo.png';
import { FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer>

      <div className='container mx-auto'>
        <div className='flex flex-col justify-between items-center lg:flex-row gap-y-5'>
          <a href='#'><img src={Logo} alt='' className='w-[370px] h-[300px]'></img></a>
          <p>&copy; 2023. All rights reserved. </p>
          <div className='flex gap-x-4 text-orange text-lg'>
            <div className='w-[80px] h-[80px] bg-white rounded-full flex justify-center items-center shadow-primary cursor-pointer hover:text-paragraph transition'>
              <FaInstagram /></div>
            <div className='w-[80px] h-[80px] bg-white rounded-full flex justify-center items-center shadow-primary cursor-pointer hover:text-paragraph transition'>

              <FaYoutube /></div>
            <div className='w-[80px] h-[80px] bg-white rounded-full flex justify-center items-center shadow-primary cursor-pointer hover:text-paragraph transition'>

              <FaGithub /></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
