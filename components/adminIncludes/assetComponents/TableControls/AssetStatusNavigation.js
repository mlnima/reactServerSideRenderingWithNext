import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link';
import { convertVariableNameToName } from '../../../../_variables/_variables'
import withRouter from 'next/dist/client/with-router'

const AssetStatusNavigation = props => {
    const [ state, setState ] = useState({
        types: [ 'all', 'draft', 'published', 'pending', 'trash', 'reported' ]
    });

    const renderStatus = state.types.map(type => {
        return (
            <Link key={ type } href={ {
                pathname: props.router ? props.router.pathname : '',
                query: { ...props.router.query, status: type }
            } }><a className='asset-page-status-navigation-item'>{ convertVariableNameToName(type) }</a></Link>
        )
    })

    if(props.router){
        if (props.router.query.assetsType==='posts'||props.router.query.assetsType==='metas'||props.router.query.assetsType==='comments'){
            return (
                <div className='asset-page-status-navigation'>
                    { renderStatus }
                </div>
            );
        }else{
            return(
                <div className='asset-page-status-navigation'>

                </div>
            )
        }
    }else return null


};
export default withRouter(AssetStatusNavigation);
