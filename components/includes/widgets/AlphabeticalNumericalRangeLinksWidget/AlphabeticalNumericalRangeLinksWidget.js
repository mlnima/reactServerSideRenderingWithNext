import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router'

const AlphabeticalNumericalRangeLinksWidget = props => {
    const [ state, setState ] = useState({
        range: [ ...'abcdefghijklmnopqrstuvwxyz0123456789' ]
    });



    const renderRange = state.range.map(i => {
        const path = {
            pathname: props.router ? props.router.pathname : '',
            query: props.router ? { ...props.router.query, startWith: i } : ''
        }
        return (
            <Link key={i} href={ path }><a>{ i }</a></Link>
        )
    })

    return (
        <div className='alphabetical-range'>
            { renderRange }
        </div>
    );
};
export default withRouter(AlphabeticalNumericalRangeLinksWidget);
