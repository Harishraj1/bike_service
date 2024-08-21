import { Link } from 'react-router-dom';
import logo from "../asset/logo.png";

function Navbar(){
    return(
        <div>
            <nav className="bg-pink-100 w-72 p-4 h-screen fixed">
          <div className="mb-6">
            <img src={logo} alt="LOGO" className="w-full" />
          </div>
          <div className="space-y-4">
            <Link to="/admin" className="block p-3 pl-10 text-lg bg-[#AB65F6] text-white rounded-3xl">Profile</Link>
            <Link to="/avaliable_service" className="block p-3 pl-10 text-lg  bg-[#AB65F6] text-white rounded-3xl">Service Available</Link>
            <Link to="/userlogin" className="block p-3 pl-10 text-lg bg-[#AB65F6] text-white rounded-3xl">Users Login</Link>
            <Link to="/service_req" className="block p-3 pl-10 text-lg bg-[#AB65F6] text-white rounded-3xl">Service Requests</Link>
            <Link to="/" className="block p-3 pl-10 text-lg bg-[#AB65F6] text-white rounded-3xl">Logout</Link>
          </div>
        </nav>
        </div>
    )
}

export default Navbar