import React from "react";
import logo from "../images/logo.png";
import {
  NavUser,
  NavbarContainer,
  Navbarlogo,
  Label,
  Logo,
  Button,
  ASP,
  CardNav,
  TextAsp,
  ASPtext,
  ContainerButton,
  ContainerUser,
  Caption,
  Line,
  TextLabel,
  TextRol,
  TextUser,
} from "../styled-components/StyelNAvrigas";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/apiCalls";
function NavRigas({ child }) {
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    logoutSuccess(dispatch);
  };
  return (
    <>
      <NavbarContainer>
        <CardNav>
          <Navbarlogo>
            <Logo src={logo} />
            <Caption>Manufacturing Test Tool</Caption>
          </Navbarlogo>
          <ASP>
            <ASPtext>ASP</ASPtext>
            <TextAsp>GO,PRESTE,RIVAL</TextAsp>
          </ASP>
          <NavUser>
            <ContainerButton>
              <Button onClick={logoutHandler}>Se déconnecter</Button>
            </ContainerButton>
            <ContainerUser>
              <TextUser>XXXXXXXX</TextUser>
              <TextRol>(Admin)</TextRol>
            </ContainerUser>
          </NavUser>
        </CardNav>
        <Line />
      </NavbarContainer>
      {child}
    </>
  );
}

export default NavRigas;
