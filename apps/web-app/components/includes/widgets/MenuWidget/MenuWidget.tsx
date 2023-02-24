import React, {FC, useState} from "react";
import {useMemo} from 'react';
import styled from "styled-components";
import MenuWidgetItem from "./MenuWidgetItem";
import {MenuItem} from "typescript-types";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const MenuWidgetStyledDiv = styled.div`
  z-index: 10;

  .menu-widget-open-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;

  }

  .menu-widget-items {
    background-color: var(--secondary-background-color, #181818);
    top: 0;
    left: 0;
    bottom: 0;
    width: 85%;
    z-index: 1000;
    flex-direction: column;
    justify-content: flex-start;
    padding: 50px 0 0 0;
    align-items: flex-start;
    margin: 0;
    transition: all 0.5s ease 0s;
    position: fixed;
    animation: ${(props: { open: boolean }) => props?.open ? `navigationMobileSlide .2s linear alternate` : `none`};
    display: ${(props: { open: boolean }) => props.open ? 'flex' : 'none'};
    overflow-y: auto;

    .menu-widget-close-button {
      position: absolute;
      top: 16px;
      right: 25px;
      align-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      color: var(--main-text-color, #fff);
      padding: 6px;
    }

    .menu-item {
      list-style-type: none;

      width: 100%;

      .menu-item-link {
        color: var(--main-text-color, #fff);
        background-color: transparent;
        font-weight: bold;
        font-size: 1em;
        text-decoration: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 56px;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    width: 100%;
    .menu-widget-open-button {
      display: none;
    }

    .menu-widget-items {
      width: 100%;
      position: initial;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      margin: auto;
      padding: 0;
      transition: none;
      background-color: transparent;

      .menu-widget-close-button {
        display: none;
      }

      .menu-item {
        margin: 0 10px;
        display: block;
        white-space: nowrap;
      }
    }
  }
`

interface MenuWidgetPropTypes {
    menuItems: MenuItem[]
}



const MenuWidget: FC<MenuWidgetPropTypes> = ({menuItems}) => {

    const [open, setOpen] = useState(false);
    const menuItemsInOrder = useMemo(() => {
        return [...menuItems.filter((menuItem: MenuItem) => !menuItem.parent)]
            .sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || [];
    }, [menuItems])

    return (
        <MenuWidgetStyledDiv open={open} className={'menu-widget'}>
            <button onClick={() => setOpen(!open)}
                className='menu-widget-open-button btn btn-transparent-light'
                aria-label="open navigation">
                <SvgRenderer svgUrl={'/asset/images/icons/bars-solid.svg'}
                             size={28}
                             customClassName={'menu-widget-close-button-logo'}
                             color={'var(--main-text-color, #fff)'}/>
            </button>
            <div className='menu-widget-items'>
                <button onClick={() => setOpen(!open)}
                    className='menu-widget-close-button  btn btn-transparent-light'>
                    <SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}
                                 size={25}
                                 customClassName={'menu-widget-close-button-logo'}
                                 color={'var(--main-text-color, #fff)'}/>
                </button>
                {menuItemsInOrder.map(menuItem => {
                    return (
                        <MenuWidgetItem menuItem={menuItem}
                                        key={menuItem.itemIndex}
                                        setOpen={setOpen}
                        />
                    )
                })}
            </div>
        </MenuWidgetStyledDiv>
    )

};
export default MenuWidget;
