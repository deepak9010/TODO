import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineMenu} from "react-icons/ai" 

import '../styles/navbar.css';


const Navbar = ({menuOpen, setMenuOpen}) => {
  return (
   
      <>
        <nav>
           <NavContent setMenuOpen={setMenuOpen}/>
        </nav>
     </>
 
  );
};


const NavContent = ({setMenuOpen})=>(
  <>
     <h2> TODO</h2>

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