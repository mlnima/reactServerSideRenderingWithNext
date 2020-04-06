import React, { useEffect, useState, useContext, useRef } from 'react';
import Widget from '../Widget/Widget'
import Posts from '../Posts/Posts'
import RecentComments from '../RecentComments/RecentComments'

const WidgetsRenderer = props => {

    const renderWidgets = props.widgets.filter(widget => widget.position === props.position).map(widget => {
        switch ( widget.type ) {
            case 'posts':
                return (
                    <Widget key={ widget._id } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } component={ Posts } posts={ widget.posts } title={ widget.title } redirectLink={ widget.redirectLink }
                            redirectToTitle={ widget.redirectToTitle }
                            pagination={ widget.pagination }/>
                )
                break
            case 'text':
                return (
                    <Widget key={ widget._id } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } title={ widget.title } redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }/>
                )
                break
            case 'recentComments':
                return (
                    <Widget key={ widget._id } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } component={ RecentComments } data={widget.comments} title={ widget.title }  redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }/>
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
