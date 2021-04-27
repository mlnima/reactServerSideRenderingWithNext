import {useContext} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";
import {uniqueId} from "lodash";

const MultipleLinkTo = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const renderLinks = (props.multipleLinks ?? []).sort((a, b) => a.linkIndex - b.linkIndex).map(linkData => {
        const linkTitle = router.locale === process.env.REACT_APP_DEFAULT_LOCAL ? linkData.linkTitle : linkData.translations?.[router.locale || contextData.state.activeLanguage]?.linkTitle ?? '';
        const linkDescription = router.locale === process.env.REACT_APP_DEFAULT_LOCAL ? linkData.linkDescription : linkData.translations?.[router.locale || contextData.state.activeLanguage]?.linkDescription ?? '';
        if (linkData.linkToType === 'internal') {
            return (
                <li key={uniqueId('id_')} className='multiple-links-widget-item'>
                    <style jsx>
                        {`
                        .multiple-links-widget-item{
                           list-style: none;
                           color: var(--navigation-text-color);
                              margin: 0 5px;
                        }
                     `}
                    </style>
                    {linkDescription ? <p>{linkDescription}</p> : null}
                    <Link href={linkData.linkTo} rel={linkData.linkRel} as={linkData.linkToAs}><a>{linkTitle}</a></Link>

                </li>
            )
        } else return (
            <li key={uniqueId('id_')} className='multiple-links-widget-item'>
                <style jsx>
                    {`
                        .multiple-links-widget-item{
                           list-style: none;
                           color: var(--navigation-text-color);
                           margin: 0 5px;
                        }
                        .multiple-links-widget-item-link{
                           color: var(--navigation-text-color);
                           text-decoration: none;
                        }
                     `}
                </style>
                {linkDescription ? <p>{linkDescription}</p> : null}
                <a className='multiple-links-widget-item-link' href={linkData.linkTo} rel={linkData.linkRel} target={linkData.linkToWindowType}>
                    {linkTitle}
                </a>
            </li>
        )
    })
    return (
        <ul className='multiple-links-widget'>
            <style jsx>{`
                .multiple-links-widget{
                            display: flex;
                            flex-wrap: wrap;
                            align-items:center;
                            justify-content:center;
                }
            `}</style>
            {renderLinks}
        </ul>
    );
};
export default MultipleLinkTo;
// display: 'flex',
//     flexWrap: 'wrap',
//     alignItems:'center',
//     justifyContent:'center'