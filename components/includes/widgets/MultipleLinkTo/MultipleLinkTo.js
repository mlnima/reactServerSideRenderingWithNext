import Link from "next/link";
import {useRouter} from "next/router";
import {uniqueId} from "lodash";

const MultipleLinkTo = props => {
    const router = useRouter()

    const renderLinks = (props.multipleLinks ?? []).sort((a, b) => a.linkIndex - b.linkIndex).map(linkData => {
        const linkTitle = linkData.translations?.[router.locale]?.linkTitle || linkData.linkTitle ;
        const linkDescription = linkData.translations?.[router.locale]?.linkDescription || linkData.linkDescription;
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
