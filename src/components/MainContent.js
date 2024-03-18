import React from 'react';
import { MAIN_CONTENT_TITLE } from '../constant/text';
import TabbedList from './TabbedList';
import Dropzone from './Dropzone';

const MainContent = () => {
    return (
        <div className='main-content'>
            <h1 className='title'>{MAIN_CONTENT_TITLE}</h1>
            <TabbedList />
            <Dropzone />
        </div>
    )
};

export default MainContent;
