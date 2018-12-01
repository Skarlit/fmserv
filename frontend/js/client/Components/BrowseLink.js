import React from "react";
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FOLDER_LINK_TEXT_COLOR, FOLDER_LINK_TEXT_SIZE, FOLDER_LINK_TEXT_WEIGHT } from '../Common/Spec';
import PropTypes from 'prop-types';
import Button from "./Button"

function BrowseLink ({text, href}) {
    return <Link className={css(styles.base)} to={href}>
        {text}
    </Link>
}

BrowseLink.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string
} 

const styles = StyleSheet.create({
    base: {
        ":visited": {
            color: FOLDER_LINK_TEXT_COLOR,
        },
        textDecoration: "none",
        color: FOLDER_LINK_TEXT_COLOR,
        fontSize: FOLDER_LINK_TEXT_SIZE,
        fontWeight: FOLDER_LINK_TEXT_WEIGHT,
        ":hover": {
            cursor: "pointer"
        }
    }
});
  
export default BrowseLink; 
