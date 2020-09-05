import React from 'react';
import AddWidgetWithPositionMenu from './AddWidgetWithPositionMenu'

const AddWidgetMenu = props => {
    return (
        <div className='AddWidgetMenu'>
            <AddWidgetWithPositionMenu type='text' name='Text'/>
            <AddWidgetWithPositionMenu type='posts' name='Posts'/>
            <AddWidgetWithPositionMenu type='media' name='Media'/>
            <AddWidgetWithPositionMenu type='recentComments' name='Recent Comments'/>
            <AddWidgetWithPositionMenu type='searchBar' name='Search'/>
            <AddWidgetWithPositionMenu type='meta' name='Meta'/>
            <AddWidgetWithPositionMenu type='logo' name='Logo'/>
            <AddWidgetWithPositionMenu type='navigationMenu' name='Navigation Menu'/>
            <AddWidgetWithPositionMenu type='alphabeticalNumericalRange' name='Alphabetical Numerical Range'/>
            <AddWidgetWithPositionMenu type='language' name='Language'/>
            <AddWidgetWithPositionMenu type='authentication' name='Authentication'/>
        </div>
    );
};
export default AddWidgetMenu;


// image recentComments search tagCloud categoriesCloud video navigationMenu
