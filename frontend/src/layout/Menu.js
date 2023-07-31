import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {
  MenuContainer,
  MenuItem,
  Container,
  Textmenu,
  StyledMdSettingsSuggest,
  StyledRiPlayList2Fill,
  StyledFaHome,
  StyledFiLogOut,
} from '../styled-components/Styel_Menu';
import Runtest from '../components/Runtest';

function Menu({ child }) {
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  return (
    <>
      <MenuContainer>
        {/* Use Link component with 'to' prop for navigation */}
        <MenuItem
          as={Link}
          to="/accueil"
          active={activeMenuItem === 0}
          onClick={() => handleMenuItemClick(0)}
        >
          <Container>
            <StyledMdSettingsSuggest />
            <Textmenu>System Configure</Textmenu>
          </Container>
        </MenuItem>
        <MenuItem
          as={Link}
          to="/accueil"
          active={activeMenuItem === 1}
          onClick={() => handleMenuItemClick(1)}
        >
          <Container>
            <StyledRiPlayList2Fill />
            <Textmenu>Run Test Sequence</Textmenu>
          </Container>
        </MenuItem>
        <MenuItem
          as={Link}
          to="#services"
          active={activeMenuItem === 2}
          onClick={() => handleMenuItemClick(2)}
        >
          <Container>
            <StyledFiLogOut />
            <Textmenu>Reports</Textmenu>
          </Container>
        </MenuItem>
        <MenuItem
          as={Link}
          to="/Userss"
          active={activeMenuItem === 3}
          onClick={() => handleMenuItemClick(3)}
        >
          <Container>
            <StyledFaHome />
            <Textmenu>Admin</Textmenu>
          </Container>
        </MenuItem>
      </MenuContainer>
      {child}
    </>
  );
}

export default Menu;
