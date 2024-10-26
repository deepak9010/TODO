import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineMenu} from "react-icons/ai" 

const Navbar = ({menuOpen, setMenuOpen}) => {
  return (
   
      <>
        <nav>
           <NavContent setMenuOpen={setMenuOpen}/>
        </nav>

         <button className="navBtn" onClick={() => setMenuOpen( !menuOpen)}>
            <AiOutlineMenu />
         </button>
      
     </>
 
  );
};


const NavContent = ({setMenuOpen})=>(
  <>
     <h2> CRUD</h2>
     <div>
      <Link to="/create"  onClick={() => setMenuOpen(false)}>Create Post</Link>
      <Link to="/2"  onClick={() => setMenuOpen(false)}>Create 2</Link>
      {/* <Link to="/all"  onClick={() => setMenuOpen(false)}>All Post</Link> */}
      <Link to="/all"  onClick={() => setMenuOpen(false)}>All Post</Link>
      <Link to="/table"  onClick={() => setMenuOpen(false)}>Table</Link>
  
     </div>

     
  </>
)


export const NavbarPhone = ({menuOpen,setMenuOpen}) => {
  return (
    <div className= {`navPhone ${menuOpen ? "navPhoneComes" : ""}`} >
         <NavContent setMenuOpen={setMenuOpen} />
    </div>
  );
};


export default Navbar;