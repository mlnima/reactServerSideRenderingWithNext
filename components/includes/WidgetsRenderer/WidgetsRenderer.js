import React, { useEffect, useState, useContext, useRef } from 'react';
import Widget from '../Widget/Widget'
import Posts from '../Posts/Posts'
import RecentComments from '../RecentComments/RecentComments'
import MetaWidget from '../MetaWidget/MetaWidget'
import SearchInputComponent from '../SearchInputComponent/SearchInputComponent';
import Logo from '../Logo/Logo'

const WidgetsRenderer = props => {
    // useEffect(() => {
    //     console.log(props)
    // }, [ props ]);


    const renderWidgets = props.widgets.filter(widget => widget.position === props.position).map(widget => {
        switch ( widget.type ) {
            case 'posts':

                return (
                    <Widget key={ widget._id }
                            propsKey={ widget._id }
                            viewType={widget.viewType}
                            text={ widget.text } textAlign={ widget.textAlign }
                            component={ Posts } posts={ widget.posts }
                            title={ widget.title }
                            redirectLink={ widget.redirectLink }
                            redirectToTitle={ widget.redirectToTitle }
                            pagination={ widget.pagination }/>
                )
                break
            case 'text':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } title={ widget.title } redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }/>
                )
                break
            case 'recentComments':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } component={ RecentComments } data={widget.comments} title={ widget.title }  redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }/>
                )
                break
            case 'meta':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } component={ MetaWidget } data={widget.metaData} title={ widget.title }  redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }/>
                )
                break
            case 'searchBar':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } text={ widget.text } component={ SearchInputComponent } pathURL={widget.pathURL}  title={ widget.title } redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }/>
                )
                break
            case 'logo':
                return (
                    <Widget key={ props.widgets.indexOf(widget) } propsKey={ widget._id } LogoText={ widget.LogoText } viewType={widget.viewType}  headLine={widget.headLine} LogoUrl={widget.LogoUrl}  component={ Logo } title={ widget.title } redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }/>
                )
                break
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
