import {useContext} from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AppContext} from "../../../../context/AppContext";

const AlphabeticalNumericalRangeLinksWidget = () => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const renderRange = [...'abcdefghijklmnopqrstuvwxyz0123456789'].map(i => {
        const path = {
            pathname: router.pathname || '',
            query: {...(router?.query||{}), startWith: i} || {}
        }
        return (
            <Link key={i} href={path} as={router.asPath} scroll={false}>
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
                            flex-wrap: wrap;
                    }
                `}
            </style>

            {renderRange}
        </div>
    );
};
export default AlphabeticalNumericalRangeLinksWidget;
