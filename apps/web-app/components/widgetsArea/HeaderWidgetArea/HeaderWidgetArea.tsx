import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

let HeaderWidgetAreaStyle = styled.div`
  grid-area: header;
  background-color: var(--secondary-background-color, #181818);
  
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
  
  ${(props: { stylesData: string }) => props.stylesData ?? ''}
`

const HeaderWidgetArea = () => {
    const headerStyle = useSelector(({settings}: Store) => settings?.design?.headerStyle)

    return (
        <HeaderWidgetAreaStyle stylesData={headerStyle || ''} className={'widget-area header'}>
            <div className='header-content'>
                <WidgetsRenderer position={'header'}/>
            </div>

        </HeaderWidgetAreaStyle>
    );
};
export default memo(HeaderWidgetArea);
