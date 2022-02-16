import {FC, useState} from "react";
import styled from "styled-components";
import {MenuItem} from "../../../../../_variables/TypeScriptTypes/WidgetsInterfaces";
import MobileMenuWidgetItem from "./MobileMenuWidgetItem";

const MobileMenuWidgetStyledDiv = styled.div`
   background-color: var(--navigation-background-color, #18181b);
   z-index: 10;
  .navigation-mobile-button-open {
    margin: 0;
    padding: 6px 12px;
    width: 20px;
    height: 20px;
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
    ${(props: { open: boolean }) => props?.open ? `animation: navigationMobileSlide .2s linear alternate;` : `animation: none;`};
    display: ${(props: { open: boolean }) => props.open ? 'flex' : 'none'};
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
      margin-bottom: 20px;
      color: var(--navigation-text-color, #ccc);
      padding: 12px;

      .navigation-mobile-button-logo {
        width: 24px;
        height: 24px;
        padding: 6px 12px;
        background-color: var(--navigation-text-color, #ccc);
        mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
        -webkit-mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
      }
    }
  }
  
`
interface MobileMenuWidgetPropTypes {
    menuItemsInOrder: MenuItem[]
    mobileNavigationOnClickHandler:any
}

const MobileMenuWidget: FC<MobileMenuWidgetPropTypes> = ({menuItemsInOrder,mobileNavigationOnClickHandler}) => {

    const [open, setOpen] = useState(false);

    return (
        <MobileMenuWidgetStyledDiv open={open}>
            <ul onClick={() => open ? setOpen(false) : setOpen(true)}
                className='navigation-mobile-button-open btn btn-transparent-light'
                aria-label="Center Align">
            </ul>
            <ul className='menu-widget-items'>
                <li onClick={() => open ? setOpen(false) : setOpen(true)}
                    className='navigation-close-button btn btn-transparent-light'>
                    <span className='navigation-mobile-button-logo'/>
                </li>
                {menuItemsInOrder.map(menuItem=><MobileMenuWidgetItem menuItem={menuItem} key={menuItem.itemIndex} setOpen={setOpen} mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}/>)}
            </ul>
        </MobileMenuWidgetStyledDiv>
    )
};
export default MobileMenuWidget
