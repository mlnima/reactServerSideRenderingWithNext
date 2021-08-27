import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withTranslation} from 'next-i18next';
import styled from "styled-components";

const MenuWidgetItemLinkStyledLink = styled.a`
  color: var(--navigation-text-color);
  text-decoration: none;
  font-weight: normal;
  font-size: 14px;

  &:hover {
    filter: invert(70%);
    cursor: pointer;
  }
`



const MenuWidgetItemLink = ({t, linkTargetType, linkType, linkTargetUrl, linkAs, linkName, linkTranslations, showSub, mobileNavigationOnClickHandler, subItems}) => {

    const router = useRouter()

    return (
        <React.Fragment>

            {linkTargetType === 'internal' ?
                <Link href={linkTargetUrl} as={linkAs} scroll={false}>
                    <MenuWidgetItemLinkStyledLink className={'menu-widget-item-link'}
                       rel='next'
                       onClick={linkTargetUrl.includes('#') ? null : mobileNavigationOnClickHandler}
                       title={linkTranslations?.[router.locale]?.name || t([`common:${linkName}`, t(`customTranslation:${linkName}`)])}>
                        {linkTranslations?.[router.locale]?.name || t([`common:${linkName}`, t(`customTranslation:${linkName}`)])}
                    </MenuWidgetItemLinkStyledLink>
                </Link> :
                <MenuWidgetItemLinkStyledLink className='menu-widget-item-link' href={linkTargetUrl}>{linkName}</MenuWidgetItemLinkStyledLink>
            }
            {linkType === 'parent' && subItems?.length > 0 ?
                <button className='open-submenus' onClick={onOpenSubmenusHandler}>
                    <FontAwesomeIcon icon={showSub ? faSortUp : faSortDown} className='navigation-dropdown-icon' style={{color: 'white', width: '20px', height: '20px'}}/>
                </button>
                : null}
        </React.Fragment>
    );
};
export default withTranslation(['customTranslation', 'common'])(MenuWidgetItemLink);
