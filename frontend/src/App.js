
import './App.css';


import { useState } from "react";
import{  BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Navigate ,useLocation,withRouter} from "react-router-dom";

import Navbar,{NavbarPhone} from './components/Navbar';
import Create from './components/Create';
import Home from './components/Home';

import Read from './components/Read';



function App() {
  const [menuOpen,setMenuOpen] = useState(false);
  // console.log(menuOpen);
  const location = useLocation();
  console.log(location)


  return (

    <div className="App">

      {/* <Router> */}
     
           <NavbarPhone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Routes>
            {/* /create */}
            <Route path="/" element={<Home />}  />
             <Route path="/create" element={<Create />} />
    
          </Routes>


      {/* </Router> */}
      </div>
   
  );
}

export default App;
// export default withRouter(App)