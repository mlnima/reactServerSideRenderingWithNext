import {FC, useMemo} from "react";
import styled from "styled-components";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {MenuItem} from "@_variables/TypeScriptTypes/WidgetsInterfaces";

const DesktopMenuWidgetItemStyledLi = styled.li`
  color: var(--navigation-text-color, #ccc);

  .menu-widget-item {
    padding: 6px 12px;
    color: var(--navigation-text-color, #ccc);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }
`

interface DesktopMenuWidgetItemPropTypes {
    menuItem: MenuItem,
    mobileNavigationOnClickHandler: any
}

const DesktopMenuWidgetItem: FC<DesktopMenuWidgetItemPropTypes> =
    ({
         menuItem,
         mobileNavigationOnClickHandler
    }) => {

    const {t} = useTranslation(['common', 'customTranslation']);

    const {locale,asPath} = useRouter()

    const isActivePage = useMemo(() => {
        return asPath === '/' && menuItem.target === '/' ? true :
               menuItem.target !== '/' && asPath.includes(menuItem.target)
    }, [asPath])

    const linkNameWithTranslate = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            menuItem.name :
            t<string>([t<string>(menuItem.name, {ns: 'common'}), t<string>(menuItem.name, {ns: 'customTranslation'})])
    }, [])

    return (
        <DesktopMenuWidgetItemStyledLi className={isActivePage ? 'active-link' : ''}>
            <Link href={menuItem.target}>
                <a className={`menu-widget-item`}
                   target={menuItem.target.includes('http') ? '_blank' : '_self'}
                   title={linkNameWithTranslate}
                   onClick={mobileNavigationOnClickHandler}>

                    {linkNameWithTranslate}

                </a>
            </Link>
        </DesktopMenuWidgetItemStyledLi>
    )
};
export default DesktopMenuWidgetItem
