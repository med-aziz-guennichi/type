import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 10px;
`;

const Popup = ({ testData }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);

  const openPopup = (index) => {
    setPopupVisible(true);
    setCurrentTestIndex(index);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleNext = () => {
    if (currentTestIndex < testData.length - 1) {
      if (currentTestIndex === 2) {
        setCurrentTestIndex(currentTestIndex + 1);
        setTimeout(() => {
          setCurrentTestIndex(currentTestIndex + 1);
        }, 4000);
      } else {
        setCurrentTestIndex(currentTestIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentTestIndex > 0) {
      setCurrentTestIndex(currentTestIndex - 1);
    }
  };

  return (
    <div>
      <Button onClick={() => openPopup(0)}>Open Popup</Button>
      <Overlay visible={popupVisible}>
        <PopupContainer>
          <Title>{testData[currentTestIndex].title}</Title>
          <p>{testData[currentTestIndex].description}</p>
          <Button onClick={handlePrevious} style={{ display: currentTestIndex === 0 ? "none" : "inline-block" }}>
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentTestIndex === 2 ? "Show" : "Next"}
          </Button>
          <Button onClick={closePopup}>Close</Button>
        </PopupContainer>
      </Overlay>
    </div>
  );
};

export default Popup;
