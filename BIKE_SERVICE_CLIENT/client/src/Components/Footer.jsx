import { Link } from 'react-router-dom';
import footer_logo from './images/footer_logo.png';

function Footer({ isLoggedIn }) {
  return (
    <footer className='flex flex-col md:flex-row flex-wrap justify-around bg-black text-white px-6 md:px-10 py-4 md:py-6 mt-10'>
      {/* Contact Section */}
      <div className='flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0'>
        <div id='nav_logo' className='w-24 md:w-32 cursor-pointer pb-2'>
          <img src={footer_logo} alt="Logo" />
        </div>
        <p className='text-xs md:text-sm'>Contact Us:</p>
        <p className='text-xs md:text-sm'>Email: abc@gmail.com</p>
        <p className='text-xs md:text-sm'>Phone: 9999999999</p>
        <p className='text-xs md:text-sm'>Address: XYZ street, ABC</p>
      </div>

      {/* Quick Links Section - Visible only on medium screens and above */}
      <div className='hidden md:flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0'>
        <h1 className='font-bold text-sm md:text-base py-2'>Quick Links:</h1>
        <div className='flex flex-col gap-1'>
          <p className='hover:font-medium cursor-pointer text-xs md:text-sm' onClick={() => {
            const serviceSection = document.getElementById("hero_section");
            serviceSection.scrollIntoView({ behavior: "smooth" });
          }}>
            Home
          </p>
          <p className='hover:font-medium cursor-pointer text-xs md:text-sm' onClick={() => {
            const serviceSection = document.getElementById("services-section");
            serviceSection.scrollIntoView({ behavior: "smooth" });
          }}>
            About Us
          </p>
          {isLoggedIn && (
            <p className='hover:font-medium text-xs md:text-sm'><Link to="/myservices">My Service</Link></p>
          )}
        </div>
      </div>

      {/* Follow Us Section */}
      <div className='flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0'>
        <h1 className='font-bold text-sm md:text-base py-2'>Follow Us:</h1>
        <div className='flex flex-col gap-1'>
          <p className='text-xs md:text-sm'>Facebook</p>
          <p className='text-xs md:text-sm'>Twitter</p>
          <p className='text-xs md:text-sm'>Instagram</p>
        </div>
      </div>

      {/* Terms & Policies Section */}
      <div className='flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0'>
        <h1 className='font-bold text-sm md:text-base py-2'>Terms & Policies:</h1>
        <div className='flex flex-col gap-1'>
          <p className='text-xs md:text-sm'>Privacy Policy</p>
          <p className='text-xs md:text-sm'>Terms of Service</p>
          <p className='text-xs md:text-sm'>Cookie Policy</p>
        </div>
      </div>

      {/* Support Section - Visible only on medium screens and above */}
      <div className='hidden md:flex flex-col items-center md:items-start text-center md:text-left'>
        <h1 className='font-bold text-sm md:text-base py-2'>Support:</h1>
        <div className='flex flex-col gap-1'>
          <p className='text-xs md:text-sm'>FAQs</p>
          <p className='text-xs md:text-sm'>Help Center</p>
          <p className='text-xs md:text-sm'>Customer Support</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

