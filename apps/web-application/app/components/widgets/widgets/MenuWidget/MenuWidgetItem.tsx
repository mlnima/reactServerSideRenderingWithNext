"use client"
import {FC} from "react";
import Link from "next/link";
import {MenuItem} from "@repo/typescript-types";
import './MenuWidgetItem.scss'
import SvgRenderer from "@components/global/SVGRenderer/SVGRenderer";

interface MenuWidgetItemPropTypes {
    menuItem: MenuItem,
    onCloseBurgerMenuHandler: () => void,
    targetUrl: string,
    title: string,
    burgerMenuOnDesktop: boolean
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> =
    ({
         menuItem,
         onCloseBurgerMenuHandler,
         targetUrl,
         title,
         burgerMenuOnDesktop
     }) => {
        return (
            <div className={`menuItem${burgerMenuOnDesktop ? ' menuItemBurger' : ' menuItemExpanded'}`}>
                <div className={'menuItemWrapper'}>
                    <Link href={targetUrl}
                          className={`menuItemLink`}
                          target={menuItem.target.includes('http') ? '_blank' : '_self'}
                          title={title}
                          onClick={onCloseBurgerMenuHandler}>
                    {
                        !!menuItem?.icon &&
                        <SvgRenderer customClassName={'menuItemIcon'} svgUrl={
                            menuItem?.icon.startsWith('http') ||
                            menuItem?.icon.startsWith('/public') ?
                                menuItem.icon :
                                `/asset/images/icons/${menuItem.icon}.svg`
                        }
                                     size={20}
                        />
                    }

                        {title}
                    </Link>
                </div>

            </div>
        )
    };

export default MenuWidgetItem;