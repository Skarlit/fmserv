import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from "./Button"

function NavLink ({text, href}) {
    return <Link to={href}>
        <Button text={text} />
    </Link>
}

NavLink.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string
} 
  
export default NavLink; 
