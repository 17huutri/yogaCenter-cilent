


import React from 'react';
import { navigation } from '../../components/homepage/data';
import '../../styles/Nav.css';

const scrollToBottom = () => {
  window.scrollTo(0, 6130);
};

const Nav = () => {
  return (
    <nav className='nav ml-[390px]'>
      <ul className='flex gap-x-[42px]'>
        {navigation.map((item, index) => (
          <li key={index}>
            {item.href === 'contact' ? (
              <button className='nav-item' onClick={scrollToBottom}>
                {item.name}
              </button>
            ) : (
              <li key={index}>
                <a className='nav-item' href={item.href}>{item.name}
                </a>
              </li>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
