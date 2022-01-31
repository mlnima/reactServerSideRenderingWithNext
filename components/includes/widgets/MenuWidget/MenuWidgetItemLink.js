import React, {useMemo} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from 'next-i18next';

const MenuWidgetItemLink = (
    {
        linkTargetType,
        linkTargetUrl,
        linkName,
        linkTranslations,
        mobileNavigationOnClickHandler,
        // showSub,
        // linkType,
        // subItems,
        // onOpenSubmenusHandler
    }) => {
    const {t} = useTranslation(['common', 'customTranslation']);
    const {locale} = useRouter()

    const linkNameWithTranslate = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            linkName :
            t([t(linkName, {ns: 'common'}), t(linkName, {ns: 'customTranslation'})])
    }, [])

    return (
        <React.Fragment>
            {linkTargetType === 'internal' ?
                <Link href={linkTargetUrl}>
                    <a className={'menu-widget-item-link'}
                       onClick={() => linkTargetUrl.includes('#') ? null : mobileNavigationOnClickHandler(linkTargetUrl)}
                       title={linkTranslations?.[locale]?.name || linkName}
                    >
                        {linkTranslations?.[locale]?.name || linkNameWithTranslate}
                    </a>
                </Link>
                :
                <a className='menu-widget-item-link'
                   href={linkTargetUrl}
                   title={linkTranslations?.[locale]?.name || linkNameWithTranslate}
                >
                    {linkTranslations?.[locale]?.name || linkNameWithTranslate}
                </a>
            }
        </React.Fragment>
    );
};

export default MenuWidgetItemLink;

