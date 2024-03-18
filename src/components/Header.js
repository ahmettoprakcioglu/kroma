import React from 'react';
import { HEADER_TITLE } from '../constant/text';

const Header = () => {
    return (
        <div className='header-wrapper'>
            <div className='header-logo'>logo</div>
            <span className='header-title'>{HEADER_TITLE}</span>
        </div>
    );
};

export default Header;
