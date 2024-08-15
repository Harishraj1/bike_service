import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { Tilt } from 'react-tilt';
import GetService from './GetService';
import hero_img from './images/hero_img.png';
import hero_icon1 from './images/hero_icon1.png';
import hero_icon2 from './images/hero_icon2.png';
import hero_icon3 from './images/hero_icon3.png';
import vector from './images/Vector.png';
import review_img from './images/review_img.png';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

function Landing() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:2000/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    window.location.reload(); // Optional: Reload to reflect changes
  };

  const handleGetServiceClick = () => {
    if (isLoggedIn) {
      setShowForm(true);
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  const contentData = [
    {
      icon: hero_icon1,
      title: "Membership\nOrganisations",
      description: "From personalized services to early access to events, our membership offers you more."
    },
    {
      icon: hero_icon2,
      title: "National\nAssociations",
      description: "Join our national association to connect with professionals and shape our industry's future together."
    },
    {
      icon: hero_icon3,
      title: "Clubs And\nGroups",
      description: "Become a member of our group and enjoy exclusive events, resources, and a supportive community."
    }
  ];

  const reviewsData = [
    {
      name: "Jess Santiago",
      feedback: "Easy booking process and excellent service! My bike is in top condition, and I couldn't be happier with the outcome."
    },
    {
      name: "Cali Huffman",
      feedback: "Smooth and efficient service from start to finish. My bike rides like new, and the booking was a breeze."
    },
    {
      name: "Denny Rawlings",
      feedback: "Fantastic experience! Booking was simple, and my bike was returned in perfect working order. Highly recommend!"
    },
    {
      name: "Denny Rawlings",
      feedback: "I booked my service online, and it was worth it. My bike now runs like a dream—great job!"
    },
    {
      name: "Denny Rawlings",
      feedback: "The entire process was so convenient, and my bike is performing flawlessly after the service. Highly satisfied!"
    },
    {
      name: "Denny Rawlings",
      feedback: "Hassle-free booking and outstanding service! My bike feels better than ever—definitely coming back."
    }
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}></Navbar>

      {/* Hero Section */}
      <div id='hero_section' className='flex flex-col md:flex-row justify-around mt-28 mb-32 px-4'>
        <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <h1 className='text-3xl md:text-5xl font-semibold mb-4 md:mb-8'>
            "Perfect service for every<br />bike journey"
          </h1>
          <p className='text-sm md:text-lg text-[#7D7987] mb-4 md:mb-8' style={{ width: "100%", maxWidth: "500px", wordSpacing: "5px" }}>
            Serve provides expert maintenance, repair, and customization services to keep your motorcycle in top condition. Trust our skilled technicians for optimal performance and reliable care. Ride confidently with Serve.
          </p>
          <button className='bg-[#AB65F6] text-white p-2 md:p-3 px-6 md:px-8 rounded-full font-xl cursor-pointer text-sm md:text-base' onClick={handleGetServiceClick}>
            Get a Service
          </button>
        </motion.div>

        {/* Hide the image on mobile */}
        <motion.div
          className='hidden md:block'
          style={{ width: "35%" }}
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <img src={hero_img} alt='hero_img' />
        </motion.div>
      </div>


      {/* Content */}
      <div className='flex flex-col md:flex-row justify-around items-center'>
        {contentData.map((content, index) => (
          <Tilt key={index} className='Tilt bg-slate-100 text-center w-4/5 md:w-72 p-3 md:p-4 border rounded-md cursor-pointer mb-6 md:mb-0' options={{ max: 25 }}>
            <div className='Tilt-inner'>
              <img src={content.icon} alt='icon' className='w-16 md:w-20 mx-auto mb-3 md:mb-4' />
              <h1 className='text-lg md:text-xl font-bold whitespace-pre-wrap'>{content.title}</h1>
              <p className='text-xs md:text-sm text-[#7D7987] my-2 md:my-3'>{content.description}</p>
            </div>
          </Tilt>
        ))}
      </div>


      {/* Service Section */}
      <div id="services-section" className='my-12 mt-20 text-center'>
        <h1 className='text-2xl md:text-3xl font-semibold mb-8 md:mb-12'>Our services</h1>
        <p className='text-sm md:text-base text-[#7D7987] mx-4 md:mx-0' style={{ wordSpacing: "4px" }}>
          "Welcome to our <span className='font-extrabold'>Serve!</span> We offer a variety of services to keep your bike in <span className='font-extrabold'>top condition</span>. Below is a list of all the
          <br className='hidden md:block' />services we provide, along with detailed descriptions to help you choose the <span className='font-extrabold'>best options for your needs</span>."
        </p>
      </div>

      {/* Services */}
      <div className='flex flex-col md:flex-wrap md:flex-row my-6 justify-around items-center px-6 md:px-20 gap-4'>
        {services.map((service) => (
          <div
            key={service._id}
            className='border-[#7D7987] p-4 py-6 md:py-8 mb-4 border rounded-2xl cursor-pointer hover:transform hover:scale-105 transition-transform duration-300 ease-in-out w-4/5 md:w-5/12 lg:w-1/4'
          >
            <h1 className='text-lg md:text-xl font-semibold mb-2 py-2'>{service.heading}</h1>
            <p className='text-xs md:text-sm text-[#7D7987] mb-2'>{service.description}</p>
            <h4 className='font-medium'>Price: ₹ {service.cost}</h4>
          </div>
        ))}
      </div>


      {/* Get Service Button */}
      <div className='flex justify-center'>
        <button className='bg-[#AB65F6] text-white p-2 md:p-3 px-6 md:px-8 rounded-full font-xl cursor-pointer text-sm md:text-base' onClick={handleGetServiceClick}>
          Get a Service
        </button>
      </div>
      {showForm && <GetService services={services} onClose={() => setShowForm(false)} />}

      {/* Vector Image */}
      <div className='hidden md:block -z-50 absolute' style={{ width: "43%" }}>
        <img src={vector} alt='' />
      </div>

<div className='mx-4 md:mx-10 my-8 md:my-16'>
  <h2 className='text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8'>What Our Clients Say</h2>
  <div className='flex gap-4 md:gap-8 overflow-x-auto p-2 md:p-4 scrollbar-hide'>
    {reviewsData.map((review, index) => (
      <div 
        key={index} 
        className='flex-none bg-white rounded-lg md:rounded-xl p-4 md:p-8 w-72 md:w-96 shadow-lg'
        style={{ height: 'auto', minHeight: '180px' }}
      >
        <div className='flex items-center mb-4 md:mb-6'>
          <img src={review_img} alt="Reviewer" className='w-10 h-10 md:w-14 md:h-14 rounded-full mr-3 md:mr-4' />
          <div>
            <h3 className='font-bold text-base md:text-lg'>{review.name}</h3>
          </div>
        </div>
        <p className='text-gray-700 text-sm md:text-base'>{review.feedback}</p>
      </div>
    ))}
  </div>
</div>


      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export default Landing;

