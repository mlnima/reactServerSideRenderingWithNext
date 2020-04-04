import React from 'react';
import AddWidgetWithPositionMenu from './AddWidgetWithPositionMenu'

const AddWidgetMenu = props => {
    return (
        <div className='AddWidgetMenu'>
            <AddWidgetWithPositionMenu type='text' name='Text'/>
            <AddWidgetWithPositionMenu type='posts' name='Posts'/>
            <AddWidgetWithPositionMenu type='recentComments' name='Recent Comments'/>
            <AddWidgetWithPositionMenu type='search' name='Search'/>
            <AddWidgetWithPositionMenu type='tagsCloud' name='Tags Cloud'/>
            <AddWidgetWithPositionMenu type='navigationMenu' name='Navigation Menu'/>
        </div>
    );
};
export default AddWidgetMenu;


// image recentComments search tagCloud categoriesCloud video navigationMenu
