import {FC} from "react";
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";
import {MenuItem} from "typescript-types";

interface MenuWidgetItemPropTypes {
    menuItem:MenuItem,
    setOpen:any,
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> = ({menuItem, setOpen}) => {

    const {t} = useTranslation('common');

    // const linkNameWithTranslate = useMemo(() => {
    //     return   t(`common:${menuItem.name}`, {},
    //         {fallback:t(`customTranslation:${menuItem.name}`,{},
    //                 {fallback:menuItem.name})})
    //
    //
    // }, [lang])
    const linkNameWithTranslate = t(`common:${menuItem.name}`, {},
        {fallback:t(`customTranslation:${menuItem.name}`,{},
                {fallback:menuItem.name})})

    return (
        <li className={'menu-item'}>
            <Link href={menuItem.target}
                  className={`menu-item-link block w-full h-14 bg-transparent text-lg font-bold text-center rounded-md 
                  text-[var(--primary-text-color,#fff)]`}
                  target={menuItem.target.includes('http') ? '_blank' : '_self'}
                  title={linkNameWithTranslate}
                  prefetch={false}
                  onClick={()=>setOpen(false)}>
                {linkNameWithTranslate}
            </Link>
        </li>
    )
};

export default MenuWidgetItem;