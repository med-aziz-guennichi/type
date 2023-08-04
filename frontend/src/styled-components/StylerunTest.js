import styled, { keyframes } from 'styled-components';
import {BsXCircleFill,BsFillCheckCircleFill}from 'react-icons/bs'
import {FiPlay} from 'react-icons/fi'
export const MainContainer = styled.div`
width:100%;
padding: 10px;
display: flex;
color: #ffff;
flex-direction: column;
justify-content: space-around;
flex: auto;

`;
export const Container1 = styled.div`
border: 1px solid #3139A5;
background-color: #ffff;
justify-content: space-between;
border-color:#1643F4 ;
margin-left:7%;
margin-right:7%;
padding: 8px;
flex: auto;

`;

export const Card1Container1 = styled.div`
background-color: #3139A5;
display: flex;
width: 80%;
justify-content: space-between;
flex-direction: column;
flex: auto;


`;
export const InnerContainer1=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 7px;
flex: auto;

`
export const MenuCard1 = styled.nav`
flex-direction: row;
display: flex;
background-color: #3139A5;
height: 20px;
width: auto;
align-items: center;
margin-bottom: 8px;
padding: 6px;
justify-content: space-between;
flex: auto;


`;
export const Card1 = styled.div`
background-color: #3139A5; 
display: flex;
padding: 7px;
flex-direction: row;
justify-content: space-between;
flex: auto;

`;
export const InnerDiv1Card1 = styled.div`
background-color: #3139A5;
display: flex;
flex-direction: column;
flex: auto;

`;

export const InnerDiv2Card1 = styled.div`
background-color: #3139A5;
display: flex;
justify-content: space-between;
flex-direction: column;
align-items: center;
flex: auto;


`;
export const InnerButton=styled.div`
margin-top: 5%;
background-color: #3139A5;
justify-content: space-between;
display: flex;
flex-direction: row;
flex: auto;

 /* Add margins between components */
 & > * {
    margin-right: 10px; /* Adjust the margin value as per your preference */
  }

  /* Remove the margin from the last child to avoid extra space after the last component */
  & > *:last-child {
    margin-right: 0;
  }
`

export const InnerDiv3Card1 = styled.div`
  display: grid;
  border: 1px solid #ffff;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 7%;
  flex: auto;

`;

export const Step=styled.div`
border-color: #ffff;
width: 20%;
max-height: 220px;
display: flex;
border: 2px solid #D0D3F9;
flex-direction: column;
align-items: center;
flex: auto;
overflow: auto; 

`
export const Text =styled.p`
font-size: 16px;
font-family: 'Poppins', sans-serif; 
color: #ffff;
flex: auto;

`
export const StyledSelect = styled.select`
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-family: 'Signika Negative', sans-serif;
  flex: auto;


  /* Customize other styles as needed */
`;
export const Label=styled.input`
background-color: #ffff;
color: black;
width: auto;
height: 20px;
  text-align: center;
  font-family: 'Signika Negative', sans-serif;
  flex: auto;

`
export const LabelMac=styled.input`
background-color: #ffff;
width: 10%;
color: black;
height: 20px;
  text-align: center;
  font-family: 'Signika Negative', sans-serif;
  flex: auto;

`
export const LabelModel=styled.input`
background-color: #ffff;
width: 5%;
color: black;
height: 20px;
  text-align: center;
  font-family: 'Signika Negative', sans-serif;
  flex: auto;

`
export const LabelSerial=styled.input`
background-color: #ffff;
width: 7.5%;
color: black;
height: 20px;
  text-align: center;
  font-family: 'Signika Negative', sans-serif;
`
export const Button=styled.button`
background-color:#0A122F ;
color: #ffff;
border-radius: 4px;
max-height: 30px;
font-family: 'Signika Negative', sans-serif;
`
export const ButtonRun=styled.button`
background-color:#0A122F ;
color: #ffff;
display: flex;
justify-content: space-between;
border-radius: 8px;
margin-bottom: 25%;
font-size: 20px;
width: 70px;
align-items: center;
align-content: center;
align-self: center;
font-family: 'Signika Negative', sans-serif;
`
export const TextScrole =styled.p`
font-size: 12px;
font-family: 'Signika Negative', sans-serif;
color: #ffff;
margin-right: 40%;
`
export const TextStp =styled.p`
font-size: 12px;
color: #ffff;
font-family: 'Signika Negative', sans-serif;
  background-color: #1643F4;
  `
export const Card2Container1 = styled.div`
  flex: auto;

  /* Styles for Card2Container1 */
`;

export const MenuCard2 = styled.nav`
background-color: #3139A5;
display:flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
flex: auto;


`;

export const Card2 = styled.div`
  /* Styles for Card2 */
`;
export const Electric=styled.div`
display:flex;
flex-direction: column;
background-color: #3139A5;
padding: 10px;
flex: auto;


`
export const ElectricInner1=styled.div`
margin-bottom:0%;
display:flex;
flex-direction: row;
background-color: #14647C;
justify-content: space-around;
flex: auto;

