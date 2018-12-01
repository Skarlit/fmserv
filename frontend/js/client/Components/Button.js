import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const noop = () => {};
function Button ({text, onClick, icon, iconSize, className}) {
    return <div onClick={onClick || noop} className={className}>
        {icon ? <Icon type={icon} size={iconSize}/> : null}
        {text}
    </div>
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    className: PropTypes.string,
    iconSize: PropTypes.string,
} 
 
 export default Button;