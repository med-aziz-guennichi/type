import React from 'react';
import logo from '../images/logo.png';
import { NavbarContainer, Logo } from '../styled-components/Style_Navbar';

const Navbar = ({ child }) => {
  return (
    <>
    <NavbarContainer>
      <Logo src={logo} />
      
    </NavbarContainer>
  {child}
  </>
  );
};

export default Navbar;
