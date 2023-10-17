import {FC} from "react";
import Link from "next/link";
import {MenuItem} from "typescript-types";
import './MenuWidgetItem.scss'

interface MenuWidgetItemPropTypes {
    menuItem: MenuItem,
    setOpen: any,
    targetUrl: string,
    title: string,
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> = ({menuItem, setOpen, targetUrl, title}) => {

    return (
        <div className={'menuItem'}>
            <Link href={targetUrl}
                  className={`menu-item-link`}
                  target={menuItem.target.includes('http') ? '_blank' : '_self'}
                  title={title}
                  onClick={() => setOpen(false)}>
                {title}
            </Link>
        </div>
    )
};

export default MenuWidgetItem;