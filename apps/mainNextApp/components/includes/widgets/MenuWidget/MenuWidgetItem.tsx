import {FC, useMemo} from "react";
// import {useTranslation} from "next-i18next";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router";
import Link from "next/link";
import {MenuItem} from "@_typeScriptTypes/widgets/MenuWidget/MenuItem";

interface MenuWidgetItemPropTypes {
    menuItem:MenuItem,
    setOpen:any,
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> = ({menuItem, setOpen}) => {

    const {t,lang} = useTranslation();
    const {locale} = useRouter()

    const linkNameWithTranslate = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            menuItem.name :
            t(`common:${menuItem.name}`, {},
             {fallback:t(`customTranslation:${menuItem.name}`,{},
                     {fallback:menuItem.name})})

    }, [lang])

    return (
        <li className={'menu-item'}>
            <Link href={menuItem.target}
                  className={'menu-item-link'}
                  target={menuItem.target.includes('http') ? '_blank' : '_self'}
                  title={linkNameWithTranslate}
                  onClick={()=>setOpen(false)}>
                    {linkNameWithTranslate}
            </Link>
        </li>
    )
};

export default MenuWidgetItem

//const {t} = useTranslation(['common', 'customTranslation']);
// const {t} = useTranslation('common');

//t([t(menuItem.name, {ns: 'common'}), t(menuItem.name, {ns: 'customTranslation'})])
// t([t(`common:${menuItem.name}`), t(`customTranslation:${menuItem.name}`)])
//   t(`common:${menuItem.name}`,t(`customTranslation:${menuItem.name}`))