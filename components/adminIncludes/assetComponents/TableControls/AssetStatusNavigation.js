import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link';
import {convertVariableNameToName} from '../../../../_variables/_variables'
import withRouter from 'next/dist/client/with-router'
const AssetStatusNavigation = props => {
    const [ state, setState ] = useState({
        types:['all','draft','published','pending','trash','reported']
    });

    const renderStatus = state.types.map(type=>{
        return(
            <Link key={type} href={ {
                pathname: props.router?props.router.pathname:'',
                query: { ...props.router.query, status: type }
            } }><a className='asset-page-status-navigation-item'>{convertVariableNameToName(type)}</a></Link>
        )
    })

    return (
        <div className='asset-page-status-navigation'>
            {renderStatus}
        </div>
    );
};
export default withRouter(AssetStatusNavigation);
