import {FC} from "react";
import Link from "next/link";
import {MenuItem} from "typescript-types";
import './MenuWidgetItem.styles.scss'

interface MenuWidgetItemPropTypes {
    menuItem: MenuItem,
    setOpen: any,
    targetUrl: string,
    dictionary: {
        [key: string]: string
    }
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> = ({menuItem, setOpen, dictionary,targetUrl}) => {

    return (
        <div className={'menuItem'}>
            <Link href={targetUrl}
                  className={`menu-item-link`}
                  target={menuItem.target.includes('http') ? '_blank' : '_self'}
                  title={dictionary?.[menuItem.name] || menuItem.name || ''}
                  onClick={() => setOpen(false)}>
                {dictionary?.[menuItem.name] || menuItem.name || ''}
            </Link>
        </div>
    )
};

export default MenuWidgetItem;