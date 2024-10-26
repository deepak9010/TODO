
import './App.css';


import { useState } from "react";
import{  BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Navigate ,useLocation,withRouter} from "react-router-dom";

import Navbar,{NavbarPhone} from './components/Navbar';
import Create from './components/Create';
// import Read from './components/Read';
import Read2 from './components/Read2';
// import Update from './components/Update';
import Update2 from './components/Update2';
import Table from './components/Table';
import Create2 from './components/Create2';
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
  const [menuOpen,setMenuOpen] = useState(false);
  // console.log(menuOpen);
  const location = useLocation();
  console.log(location)


  const shouldShowNavbar = () => {
    const hiddenRoutes = ['/login', '/signup', '/'];
    return !hiddenRoutes.includes(location.pathname);
  };

  return (

    <div className="App">

      {/* <Router> */}
     
           <NavbarPhone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
           {/* <Navbar  menuOpen={menuOpen} setMenuOpen={setMenuOpen}/> */}
           {/* {['/login', '/signup', '/'].includes(window.location.pathname) ? null : <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} */}
           {shouldShowNavbar() && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
          <Routes>
            {/* /create */}
            <Route path="/" element={<Navigate to="/login" />}  />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />

             <Route path="/create" element={<Create />} />
             <Route path="/2" element={<Create2 />} />
             {/* <Route path="/:id" element={<Update />} /> */}
             <Route path="/:id" element={<Update2 />} />    
             {/* <Route path="/all" element={<Read />} />     */}
             <Route path="/all" element={<Read2 />} />    
             <Route path="/table" element={<Table />} />     
          </Routes>


      {/* </Router> */}
      </div>
   
  );
}

export default App;
// export default withRouter(App)