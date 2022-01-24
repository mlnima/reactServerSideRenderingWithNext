import {useEffect, useState, useMemo} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {checkRouteAndSetLoading} from "../../../../store/actions/globalStateActions";
import {FC} from "react";

const MenuWidgetItem = dynamic(() => import('./MenuWidgetItem'));

const MenuWidgetStyledDiv = styled.div`
  background-color: var(--navigation-background-color, #18181b);
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;

  .navigation-mobile-button-open {
    margin: 0;
    padding: 0;
    width: 24px;
    height: 24px;
    background-color: var(--navigation-text-color, #ccc);
    mask: url('/public/asset/images/icons/bars-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/bars-solid.svg') no-repeat center;
  }

  .menu-widget-items {
    background-color: var(--navigation-background-color, #18181b);
    top: 0;
    left: 0;
    bottom: 0;
    width: 90%;
    z-index: 1000;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    align-items: center;
    margin: 0;
    transition: all 0.5s ease 0s;
    position: fixed;
    ${(props:{open:boolean}) => props?.open ? `animation: navigationMobileSlide .3s linear alternate;` : `animation: none;`};
    display: ${(props:{open:boolean}) => props.open ? 'flex' : 'none'};
    overflow-y: auto;

    .navigation-close-button {
      align-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      width: 40px;
      height: 40px;
      color: var(--navigation-text-color, #ccc);
      padding: 12px;

      .navigation-mobile-button-logo {
        width: 24px;
        height: 24px;
        background-color: var(--navigation-text-color, #ccc);
        mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
        -webkit-mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    background-color: transparent;
    .menu-widget-items {
      background-color: transparent;
      display: flex;
      align-items: center;
      flex-direction: row;
      width: initial;
      max-width: 100vw;
      position: initial;
      animation: initial;
      padding: 0;
      margin: 0;
      height: 56px;
      overflow-y: initial;

      .navigation-close-button {
        display: none;
      }
    }

    .navigation-mobile-button-open {
      display: none;
    }

  }
`
interface MenuWidgetPropTypes{
    menuItems:[]
}

const MenuWidget:FC<MenuWidgetPropTypes> = ({menuItems}) => {

    const dispatch = useDispatch()
    const asPath = useRouter()?.asPath
    const query = useRouter()?.query
    const locale = useRouter()?.locale
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.innerWidth >= 768 ? setOpen(true) : setOpen(false)
        }
    }, []);

    const mobileNavigationOnClickHandler = (nextPath) => {
        dispatch(checkRouteAndSetLoading(asPath, nextPath))
    }
    const renderMenuItemsData = useMemo(() => menuItems.sort((a:{itemIndex:number}, b:{itemIndex:number}) => a.itemIndex > b.itemIndex ? 1 : -1) || [], [])
    const renderMenuParentsItems = useMemo(() => renderMenuItemsData.filter(i => !i.parent), [])

    const renderMenuItems = renderMenuParentsItems.map((menuItem, index) => {
        const linkAsForMenuItems = (locale || query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? menuItem.as :
            (!locale && !query.locale) ? menuItem.as :
                `/${locale || query.locale}${menuItem.as}`;
        return (
            <MenuWidgetItem
                menuItem={menuItem}
                linkAsForMenuItems={linkAsForMenuItems}
                mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}

                key={index}
            />
        )
    })


    return (
        <MenuWidgetStyledDiv className='menu-widget' open={open}>
            <ul onClick={() => open ? setOpen(false) : setOpen(true)}
                className='navigation-mobile-button-open btn btn-transparent-light'
                aria-label="Center Align">
            </ul>
            <ul className='menu-widget-items' >
                <li onClick={() => open ? setOpen(false) : setOpen(true)}
                    className='navigation-close-button btn btn-transparent-light'>
                    <span className='navigation-mobile-button-logo'/>
                </li>
                {renderMenuItems}
            </ul>
        </MenuWidgetStyledDiv>
    );
};
export default MenuWidget;



