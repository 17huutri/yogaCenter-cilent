import React from 'react';
import { useNavState } from './navState';
import { navigation } from '../../components/homepage/data';
import '../../styles/Nav.css';
import { NavLink } from 'react-router-dom'; // Import NavLink từ react-router-dom

const scrollToBottom = () => {
  window.scrollTo(0, 4950);
};

const Nav = () => {
  const { activeNavItem, setActiveItem } = useNavState();

  const handleNavItemClick = (index) => {
    setActiveItem(index);
    if (navigation[index].href === 'contact') {
      scrollToBottom();
    }
  };

  return (
    <nav className='nav ml-[390px]'>
      <ul className='flex gap-x-[42px]'>
        {navigation.map((item, index) => (
          <li key={index}>
            {item.href === 'contact' ? (
              <button
                className={`nav-item ${activeNavItem === index ? 'active' : ''}`}
                onClick={() => handleNavItemClick(index)}
              >
                {item.name}
              </button>
            ) : (
              <li key={index}>
                <NavLink
                  exact
                  to={item.href}
                  className={`nav-item ${activeNavItem === index ? 'active' : ''}`}
                >
                  {item.name}
                </NavLink>
              </li>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;