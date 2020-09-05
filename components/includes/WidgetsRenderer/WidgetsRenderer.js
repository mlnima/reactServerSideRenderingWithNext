import React from 'react';
import Widget from '../Widget/Widget'
import Posts from '../Posts/Posts'
import RecentComments from '../widgets/RecentComments/RecentComments'
import MetaWidget from '../widgets/MetaWidget/MetaWidget'
import MediaWidget from '../widgets/MediaWidget/MediaWidget'
import SearchInputComponent from '../widgets/SearchInputComponent/SearchInputComponent';
import AlphabeticalNumericalRangeLinksWidget from '../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'
import LanguagesSwitcher from '../widgets/LanguagesSwitcher/LanguagesSwitcher'
import Logo from '../Logo/Logo'
import Authentication from "../widgets/Authentication/Authentication";

const WidgetsRenderer = props => {
    const widgetInTypeOfPropsPosition = (props.widgets || []).filter(widget => widget.data.position === props.position)
    const widgetsToRenderSortByIndex = (widgetInTypeOfPropsPosition.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1))
    const renderWidgets = widgetsToRenderSortByIndex.map(widget => {

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
