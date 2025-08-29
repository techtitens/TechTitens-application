// Create a logo compoennt that links to the home page in react getting the logo from the public folder. if the logo is not found, display a placeholder icon.
import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo.webp";
import { Shield } from "lucide-react";

export default function Logo() {
  return (
    <Link to='/'>
      <div className='flex items-center space-x-2'>
        {logo ? (
          <img
            src={logo}
            alt='Site Logo'
            className='h-16 w-72 object-contain'
          />
        ) : (
          <span className='text-xl font-bold text-white'>
            <Shield className='inline-block h-6 w-6 mr-1 text-blue-500' />
            AiBleak
          </span>
        )}
      </div>
    </Link>
  );
}
