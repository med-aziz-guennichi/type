import styled from 'styled-components';

export const Main = styled.div`
  background-color: #e8e4d9;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const Navbar = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f2f2f2;
  margin-bottom: 5px;
`;

export const Logo = styled.img`
  width: 200px;
  height: auto;

  @media only screen and (max-width: 900px) {
    width: 150px;
  }
`;

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: row;
  background-color: #ffff;

  @media only screen and (max-width: 900px) {
    max-width: 750px;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  background-color: #ffff;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Caprasimo', cursive;

  @media only screen and (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

export const Card = styled.div`
  background-color: #ffff;
  padding: 16px;
  display: flex;
  justify-content: left;
  flex-direction: column;
`;

export const Input = styled.input`
  background-color: ${({ dark }) => (dark ? '#161625' : '#efeff4')};
  border: none;
  width: 100%;
  font-family: 'Inter';
  outline: none;
  border-radius: 8px;
  color: ${({ dark }) => (dark ? '#e4e4e4' : '#161625')};
  padding-left: 20px;
  font-size: 14px;
  margin-bottom: 10px;
  margin-right: 5%;
  height: 40px;

  @media only screen and (max-width: 600px) {
    margin-right: 0;
  }
`;

export const Role = styled.select`
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 10px;
  font-style: italic;
`;

export const Button = styled.button`
  margin-top: 10px;
  height: 34px;
  width: 200px;
  background-image: linear-gradient(to right, #5c84a8, #315d83);
  border-radius: 10px;
  font-style: italic;
  border: transparent;
  font-family: 'Poppins';
  color: #ffffff;
  padding-left: 2px;
  align-items: center;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(to left, #5c84a8, #315d83);
    animation-name: example;
    animation-duration: 0.1s;
  }

  @media only screen and (max-width: 600px) {
    width: 150px;
  }

  @media only screen and (max-width: 400px) {
    width: 120px;
  }

  @media only screen and (max-width: 300px) {
    width: 100px;
  }
`;

export const ImgDiv = styled.img`
  width: 100%;
  padding: 20px;

  @media only screen and (max-width: 900px) {
    padding: 10px;
  }

  @media only screen and (max-width: 600px) {
    padding: 5px;
  }
`;

export const Label = styled.label`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  color: #161625;

  @media only screen and (max-width: 900px) and (min-width: 750px) {
    height: auto;
    width: 205px;
  }

  @media only screen and (max-width: 750px) and (min-width: 550px) {
    width: 180.05px;
    height: auto;
  }

  @media only screen and (max-width: 550px) {
    width: 85.05px;
    height: auto;
    align-items: center;
    text-align: center;
    text-size-adjust: calc();
  }
`;
