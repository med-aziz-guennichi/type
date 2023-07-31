import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const PopupContent = styled.div`
  background-color: #FCFDFD;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const PopupButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  height: 34px;
   width: 150px;
  background-image: linear-gradient(to right,#5C84A8, #315D83);
  border: transparent;
  font-family: 'Poppins';
  color: #ffffff;
`;

export const CloseIcon = styled(AiFillCloseCircle)`
position: absolute;
top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  color: ${props => (props.isOpen ? 'green' : 'red')};
  // Additional styling for the close icon
`;
export const InputPopup=styled.input`
  
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  width: 70%;
  margin-bottom: 40px;
`;
export const TitlePopup = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  margin-bottom: 50px;
`;