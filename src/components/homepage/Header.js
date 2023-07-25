import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import NavMobile from '../homepage/NavMobile';
import Logo from '../../assets/img/logo.png';
import '../../styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [header, setHeader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [roleId, setRoleId] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', () => {
      window.scrollY > 36 ? setHeader(true) : setHeader(false);
    });

    const storedUsername = localStorage.getItem('username');
    const storedRoleId = localStorage.getItem('roleId');
    if (storedUsername && storedRoleId) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setRoleId(Number(storedRoleId));
    } else {
      setIsLoggedIn(false);
      setUsername('');
      setRoleId(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    setIsLoggedIn(false);
    setUsername('');
    setRoleId(null);
    navigate('/')
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header
      className={`${header ? 'top-0' : 'top-9'
        } fixed bg-white w-full max-w-[90vw] lg:max-w-[1170px] mx-auto rounded-md h-[90px] shadow-primary px-4 lg:px-8 z-20 transition-all duration-500 flex items-center justify-between`}
    >
      <div className='flex item-center'>
        <a href='/'>
          <img src={Logo} alt='' className='absolute top-[-70px] left-[-80px] w-[370px] h-[300px]' />
        </a>
        <div className='hidden lg:flex'>
          <Nav />
        </div>
      </div>
      <div className='flex items-center'>
        {isLoggedIn ? (
          <div className='flex'>
            <button
              className='btn-user btn-md bg-transparent text-heading font-medium text-sm lg:text-base hover:text-orange flex items-center'
              onClick={toggleDropdown}
            >
              Hi, {username}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 12a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {showDropdown && (
              <div className='absolute top-[42px] right-0 mt-2 bg-white rounded-md shadow-lg'>
                <ul className='py-2'>
                  {(
                    <li>
                      <button
                        className="block-user px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          if (roleId >= 3) {
                            window.location.href = '/showCustomers'
                          } else{
                            window.location.href = '/profile'
                          }
                            ;
                        }}
                      >
                        Management
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className='block-user px-4 py-2 text-gray-700 hover:bg-gray-100'
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>

                </ul>
              </div>
            )}

          </div>
        ) : (
          <div className='flex gap-x-4 lg:gap-x-9 bg-white'>
            <button
              className='btn-si text-heading font-medium text-sm lg:text-base hover:text-orange transition flex items-center justify-center'
              onClick={() => { window.location.href = '/login'; }}
            >
              Sign In
            </button>
            <button
              className='btn btn-md lg:px-[30px] bg-orange-100 border border-orange text-orange font-medium text-sm lg:text-base hover:bg-orange-200 hover:text-white transition'
              onClick={() => { window.location.href = '/register'; }}
            >
              Sign Up
            </button>
          </div>
        )}
        <NavMobile />
      </div>
    </header>
  );
};

export default Header;
