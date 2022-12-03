import {FC, useMemo} from "react";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router";
import Link from "next/link";
import {MenuItem} from "typescript-types";

interface MenuWidgetItemPropTypes {
    menuItem:MenuItem,
    setOpen:any,
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> = ({menuItem, setOpen}) => {

    const {t,lang} = useTranslation('event');
    const {locale} = useRouter()

    const linkNameWithTranslate = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            menuItem.name :
            t(`common:${menuItem.name}`, {},
             {fallback:t(`customTranslation:${menuItem.name}`,{},
                     {fallback:menuItem.name})})

    }, [lang])

    return (
        <div className={'menu-item'}>
            <Link href={menuItem.target}
                  className={'menu-item-link'}
                  target={menuItem.target.includes('http') ? '_blank' : '_self'}
                  title={linkNameWithTranslate}
                  onClick={()=>setOpen(false)}>
                    {linkNameWithTranslate}
            </Link>
        </div>
    )
};

export default MenuWidgetItem;