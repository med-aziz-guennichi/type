import styled from 'styled-components';
export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: #ffff;
padding  :10px ;
height: 88px;
`;
export const Line = styled.div`
  height: 2px;
  width: 98%;
  align-self: center;
  background-color: #4668F0;
`;
export const Navbarlogo = styled.nav`
  display: flex;
  height: 60px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffff;
  padding: 10px;
  
`;
export const ASP=styled.div`
display: flex;
flex-direction: row;
justify-content: last baseline;
height: 60px;
`;
export const CardNav=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

`;

export const Logo = styled.img`
  height: 35px;
  width: 200px;
  margin-right: 10px;
`;
export const Caption = styled.p`
  font-size: 20px;
  color: #1A328E;
  margin-top: 5px;
  left: 0;
  width: 243px;
`;
export const NavUser=styled.div`
display:flex ;
justify-content: baseline;
flex-direction: column;
height: 60px;
`
export const ContainerButton=styled.div`
display:flex;
justify-content:flex-end;

`

export const  Button=styled.button`
margin-right: 30px ;
border-radius: 8px;
height: auto ;
margin-bottom: 10px;
width: auto;
color: #FFFFFF;
  font-family: sans-serif;
  font-style: italic;
background-color: #192A6C;
text-decoration: 14px;
`
export const ContainerUser=styled.div`
display:flex;
flex-direction: row;
gap: 6px;
`;
export const Label=styled.label`

`
export const TextLabel = styled.span`
  color: #192A6C;
  font-size: large;
  font-family: "gra", sans-serif;
  width: 150px;

  `
  export const TextUser = styled.span`
  color: #ED1B1B;
  font-size: large;
  font-family: "gra", sans-serif;
  width: auto;
  `
  export const TextRol = styled.span`
  color: #192A6C;
  font-size: large;
  font-family: "gra", sans-serif;
  width: auto;
  `
export const TextAsp=styled.h3`
color: #1D4995;
margin-top: 15%;
`
export const ASPtext=styled.h1`
color:#1D4995;
margin-top: 0%;
font-size: 50px;
`