import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Mini Project</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
          <Link to="/users" className="text-gray-300 hover:text-white">Users Data</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;