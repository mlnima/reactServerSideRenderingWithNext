import React from 'react';
import AddWidgetWithPositionMenu from './AddWidgetWithPositionMenu'
import WidgetImporter from "./WidgetImporter/WidgetImporter";
import WidgetExporter from "./WidgetExporter/WidgetExporter";

const AddWidgetMenu = props => {
    return (
        <div className='AddWidgetMenu'>
            <AddWidgetWithPositionMenu {...props} type='text' name='Text'/>
            <AddWidgetWithPositionMenu {...props} type='textEditor' name='Text Editor'/>
            <AddWidgetWithPositionMenu {...props} type='menu' name='Menu'/>
            <AddWidgetWithPositionMenu {...props} type='linkTo' name='Link To'/>
            <AddWidgetWithPositionMenu {...props} type='multipleLinkTo' name='Multiple Link To'/>
            <AddWidgetWithPositionMenu {...props} type='posts' name='Posts'/>
            <AddWidgetWithPositionMenu {...props} type='media' name='Media'/>
            <AddWidgetWithPositionMenu {...props} type='recentComments' name='Recent Comments'/>
            <AddWidgetWithPositionMenu {...props} type='searchBar' name='Search'/>
            <AddWidgetWithPositionMenu {...props} type='searchButton' name='Search Button'/>
            <AddWidgetWithPositionMenu {...props} type='meta' name='Meta'/>
            <AddWidgetWithPositionMenu {...props} type='logo' name='Logo'/>
            <AddWidgetWithPositionMenu {...props} type='form' name='Form'/>
            <AddWidgetWithPositionMenu {...props} type='shoppingCart' name='Shopping Cart'/>
            <AddWidgetWithPositionMenu {...props} type='alphabeticalNumericalRange' name='Alphabetical Numerical Range'/>
            <AddWidgetWithPositionMenu {...props} type='language' name='Language'/>
            <AddWidgetWithPositionMenu {...props} type='authentication' name='Auth Buttons'/>
            <AddWidgetWithPositionMenu {...props} type='imageSwiper' name='Image slide Show'/>
            <AddWidgetWithPositionMenu {...props} type='postsSwiper' name='Post slide Show'/>
            <WidgetImporter/>
            <WidgetExporter/>
        </div>
    );
};
export default AddWidgetMenu;


// image recentComments search tagCloud categoriesCloud video navigationMenu
