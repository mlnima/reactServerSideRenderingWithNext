import {FC} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";


const MultipleLinkToStyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  .multiple-links-widget-item {
    list-style: none;
    color: var(--main-text-color, #fff);
    margin: 0 5px;
  }

  .multiple-links-widget-item-link {
    color: var(--main-text-color, #fff);
    text-decoration: none;
  }
`

interface MultipleLinkToPropTypes {
    multipleLinks: {
        linkIndex: number,
        linkTitle: string,
        linkTo: string,
        linkToAs: string,
        linkToWindowType: string,
        linkRel: string,
        linkDescription: string,
        linkToType: string,
        translations: {}
    }[]
}

const MultipleLinkTo: FC<MultipleLinkToPropTypes> = ({multipleLinks}) => {
    const {locale} = useRouter()

    const renderLinks = ([...multipleLinks] || []).sort((a, b) => a.linkIndex - b.linkIndex).map((linkData,index) => {
        const linkTitle = linkData.translations?.[locale]?.linkTitle || linkData.linkTitle;
        const linkDescription = linkData.translations?.[locale]?.linkDescription || linkData.linkDescription;

        return (
            <li key={`${linkData.linkTitle}-${index}`} className='multiple-links-widget-item'>
                {linkDescription ? <p>{linkDescription}</p> : null}
                <Link href={linkData.linkTo}
                      title={linkTitle}
                      target={linkData.linkToWindowType || '_self'}>
                        {linkTitle}
                </Link>
            </li>
        )

    })
    return (
        <MultipleLinkToStyledUl className='multiple-links-widget'>
            {renderLinks}
        </MultipleLinkToStyledUl>
    );
};
export default MultipleLinkTo;