`
export const ElectricInner2=styled.div`
display:flex;
flex-direction: row;
background-color: #14647C;
justify-content: space-around;
padding: 10px;
flex: auto;


`
export const Container2 = styled.div`
display:flex;
flex-direction: column;
justify-content: space-between;
//border: 1px solid #1643F4;
background-color: #ffff;
border-color:#1643F4 ;
padding : 8px;
flex: auto;

`;

export const progressAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: ${props => props.progress}%;
  }
`;
export const progressAnimation1 = keyframes`
  from {
    width: 0;
  }
  to {
    width: ${props => props.progress}%;
  }
`;
export const ProgressBarContainer1 = styled.div`
  height: 20px;
  width: 200%; /* Set the desired width for the progress bar container */
  background-color: #f2f2f2;
  border-radius: 4px;
  flex: auto;

`;

export const ProgressBar1 = styled.div`
  height: 100%;
  width: 100%; /* Make sure the progress bar always fills the container */
  max-width: 200%; /* Set the maximum width to 350px to round the width */
  background-color: green;
  border-radius: 4px;
  animation: ${progressAnimation} 2s ease-in-out;
  flex: auto;

`;

export const ProgressBarContainer = styled.div`
  width: 200px;
  height: 20px;
  background-color: #f2f2f2;
  border-radius: 4px;
  flex: auto;

`;

export const ProgressBar = styled.div`
   height: 100%;
  width: 100%; /* Make sure the progress bar always fills the container */
  max-width: 200px; /* Set the maximum width to 350px to round the width */
  background-color: green;
  border-radius: 4px;
  animation: ${progressAnimation} 6s ease-in-out;
  flex: auto;

`;
export const InnerDivElect =styled.div`
background-color: #CED7D9;
  border-radius: 4px;
  width: 33%;
  height: 70px;
  justify-content: center;
  align-items: center;
  flex: auto;

`
export const DivVolt=styled.div`
background-color: #CED7D9;
  border-radius: 4px;
  justify-content: center;
  width: auto;
  flex: auto;

`
export const MainDiv = styled.div`
background-color: #CED7D9;
  border-radius: 4px;
  width: 33%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #2541B0;
  font-size:large;
  flex: auto;


`;

export const SubDiv = styled.div`
  border: 1px solid;
  position: absolute;
  background-color: #CED7D9;
  border-radius: 4px;
  color: #1241FE    ;
  top: -10px;
  z-index: 99;
  font-size: medium;
  flex: auto;

`;

export const DivVerifier = styled.div`
  position: relative;
  flex-direction: column;
  border: 1px solid #1643F4;
background-color: #ffff;
justify-content: space-around;
border-color:#1643F4 ;
padding: 8px;
justify-content: center;
align-items: center;
margin-top: 1.5%;
flex: auto;

`;
export const TextInsideBorder = styled.span`
  position: absolute;
  top: -20px;
  padding: 3px;
  font-size: xx-large;
  background-color: #fff;
  color: #14185A;
  font-family: 'Signika Negative', sans-serif;

`;

export const CardButton = styled.div`
  display: flex;
  flex-direction: row;
  padding: 7px;
  justify-content:space-around ;
  flex: auto;

`;

export const TextVerif = styled.p`
  font-size: 30px;
  font-family: 'Signika Negative', sans-serif;
  color: blue;
  justify-self: center;
  justify-content: center;
  align-items: center;
`;

export const IconCheck = styled(BsFillCheckCircleFill)`
 color: green;
  font-size: 50px;
`;

export const IconX = styled(BsXCircleFill)`
  color: red;
  font-size: 50px;
`;

export const TextGreen=styled.h4`
font-family: 'Times New Roman', Times, serif;
color: green;
`
export const LabelStep = styled.input`
  width: 150px;
  border: 1px solid green; /* Corrected border syntax */
  color: green;
  background-color: #ffff;
`;

export const LabelActivity = styled.input`
color: black;
  font-family: 'Signika Negative', sans-serif;
  width: 200px;
  background-color: #ffff;
  border: 1px solid #ffff; /* Corrected border syntax */
`;
export const ModalContainer = styled.div`
  position: fixed;
  top: 17;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  flex: auto;

`;
export const Run=styled(FiPlay)`
align-self: center;
align-items: center ;
color: white; /* Set the color of the icon to white */

`;
export const divTextProg=styled.div`
display: flex;
direction: column;
justify-content: space-evenly;
width: auto;
flex: auto;

`;
export const LabelEta = styled.input`
  width: 150px;
  border: 1px solid green; /* Corrected border syntax */
  color: green;
  text-align: center  ;
  background-color: #ffff;
  align-items: center;
`;
export const DivPopup =styled.div`
background-color: #ffff;
width: 80%;
  height: auto;
  justify-self: center;
  justify-content: center;
align-items: center;
padding: 19px;
border-radius: 5px;
flex: auto;

`;
export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex: auto;

`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
 
`;

export const Tr = styled.tr`
background-color: ${(props) => (props.active ? '#244FDB' : 'inherit')};
`;

export const Td = styled.td`

  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  color:black;
  width: 50%;
`;