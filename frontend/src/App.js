
import './App.css';


import { useState } from "react";
import{  BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Navigate ,useLocation,withRouter} from "react-router-dom";

import Navbar,{NavbarPhone} from './components/Navbar';
import Home from './components/Home';



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

    
          </Routes>


      {/* </Router> */}
      </div>
   
  );
}

export default App;
// export default withRouter(App)