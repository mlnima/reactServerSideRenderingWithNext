import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";

let StyledDiv = styled.div`
  grid-area: topbar;
  height: 56px;
  display: flex;
  align-items: center;
  background-color: var(--secondary-background-color,#181818);

  .top-bar-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 8px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
`

const TopBarWidgetArea = () => {
    return (
        <StyledDiv className={'widget-area topbar'}>
            <div className='top-bar-content'>
                <WidgetsRenderer position={'topBar'}/>
            </div>
        </StyledDiv>
    );
};
export default memo(TopBarWidgetArea);
