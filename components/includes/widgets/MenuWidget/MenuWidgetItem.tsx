import {FC, useMemo} from "react";
import {MenuItem} from "@_variables/TypeScriptTypes/WidgetsInterfaces";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import Link from "next/link";

interface MenuWidgetItemPropTypes {
    menuItem:MenuItem,
    setOpen:any,
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> = ({menuItem, setOpen}) => {
    const {t} = useTranslation(['common', 'customTranslation']);
    const {locale} = useRouter()

    const linkNameWithTranslate = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            menuItem.name :
            t([t(menuItem.name, {ns: 'common'}), t(menuItem.name, {ns: 'customTranslation'})])
    }, [])

    return (
        <li className={'menu-item'}>
            <Link href={menuItem.target}>
                <a className={'menu-item-link'}
                   target={menuItem.target.includes('http') ? '_blank' : '_self'}
                   title={linkNameWithTranslate}
                   onClick={()=>setOpen(false)}>

                    {linkNameWithTranslate}

                </a>
            </Link>
        </li>
    )
};

export default MenuWidgetItem
