import React, {FC} from "react";
import styled from "styled-components";
import MenuWidgetItemLink from "./MenuWidgetItemLink";
const MenuWidgetSubItemStyledLi = styled.li`
  .menu-widget-item-link {
    display: ${({showSub}: { showSub: boolean }) => showSub ? 'initial' : 'none'};
    z-index: 10;
    background-color: var(--navigation-background-color, #18181b);
    width: 100px;
    list-style-type: none;
    padding: 10px 15px;
  }

  @media only screen and (min-width: 768px) {
    .menu-widget-sub-item {
      background-color: transparent;
    }
  }
`

interface MenuWidgetSubItemPropTypes {
    showSub: boolean,
    name: string,
    type: string,
    target: string,
    translations: {},
    mobileNavigationOnClickHandler: any,
}

const MenuWidgetSubItem: FC<MenuWidgetSubItemPropTypes> = ({
                                                               showSub,
                                                               name,
                                                               type,
                                                               target,
                                                               translations,
                                                               mobileNavigationOnClickHandler
                                                           }) => {
    return (
        <MenuWidgetSubItemStyledLi showSub={showSub}>
            <MenuWidgetItemLink
                linkTargetType={type}
                // linkType='sub'
                linkTargetUrl={target}
                linkName={name}
                linkTranslations={translations}
                // showSub={showSub}
                mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}
            />
        </MenuWidgetSubItemStyledLi>
    )
};
export default MenuWidgetSubItem
