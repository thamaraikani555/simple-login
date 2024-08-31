import React, { useState } from 'react';
import '../css/Header.css'; 
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faArrowLeft  } from '@fortawesome/free-solid-svg-icons';

const ResponsiveHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('authToken');
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    history.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleBackClick = () => {
    const previousPath = location.state?.from || '/';
    if (previousPath !== '/login' || !isLoggedIn) {
      history.goBack();
    }
  };

  return (
    <header className="header">
        <button onClick={handleBackClick} className="back-button header__logout-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
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
