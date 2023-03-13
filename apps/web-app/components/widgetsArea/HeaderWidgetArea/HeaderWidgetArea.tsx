import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";

let HeaderWidgetAreaStyle = styled.div`
  grid-area: header;
  background-color: var(--main-background-color, #000);
  padding: 0 8px;
  box-sizing: border-box;

  .header-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  @media only screen and(min-width: 768px) {
    .header-content {
      margin: 0 5px;
      padding: 0 5px;
    }
  }
`

const HeaderWidgetArea = () => {

    return (
        <HeaderWidgetAreaStyle className={'widget-area header'}>
            <div className='header-content'>
                <WidgetsRenderer position={'header'}/>
            </div>
        </HeaderWidgetAreaStyle>
    );
};
export default memo(HeaderWidgetArea);
