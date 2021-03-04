import React, {useContext} from 'react';
import Link from 'next/link'
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'
import withRouter from "next/dist/client/with-router";
import {AppContext} from '../../../context/AppContext'

const MetaElement = props => {
    const contextData = useContext(AppContext);

    if (props.count > 0) {
        return (
            <Link key={props.name} as={contextData.state.activeLanguage !== 'default' ?`/${props.type}/${props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].name || props.name : props.name : props.name}?content=${props._id}&lang=${contextData.state.activeLanguage}`:`/${props.type}/${props.name}?content=${props._id}`} href={{
                pathname: `/posts`,
                query: {
                    content: props._id,
                    contentName: props.name,
                    contentType: props.type,
                }
            }}>
                <a className='meta-page-item'>
                    <RenderImageForMetaElements {...props}/>
                    <div className='meta-item-data'>
                        <p>{ props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].name || props.name : props.name : props.name} ({props.count})</p>

                    </div>
                </a>
            </Link>
        );
    } else return null

};
export default withRouter(MetaElement);
