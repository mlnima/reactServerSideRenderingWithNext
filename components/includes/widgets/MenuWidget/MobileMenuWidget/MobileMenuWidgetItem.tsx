import {FC, useMemo} from "react";
import styled from "styled-components";
import {MenuItem} from "../../../../../_variables/TypeScriptTypes/WidgetsInterfaces";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import Link from "next/link";

const MobileMenuWidgetItemPropTypesStyledLi = styled.li`
  list-style-type: none;
  width: 100%;
  .menu-item{
    color: var(--navigation-text-color, #ccc);
    background-color: transparent;
    font-weight: bold;
    font-size: 5vw;
    text-decoration: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 56px;
  }
`

interface MobileMenuWidgetItemPropTypes {
    menuItem:MenuItem,
    setOpen:any,
    mobileNavigationOnClickHandler:any
}

const MobileMenuWidgetItem: FC<MobileMenuWidgetItemPropTypes> = ({menuItem,setOpen,mobileNavigationOnClickHandler}) => {
    const {t} = useTranslation(['common', 'customTranslation']);

    const {locale} = useRouter()

    const linkNameWithTranslate = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            menuItem.name :
            t([t(menuItem.name, {ns: 'common'}), t(menuItem.name, {ns: 'customTranslation'})])
    }, [])

    const onClickHandler = ()=>{
        setOpen(false)
        mobileNavigationOnClickHandler()
    }

    return (
        <MobileMenuWidgetItemPropTypesStyledLi>
            <Link href={menuItem.target}>
                <a className={'menu-item'} title={linkNameWithTranslate} onClick={onClickHandler}>
                    {linkNameWithTranslate}
                </a>
            </Link>
        </MobileMenuWidgetItemPropTypesStyledLi>
    )
};
export default MobileMenuWidgetItem
