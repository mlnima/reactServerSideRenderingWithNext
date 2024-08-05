"use client"
import React, {FC, useEffect, useRef, useState} from "react";
import {MenuItem, UniqueDataTypes} from "@repo/typescript-types";
import MenuWidgetItem from "@components/widgets/widgets/MenuWidget/MenuWidgetItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import dynamic from "next/dynamic";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setBackgroundFilter} from "@store/reducers/globalStateReducer";
import './MenuWidget.scss';
import Csr from "@components/global/Csr";

const Logo = dynamic(() => import('../Logo/Logo'))

interface MenuWidgetPropTypes {
    menuItems: MenuItem[],
    locale: string,
    uniqueData: UniqueDataTypes
    dictionary: {
        [key: string]: string
    }
}

const MenuWidget: FC<MenuWidgetPropTypes> =
    ({
         menuItems,
         dictionary,
         locale,
         uniqueData
     }) => {

        const [open, setOpen] = useState(false);
        const dispatch = useAppDispatch()
        const MenuWidgetRef = useRef(null)
        const {backgroundFilter} = useAppSelector(({globalState}) => globalState);

        const {
            logoUrl,
            logoWidth,
            logoHeight
        } = useAppSelector(({settings}) => settings?.initialSettings?.layoutSettings);

        useEffect(() => {
            if (!backgroundFilter && open) {
                setOpen(false)
            }
        }, [backgroundFilter]);

        const onOpenBurgerMenuHandler = () => {
            if (typeof window !== 'undefined') {
                if ((uniqueData?.burgerMenuOnDesktop || window.innerWidth < 1025)) {
                    dispatch(setBackgroundFilter(true))
                }
            }
            setOpen(true)
        }
        const onCloseBurgerMenuHandler = () => {
            if (typeof window !== 'undefined') {
                if ((uniqueData?.burgerMenuOnDesktop || window.innerWidth < 1025)) {
                    dispatch(setBackgroundFilter(false))
                }
            }
            setOpen(false)
        }

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
                                    burgerMenuOnDesktop={uniqueData?.burgerMenuOnDesktop}
                                    targetUrl={targetUrl}
                                    onCloseBurgerMenuHandler={onCloseBurgerMenuHandler}
                                    key={menuItem.itemIndex}
                    />
                )
            })

        return (
            <div ref={MenuWidgetRef}
                 className={`menuWidget ${
                     uniqueData?.burgerMenuOnDesktop ? '' : 'menuWidgetExpanded'
                 } ${
                     open ? 'menuWidgetOpen' : 'menuWidgetClosed'
                 }`}
            >

                <button onClick={onOpenBurgerMenuHandler}
                        className='menuWidgetOpenButton btn btn-transparent-light'
                        aria-label="open navigation">
                    <FontAwesomeIcon color={'var(--primary-text-color,#fff)'}
                                     icon={faBars}
                                     style={{width: 28, height: 28}}/>
                </button>
                <div className={'menuItemsWrapper custom-scroll'} style={{zIndex: open ? 11 : 'initial'}}>
                    <div className={'menuHeader'}>
                        <button onClick={onCloseBurgerMenuHandler}
                                className='menu-widget-close-button btn btn-transparent-light'>
                            <FontAwesomeIcon className={'menu-widget-close-button-logo'}
                                             color={'var(--primary-text-color,#fff)'}
                                             icon={faXmark}
                                             style={{width: 25, height: 25}}/>
                        </button>
                        <Csr>
                            {logoUrl &&
                                <Logo uniqueData={{
                                    logoUrl,
                                    width: (logoWidth || 150) / 2,
                                    height: (logoHeight || 150) / 2
                                }} locale={locale}/>
                            }
                        </Csr>
                    </div>

                    <div className='menuLinks'>
                        {renderMenuItems}
                    </div>

                </div>
            </div>
        )

    };
export default MenuWidget;

