import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './asset/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar({ isLoggedIn, handleLogout, isMyServicePage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();  // useNavigate for navigation

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAboutClick = () => {
    if (isMyServicePage) {
      navigate('/');  // Redirect to home page
    } else {
      const serviceSection = document.getElementById("services-section");
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className='bg-gray-100 shadow-md fixed top-0 left-0 right-0 z-50'>
      <div className='flex justify-between items-center py-3 px-6 md:px-12 lg:px-24'>
        <div id='nav_logo' className='w-28 md:w-36'>
          <img src={logo} alt="Logo" className='cursor-pointer'/>
        </div>

        <div className='hidden md:flex md:w-96 md:justify-around text-lg'>
          <p className='hover:font-medium'><Link to="/">Home</Link></p>
          <p className='hover:font-medium cursor-pointer' onClick={handleAboutClick}>
            About Us
          </p>
          {isLoggedIn && (
            <>
              <p className='hover:font-medium'>
                <Link to="/myservices">My Service</Link>
              </p>
              <p className='hover:font-medium cursor-pointer' onClick={handleLogout}>Logout</p>
            </>
          )}
        </div>

        <div className='hidden md:flex gap-5'>
          {!isLoggedIn ? (
            <>
              <button className='bg-[#F5F7FA] text-[#AB65F6] font-medium border rounded-md py-2 px-4 text-sm cursor-pointer'>
                <Link to="/login">Login</Link>
              </button>
              <button className='bg-[#AB65F6] text-[#F5F7FA] font-medium border rounded-md py-2 px-4 text-sm cursor-pointer'>
                <Link to="/signup">Sign Up</Link>
              </button>
            </>
          ) : (
            <div>
              <FontAwesomeIcon icon={faUser} className='cursor-pointer text-xl' />
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className='md:hidden flex items-center'>
          <button onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className='text-xl transition-all duration-500 ease-in-out' />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 ease-in-out md:hidden bg-gray-100`}>
        <div className='flex flex-col items-center py-4'>
          <p className='py-2 text-lg hover:font-medium'>
            <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          </p>
          <p
            className='py-2 text-lg hover:font-medium cursor-pointer'
            onClick={() => {
              handleAboutClick();
              toggleMobileMenu(); // Close menu on selection
            }}
          >
            About Us
          </p>
          {isLoggedIn && !isMyServicePage && (
            <>
              <p className='py-2 text-lg hover:font-medium'>
                <Link to="/myservices" onClick={toggleMobileMenu}>My Service</Link>
              </p>
              <p className='py-2 text-lg hover:font-medium cursor-pointer' onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}>
                Logout
              </p>
            </>
          )}
          {!isLoggedIn && (
            <>
              <button className='w-3/4 bg-[#F5F7FA] text-[#AB65F6] font-medium border rounded-md py-2 px-4 text-sm cursor-pointer my-2' onClick={toggleMobileMenu}>
                <Link to="/login">Login</Link>
              </button>
              <button className='w-3/4 bg-[#AB65F6] text-[#F5F7FA] font-medium border rounded-md py-2 px-4 text-sm cursor-pointer my-2' onClick={toggleMobileMenu}>
                <Link to="/signup">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

