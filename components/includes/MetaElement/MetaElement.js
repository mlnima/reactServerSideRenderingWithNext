import React,{useEffect} from 'react';
import Link from 'next/link'
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'
import './MetaElement.scss'

const MetaElement = props => {

    // useEffect(() => {
    //     console.log(encodeURIComponent(props.name))
    // }, []);
    if (props.count > 0) {
        const encodedUrl = encodeURIComponent(props.name)
        console.log(props)
        return (
            <Link key={ props.name } href={ `/posts?${ props.type }=${props._id}` }>
                <a className='meta-page-item'>
                    <RenderImageForMetaElements { ...props }/>
                    <div className='meta-item-data'>
                        <p>{ props.name }</p>
                        <p>{ props.count } item</p>
                    </div>
                </a>
            </Link>
        );
    } else return null

};
export default MetaElement;
