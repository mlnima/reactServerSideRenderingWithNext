import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {Store} from "typescript-types";

let StyledNavigation = styled.nav`
  grid-area: navigation;
  background-color: var(--main-background-color, #000);
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

  ${(props: { stylesData: string }) => props.stylesData ?? ''}
`

const NavigationWidgetArea = () => {
    const {pathname} = useRouter()
    const navigationStyle = useSelector(({settings}: Store) => settings?.design?.navigationStyle)

    return (
        <>
            <StyledNavigation stylesData={navigationStyle || ''} className={'widget-area navigation'}>
                <div className='navigation-content'>
                    <WidgetsRenderer position={'navigation'}/>
                </div>
            </StyledNavigation>
        </>
    );
};
export default memo(NavigationWidgetArea);
