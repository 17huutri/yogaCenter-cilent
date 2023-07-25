import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { navigation } from '../../components/homepage/data'
const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      {/* menu btn */}
      <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer text-4xl text-heading
      ml-[10px] lg:hidden'>
        <BiMenu />
        {/* menu items */}
        <ul className={`${isOpen ? 'max-h-60 p-8' : 'max-h-0 p-0'}flex flex-col absolute w-full bg-white top-24 left-0 shadow-primary space-y-6 overflow-hidden transition-all`}>
          {navigation.map((item, index) => {
            return <li><a href={item.href}>{item.name}</a></li>
          })}
        </ul>

      </div>
    </nav>
  )
};

export default NavMobile;
