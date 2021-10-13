import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withTranslation} from 'next-i18next';

const MenuWidgetItemLink = ({t, linkTargetType, linkType, linkTargetUrl, linkName, linkTranslations, showSub, mobileNavigationOnClickHandler, subItems}) => {

    const router = useRouter()

    return (
        <React.Fragment>
            {linkTargetType === 'internal' ?
                <Link href={linkTargetUrl}  scroll={false}>
                    <a className={'menu-widget-item-link'}
                       rel='next'
                       onClick={()=>linkTargetUrl.includes('#') ? null : mobileNavigationOnClickHandler(linkTargetUrl)}
                       title={linkTranslations?.[router.locale]?.name || t([`common:${linkName}`, t(`customTranslation:${linkName}`)])}
                       // style={{backgroundColor: router.asPath === linkTargetUrl ? 'var(--main-active-color,#f90)': 'initial'}}
                    >
                        {linkTranslations?.[router.locale]?.name || t([`common:${linkName}`, t(`customTranslation:${linkName}`)])}

                    </a>
                </Link> :
                <a className='menu-widget-item-link' href={linkTargetUrl}>{linkName}</a>
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
