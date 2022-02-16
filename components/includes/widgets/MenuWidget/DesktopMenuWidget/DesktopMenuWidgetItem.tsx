import {FC, useEffect, useMemo} from "react";
import styled from "styled-components";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {MenuItem} from "../../../../../_variables/TypeScriptTypes/WidgetsInterfaces";

const DesktopMenuWidgetItemStyledLi = styled.li`
  color: var(--navigation-text-color, #ccc);

  .menu-widget-item {
    padding: 6px 12px;
    color: var(--navigation-text-color, #ccc);
  }
`

interface DesktopMenuWidgetItemPropTypes {
    menuItem: MenuItem,
    mobileNavigationOnClickHandler: any
}

const DesktopMenuWidgetItem: FC<DesktopMenuWidgetItemPropTypes> = ({menuItem, mobileNavigationOnClickHandler}) => {

    const {t} = useTranslation(['common', 'customTranslation']);

    const {locale,asPath} = useRouter()

    const isActivePage = useMemo(() => {
        return asPath === '/' && menuItem.target === '/' ? true :
               menuItem.target !== '/' && asPath.includes(menuItem.target)
    }, [asPath])

    const linkNameWithTranslate = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            menuItem.name :
            t([t(menuItem.name, {ns: 'common'}), t(menuItem.name, {ns: 'customTranslation'})])
    }, [])

    return (
        <DesktopMenuWidgetItemStyledLi>
            <Link href={menuItem.target}>
                <a className={`menu-widget-item${isActivePage ? ' active-link' : ''}`} title={linkNameWithTranslate}
                   onClick={mobileNavigationOnClickHandler}>
                    {linkNameWithTranslate}
                </a>
            </Link>
        </DesktopMenuWidgetItemStyledLi>
    )
};
export default DesktopMenuWidgetItem
