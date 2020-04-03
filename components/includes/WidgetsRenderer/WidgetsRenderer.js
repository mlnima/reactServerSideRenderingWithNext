import React, { useEffect, useState, useContext, useRef } from 'react';
import Widget from '../Widget/Widget'
import Posts from '../Posts/Posts'

const WidgetsRenderer = props => {
    const [ state, setState ] = useState({});

    const renderWidgets = props.widgets.filter(widget=>widget.position===props.position).map(widget => {
        switch ( widget.type ) {
            case 'posts':
                return (
                    <Widget key={ widget._id } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } component={ Posts } posts={ widget.posts } title={ widget.title } redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }
                            pagination={ widget.pagination }/>
                )
                break
            case 'text':
                return (
                    <Widget key={ widget._id } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } title={ widget.title } mainLinkUrl='/posts/' redirectToTitle='More videos'/>
                )
                break
            default:
                return null

        }
    })

    return (
        <>
        {renderWidgets}
        </>
    )
};
export default WidgetsRenderer;
