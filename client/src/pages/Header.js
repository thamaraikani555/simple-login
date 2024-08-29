import React, { useState } from 'react';
import '../css/Header.css'; // We'll create this CSS file next
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ResponsiveHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    history.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        {/* <h1>Logo</h1> */}
      </div>
      <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
        <ul>
          <li>
            <button onClick={handleLogout} className="header__logout-button">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </li>
        </ul>
      </nav>
      <button className="header__toggle-button" onClick={toggleMobileMenu}>
        ☰
      </button>
    </header>
  );
};

export default ResponsiveHeader;
