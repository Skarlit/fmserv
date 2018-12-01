import React from "react";
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FOLDER_LINK_TEXT_COLOR} from '../Common/Spec';
import { faFolder, faFileAudio, 
    faFileVideo, faFileArchive, 
    faFileImage, faFileAlt, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faFolder);
library.add(faFileAudio);
library.add(faFileVideo);
library.add(faFileArchive);
library.add(faFileImage);
library.add(faFileAlt);
library.add(faBars);

function Icon ({type, size}) {
    let icon = null;
    switch(type) {
        case "BAR_MENU":
            icon = "bars";
            break;
        case "FOLDER":
            icon = "folder";
            break;
        case "AUDIO":
            icon = "file-audio";
            break;
        case "VIDEO":
            icon = "file-video";
            break;
        case "COMPRESS":
            icon = "file-archive";
            break;
        case "IMAGE":
            icon = "file-image";
        case "TEXT":
            icon = "file-text";
        case "BINARY":    
        default:         
            icon = "file-alt";
    }
    return <div>
        <FontAwesomeIcon icon={icon} size={size} />
    </div>
}

Icon.propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
} 
  
export default Icon; 
