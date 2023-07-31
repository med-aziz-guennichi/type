import React, { useState } from 'react';
import { PopupContainer, PopupContent, PopupButton } from '../styled-components/StylePopup';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <PopupButton onClick={handleOpen}>Open Popup</PopupButton>

      {isOpen && (
        <PopupContainer>
          <PopupContent>
            <h2>Popup Content</h2>
            <p>This is a simple pop-up using styled-components.</p>
            <PopupButton onClick={handleClose}>Close</PopupButton>
          </PopupContent>
        </PopupContainer>
      )}
    </div>
  );
};

export default Popup;
