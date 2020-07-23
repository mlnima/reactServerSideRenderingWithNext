import React, {useEffect} from 'react';
import Link from 'next/link'
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'
import './MetaElement.scss'
import withRouter from "next/dist/client/with-router";

const MetaElement = props => {


    if (props.count > 0) {
        return (
            <Link key={props.name} as={`/${props.type}/${props.name}?content=${props._id}`} href={{
                // pathname:`/${props.type}/${props.name}`,
                pathname:`/posts`,
                query:{
                    content:props._id,
                    contentName:props.name,
                    contentType:props.type
                }
            }}>
                <a className='meta-page-item'>
                    <RenderImageForMetaElements {...props}/>
                    <div className='meta-item-data'>
                        <p>{props.router ? props.router.query.lang ? props.translations ? props.translations[props.router.query.lang] ? props.translations[props.router.query.lang].name || props.name : props.name : props.name : props.name : props.name}</p>
                        <p>{props.count} item</p>
                    </div>
                </a>
            </Link>
        );
    } else return null

};
export default withRouter(MetaElement);
