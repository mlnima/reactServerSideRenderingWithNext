"use client"
import React, {FC, memo, useState} from "react";
import './MenuWidget.styles.scss'
import {MenuItem} from "typescript-types";
import MenuWidgetItem from "@components/widgets/widgets/MenuWidget/MenuWidgetItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";

interface MenuWidgetPropTypes {
    menuItems: MenuItem[],
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const MenuWidget: FC<MenuWidgetPropTypes> = ({menuItems, dictionary, locale}) => {

    const [open, setOpen] = useState(false);

    const renderMenuItems = [
        ...menuItems?.filter((menuItem: MenuItem) => !menuItem.parent)
            ?.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1)]
        .map(menuItem => {

            const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

            const targetUrl = menuItem.target.includes('http') ? menuItem.target :
                locale === defaultLocale ? menuItem.target : `/${locale}${menuItem.target}`;

            return (
                <MenuWidgetItem menuItem={menuItem}
                                title={menuItem?.translations?.[locale]?.name ||
                                    dictionary?.[menuItem.name] ||
                                    menuItem.name || ''}
                                // title={'ddd'}
                                targetUrl={targetUrl}
                                key={menuItem.itemIndex}
                                setOpen={setOpen}

                />
            )
        })


    return (
        <div className={`menu-widget ${open ? 'menu-widget-open' : 'menu-widget-closed'}`}>

            <button onClick={() => setOpen(!open)}
                    className='menu-widget-open-button btn btn-transparent-light'
                    aria-label="open navigation">
                <FontAwesomeIcon className={'menu-widget-close-button-logo'}
                                 color={'var(--primary-text-color,#fff)'}
                                 icon={faBars}
                                 style={{width: 28, height: 28}}/>

            </button>
            <div className='menu-widget-items'>

                <button onClick={() => setOpen(!open)}
                        className='menu-widget-close-button btn btn-transparent-light'>
                    <FontAwesomeIcon className={'menu-widget-close-button-logo'}
                                     color={'var(--primary-text-color,#fff)'}
                                     icon={faXmark}
                                     style={{width: 25, height: 25}}/>
                </button>
                {renderMenuItems}
            </div>
        </div>
    )

};
export default memo(MenuWidget);