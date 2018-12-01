import React from "react";
import { StyleSheet, css } from 'aphrodite';
import { DL_LINK_TEXT_COLOR, DL_LINK_TEXT_COLOR_VISITED, DL_LINK_TEXT_SIZE } from '../Common/Spec';
import PropTypes from 'prop-types';

function DownloadLink ({text, href}) {
    return <a className={css(styles.base)} target="_blank" rel="noopener noreferrer" href={href}>
        {text}
    </a>
}

DownloadLink.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string
} 

const styles = StyleSheet.create({
    base: {
        display: "flex",
        ":visited": {
            color: DL_LINK_TEXT_COLOR_VISITED,
        },
        textDecoration: "none",
        color: DL_LINK_TEXT_COLOR,
        fontSize: DL_LINK_TEXT_SIZE,
        ":hover": {
            cursor: "pointer"
        }
    }
});
  
export default DownloadLink; 
