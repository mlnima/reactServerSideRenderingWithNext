import {FC} from "react";
import Link from "next/link";
import './MultipleLinkTo.styles.scss';

interface MultipleLinkToPropTypes {
    locale:string,
    multipleLinks: {
        linkIndex: number,
        linkTitle: string,
        linkTo: string,
        linkToAs: string,
        linkToWindowType: string,
        linkRel: string,
        linkDescription: string,
        linkToType: string,
        translations: {
            [key: string]: {
                linkTitle:string,
                linkDescription:string,
            }
        }
    }[]
}

const MultipleLinkTo: FC<MultipleLinkToPropTypes> = ({multipleLinks,locale}) => {
    return (
        <ul className='multipleLinksWidget'>
            {([...multipleLinks] || []).sort((a, b) => a.linkIndex - b.linkIndex).map((linkData,index) => {
                const linkTitle = linkData?.translations?.[locale as string]?.linkTitle || linkData.linkTitle;
                const linkDescription = linkData?.translations?.[locale as string]?.linkDescription || linkData.linkDescription;

                return (
                    <li key={`${linkData.linkTitle}-${index}`} className='multipleLinksWidgetItem'>
                        {linkDescription ? <p>{linkDescription}</p> : null}
                        <Link href={linkData.linkTo}
                              title={linkTitle}
                              target={linkData.linkToWindowType || '_self'}>
                            {linkTitle}
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
};
export default MultipleLinkTo;
