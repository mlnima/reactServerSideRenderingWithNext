import {useContext,useState} from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AppContext} from "../../../../context/AppContext";
import _ from "lodash";

const AlphabeticalNumericalRangeLinksWidget = () => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [range,setRange] = useState(()=>{
        return router.pathname === '/actors' ? [...'abcdefghijklmnopqrstuvwxyz'] : [...'abcdefghijklmnopqrstuvwxyz0123456789']
    })




    const renderRange = range.map(i => {
        const path = {
            pathname: router.pathname || '',
            query: {...(router?.query||{}), startWith: i} || {}
        }
        return (
            <Link key={_.uniqueId('alphabetical-range_')} href={path} as={router.asPath} scroll={false}>
                <a className='alphabetical-range-widget-item' onClick={contextData.functions.loadingHandler}>
                    <style jsx>{`
                           .alphabetical-range-widget-item{
                                background-color: var(--navigation-background-color);
                                color: var(--navigation-text-color);
                                padding: 5px 10px;
                                margin: 5px;
                                border-radius: 5px;
                           }
                    `}</style>
                    {i}
                </a>
            </Link>
        )
    })

    return (
        <div className='alphabetical-range-widget'>
            <style jsx>
                {`
                    .alphabetical-range-widget{
                            display:flex;
                            justify-content: center;
                            flex-wrap: wrap;
                    }
                `}
            </style>

            {renderRange}
        </div>
    );
};
export default AlphabeticalNumericalRangeLinksWidget;
