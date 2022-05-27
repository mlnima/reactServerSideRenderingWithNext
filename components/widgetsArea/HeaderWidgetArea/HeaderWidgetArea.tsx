import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useSelector} from "react-redux";

let HeaderWidgetAreaStyle = styled.div`
  grid-area: header;
  background-color: var(--header-background-color, #000);
  
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
    const headerStyle = useSelector(({settings}: StoreTypes) => settings?.design?.headerStyle)
    return (
        <HeaderWidgetAreaStyle stylesData={headerStyle || ''} className={'widget-area header'}>
            <div className='header-content'>
                <WidgetsRenderer position={'header'}/>
            </div>

        </HeaderWidgetAreaStyle>
    );
};
export default HeaderWidgetArea;
