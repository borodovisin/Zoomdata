import React, {PropTypes} from 'react';
import logo from "../../public/assets/logo.png"

const Header = () => (
    <div className="navbar nav-color navbar-fixed-top" role="navigation">
    <div className="container-fluid">
      <div className="navbar-header">
        <img src={logo} width="110" />
      </div>
    </div>
  </div>
);

export default Header;