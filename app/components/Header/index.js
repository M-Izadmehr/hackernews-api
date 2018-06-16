import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Header = () => (
  <div className="comp-header">
    <div className="logo-container">
      <span className="logo">Y</span>
      <b>Hacker News</b>&nbsp;
      Top Stories
    </div>
    <div className="links-container">
      <Link to="/">
        <div className="link">Infinite Scroll Template</div>
      </Link>
      <Link to="/SinglePageConcurrent">
        <div className="link">Lazy Complete Page</div>
      </Link>
    </div>

  </div>
);
export default Header;
