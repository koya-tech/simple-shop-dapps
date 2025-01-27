import React from 'react';
import menu from './menuList';

const Header = () => {
  return (
    <div className="w-full mx-auto p-4 lg:p-6 bg-white">
      <div className="flex justify-between items-center">
        <button className="p-2 lg:hidden">
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
          </div>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-400 rounded-full"></div>
          <span className="text-lg lg:text-xl font-semibold text-black">ChainShop</span>
        </div>
        
        <div className='flex items-center gap-3'>
          {menu.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-gray-800 text-sm lg:text-base font-semibold hover:text-emerald-400"
            >
              {item.name}
            </a>
          ))}
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;