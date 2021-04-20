import AddWidgetToPostMenuItem from "./AddWidgetToPostMenuItem";

const AddWidgetToPostMenu = props => {

    return (
        <div className='add-widget-to-post-menu'>
            <AddWidgetToPostMenuItem {...props} type='text' name='Text'/>
            <AddWidgetToPostMenuItem {...props} type='menu' name='Menu'/>
            <AddWidgetToPostMenuItem {...props} type='linkTo' name='Link To'/>
            <AddWidgetToPostMenuItem {...props} type='posts' name='Posts'/>
            <AddWidgetToPostMenuItem {...props} type='media' name='Media'/>
            <AddWidgetToPostMenuItem {...props} type='recentComments' name='Recent Comments'/>
            <AddWidgetToPostMenuItem {...props} type='searchBar' name='Search'/>
            <AddWidgetToPostMenuItem {...props} type='meta' name='Meta'/>
            <AddWidgetToPostMenuItem {...props} type='logo' name='Logo'/>
            <AddWidgetToPostMenuItem {...props} type='form' name='Form'/>
            <AddWidgetToPostMenuItem {...props} type='shoppingCart' name='Shopping Cart'/>
            <AddWidgetToPostMenuItem {...props} type='language' name='Language'/>
            <AddWidgetToPostMenuItem {...props} type='authentication' name='Auth Buttons'/>
            <AddWidgetToPostMenuItem {...props} type='imageSwiper' name='Image Swiper(slide Show)'/>
            <AddWidgetToPostMenuItem {...props} type='postsSwiper' name='Post Swiper(slide Show)'/>
        </div>
    );
};
export default AddWidgetToPostMenu;
