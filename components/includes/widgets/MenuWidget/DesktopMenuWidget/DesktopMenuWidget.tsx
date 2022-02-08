import {FC} from "react";
import styled from "styled-components";
import DesktopMenuWidgetItem from "./DesktopMenuWidgetItem";
import {MenuItem} from "../../../../../_variables/TypeScriptTypes/WidgetsInterfaces";

const DesktopMenuWidgetStyledUl = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style-type: none;
  padding: 0;
`

interface DesktopMenuWidgetPropTypes {
    menuItemsInOrder: MenuItem[]
    mobileNavigationOnClickHandler:any
}

const DesktopMenuWidget: FC<DesktopMenuWidgetPropTypes> = ({menuItemsInOrder,mobileNavigationOnClickHandler}) => {

    return (
        <DesktopMenuWidgetStyledUl>
            {menuItemsInOrder.map(menuItem => <DesktopMenuWidgetItem menuItem={menuItem} mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}/>)}
        </DesktopMenuWidgetStyledUl>
    )
};
export default DesktopMenuWidget
