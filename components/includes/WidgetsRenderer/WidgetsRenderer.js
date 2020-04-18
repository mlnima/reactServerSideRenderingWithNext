import React, { useEffect, useState, useContext, useRef } from 'react';
import Widget from '../Widget/Widget'
import Posts from '../Posts/Posts'
import RecentComments from '../widgets/RecentComments/RecentComments'
import MetaWidget from '../widgets/MetaWidget/MetaWidget'
import MediaWidget from '../widgets/MediaWidget/MediaWidget'
import SearchInputComponent from '../widgets/SearchInputComponent/SearchInputComponent';
import AlphabeticalNumericalRangeLinksWidget from '../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'
import Logo from '../Logo/Logo'

const WidgetsRenderer = props => {

    const renderWidgets = (props.widgets || []).filter(widget => widget.data.position === props.position).map(widget => {

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
