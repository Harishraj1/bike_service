import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./Component/Login"
import Admin_panal from "./Component/Admin_panal";
import Service_Avaliable from "./Component/Servise_Avaliable";
import User_Login from "./Component/User_Login";
import Service_Request from "./Component/Service_Request";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin_panal />}></Route>
        <Route path="/avaliable_service" element={<Service_Avaliable />}></Route>
        <Route path="/userlogin" element={<User_Login />}></Route>
        <Route path="/service_req" element={<Service_Request />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
