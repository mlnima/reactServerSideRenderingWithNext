import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router'
import { useRouter } from 'next/router'

const AlphabeticalNumericalRangeLinksWidget = props => {
    const router = useRouter()
    const [state, setState] = useState({
        range: [...'abcdefghijklmnopqrstuvwxyz0123456789']
    });

    const renderRange = state.range.map(i => {
        const path = {
            pathname: props.router ? props.router.pathname : '',
            query: props.router ? {...props.router.query, startWith: i} : ''
        }
        return (
            <Link key={i} href={path} as={router.asPath} scroll={false}><a>{i}</a></Link>
        )
    })

    return (
        <div className='alphabetical-range'>
            {renderRange}
        </div>
    );
};
export default withRouter(AlphabeticalNumericalRangeLinksWidget);
