import React from 'react';
import AddWidgetWithPositionMenu from './AddWidgetWithPositionMenu'
import WidgetImporter from "./WidgetImporter/WidgetImporter";
import WidgetExporter from "./WidgetExporter/WidgetExporter";

const AddWidgetMenu = props => {
    return (
        <div className='AddWidgetMenu'>
            <AddWidgetWithPositionMenu type='text' name='Text'/>
            <AddWidgetWithPositionMenu type='textMedia' name='Text and Media'/>
            <AddWidgetWithPositionMenu type='menu' name='Menu'/>
            <AddWidgetWithPositionMenu type='linkTo' name='Link To'/>
            <AddWidgetWithPositionMenu type='posts' name='Posts'/>
            <AddWidgetWithPositionMenu type='media' name='Media'/>
            <AddWidgetWithPositionMenu type='recentComments' name='Recent Comments'/>
            <AddWidgetWithPositionMenu type='searchBar' name='Search'/>
            <AddWidgetWithPositionMenu type='meta' name='Meta'/>
            <AddWidgetWithPositionMenu type='logo' name='Logo'/>
            <AddWidgetWithPositionMenu type='form' name='Form'/>
            <AddWidgetWithPositionMenu type='shoppingCart' name='Shopping Cart'/>
            <AddWidgetWithPositionMenu type='navigationMenu' name='Navigation Menu'/>
            <AddWidgetWithPositionMenu type='alphabeticalNumericalRange' name='Alphabetical Numerical Range'/>
            <AddWidgetWithPositionMenu type='language' name='Language'/>
            <AddWidgetWithPositionMenu type='authentication' name='Auth Buttons'/>
            <AddWidgetWithPositionMenu type='imageSwiper' name='Image Swiper(slide Show)'/>
            <AddWidgetWithPositionMenu type='postsSwiper' name='Post Swiper(slide Show)'/>
            <WidgetImporter/>
            <WidgetExporter/>
        </div>
    );
};
export default AddWidgetMenu;


// image recentComments search tagCloud categoriesCloud video navigationMenu
