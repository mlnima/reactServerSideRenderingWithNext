import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {useSelector} from "react-redux";

let StyledNavigation = styled.nav`
  grid-area: navigation;
  background-color: var(--navigation-background-color,#000);
  height: 56px;
  display: flex;
  align-items: center;
  
  .navigation-content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 5px;
    padding: 0 5px;
    width: 100%;
    height: 100%;
  }
  
  @media only screen and (min-width: 768px){
    .navigation-content{
      align-items: center;
    }
  }
  
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`

const NavigationWidgetArea = () => {
    const navigationStyle = useSelector((store: StoreTypes) => store?.settings?.design?.navigationStyle)
    return (
        <StyledNavigation stylesData={navigationStyle || ''} className={'widget-area navigation'}>
            <div className='navigation-content'>
            <WidgetsRenderer position={'navigation'}/>
            </div>
        </StyledNavigation>
    );
};
export default NavigationWidgetArea;
