'use client'

import React, { useState } from 'react';
import menu from './menuList';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    };
  
  return (
    <div className="w-full mx-auto p-4 lg:p-6 bg-cs-white">
      <div className="flex justify-between items-center">
        <button className="p-2 lg:hidden" onClick={toggleMenu}>
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
          </div>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-cs-green rounded-full"></div>
          <span className="text-lg lg:text-xl font-semibold text-cs-black">ChainShop</span>
        </div>
        
        <div className='flex items-center gap-3'>
          <div className='hidden lg:flex gap-3'>
            {menu.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-gray-800 text-sm lg:text-base font-semibold hover:text-cs-green"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-200"></div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-cs-white">
          <div className="flex flex-col gap-2 items-center">
            {menu.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-gray-800 text-base font-semibold hover:text-cs-green"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;