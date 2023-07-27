import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";

let StyledNavigation = styled.nav`
  grid-area: navigation;
  background-color: var(--secondary-background-color,#181818);
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  
  .navigation-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
 
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  @media only screen and (min-width: 768px) {
    .navigation-content {
      align-items: center;
    }
  }
`

const NavigationWidgetArea = () => {

    return (
            <StyledNavigation className={'widget-area navigation'}>
                <div className='navigation-content'>
                    <WidgetsRenderer position={'navigation'}/>
                </div>
            </StyledNavigation>
    );
};
export default memo(NavigationWidgetArea);
