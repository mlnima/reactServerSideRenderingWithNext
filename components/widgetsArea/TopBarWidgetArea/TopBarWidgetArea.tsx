import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useSelector} from "react-redux";

let StyledDiv = styled.div`
  grid-area: topbar;
  background-color: var(--topbar-background-color, #000);
  height: 56px;
  display: flex;
  align-items: center;

  .top-bar-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 5px;
    padding: 0 5px;
    width: 100%;
    height: 100%;
  }
  ${(props: { stylesData: string }) => props.stylesData || ''}
`

const TopBarWidgetArea = () => {
    const topBarStyle = useSelector(({settings}: StoreTypes) => settings?.design?.topBarStyle)
    return (
        <StyledDiv stylesData={topBarStyle || ''} className={'widget-area topbar'}>
            <div className='top-bar-content'>
                <WidgetsRenderer position={'topBar'}/>
            </div>
        </StyledDiv>
    );
};
export default TopBarWidgetArea;
