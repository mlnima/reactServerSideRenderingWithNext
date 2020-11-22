import React from 'react';
import loadable from '@loadable/component';
const Widget = loadable(() => import('../Widget/Widget'))
const Posts = loadable(() => import('../Posts/Posts'))
const RecentComments = loadable(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = loadable(() => import('../widgets/MetaWidget/MetaWidget'))
const MediaWidget = loadable(() => import('../widgets/MediaWidget/MediaWidget'))
const SearchInputComponent = loadable(() => import('../widgets/SearchInputComponent/SearchInputComponent'))
const AlphabeticalNumericalRangeLinksWidget = loadable(() => import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
const LanguagesSwitcher = loadable(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'))
const Logo = loadable(() => import('../Widget/Logo/Logo'))
const Authentication = loadable(() => import('../widgets/Authentication/Authentication'))
const LinkTo = loadable(() => import('../widgets/LinkTo/LinkTo'))
const ImageSwiper = loadable(() => import('../widgets/ImageSwiper/ImageSwiper'))
const PostSwiper = loadable(() => import('../widgets/PostSwiper/PostSwiper'))
const MenuWidget = loadable(() => import('../widgets/MenuWidget/MenuWidget'))
const ShoppingCart = loadable(() => import('../widgets/ShoppingCart/ShoppingCart'))
const FormWidget = loadable(() => import('../widgets/FormWidget/FormWidget'))

//import Widget from '../Widget/Widget'
//import Posts from '../Posts/Posts'
//import RecentComments from '../widgets/RecentComments/RecentComments'
//import MetaWidget from '../widgets/MetaWidget/MetaWidget'
//import MediaWidget from '../widgets/MediaWidget/MediaWidget'
//import SearchInputComponent from '../widgets/SearchInputComponent/SearchInputComponent';
//import AlphabeticalNumericalRangeLinksWidget from '../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'
//import LanguagesSwitcher from '../widgets/LanguagesSwitcher/LanguagesSwitcher'
//import Logo from '../Widget/Logo/Logo'
//import Authentication from "../widgets/Authentication/Authentication";
//import LinkTo from "../widgets/LinkTo/LinkTo";
//import ImageSwiper from "../widgets/ImageSwiper/ImageSwiper";
//import PostSwiper from "../widgets/PostSwiper/PostSwiper";
//import MenuWidget from "../widgets/MenuWidget/MenuWidget";
//import ShoppingCart from "../widgets/ShoppingCart/ShoppingCart";
//import FormWidget from "../widgets/FormWidget/FormWidget";

const WidgetsRenderer = props => {
    const widgetInTypeOfPropsPosition = (props.widgets || []).filter(widget => widget.data.position === props.position)
    const widgetsToRenderSortByIndex = (widgetInTypeOfPropsPosition.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1))
    const renderWidgets = widgetsToRenderSortByIndex.map(widget => {
        //console.log(props.position+ ':' +props.deviceWidth)
        switch ( widget.data.type ) {

            case 'posts':
                return (
                    <Widget key={ widget._id } component={ Posts } posts={ widget.posts } propsKey={ widget._id } { ...widget }/>
                )
            case 'media':
                return (
                    <Widget key={ widget._id } component={ MediaWidget } posts={ widget.posts } propsKey={ widget._id } { ...widget }/>
                )

            case 'text':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id }{ ...widget }/>
                )


            case 'textEditor':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id }{ ...widget }/>
                )

            case 'recentComments':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ RecentComments } { ...widget }/>
                )

            case 'meta':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ MetaWidget } { ...widget }/>
                )

            case 'searchBar':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ SearchInputComponent } { ...widget }/>
                )

            case 'logo':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ Logo } { ...widget }/>
                )
            case 'alphabeticalNumericalRange':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ AlphabeticalNumericalRangeLinksWidget } { ...widget } />
                )

            case 'language':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ LanguagesSwitcher } { ...widget } />
                )

            case 'authentication':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ Authentication } { ...widget } />
                )

            case 'linkTo':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ LinkTo } { ...widget } />
                )

            case 'imageSwiper':
                return (
                    <Widget {...props} key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ ImageSwiper } { ...widget } />
                )
            case 'postsSwiper':
                return (
                    <Widget {...props} key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ PostSwiper } { ...widget } />
                )
            case 'menu':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ MenuWidget } { ...widget } />
                )
            case 'shoppingCart':

                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ ShoppingCart } { ...widget } />
                )
            case 'form':
// console.log(widget)
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ FormWidget } { ...widget } />
                )

            default:
                return null

        }
    })

    return (
        <>
            { renderWidgets }
        </>
    )
};
export default WidgetsRenderer;
