import React from 'react';
import './Header.css';

const Header = ({ title, onBack }) => {
  return (
    <header className="header">
      <button onClick={onBack} className="back-button">←</button>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
