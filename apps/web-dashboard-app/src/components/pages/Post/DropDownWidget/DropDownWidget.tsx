import styled from "styled-components";
import {FC} from "react";

const DropDownWidgetStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  padding: 10px;
  background-color: var(--secondary-background-color,#181818);
  color: var(--secondary-text-color,#ccc);

  .post-drop-down-section-header {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 1px;
  }

  .post-drop-down-component {
    padding: 10px;
    width: 100%;
  }
`

interface DropDownWidgetPropType{
    title:string|undefined,
    component:any,
    type?:string|undefined
}
const DropDownWidget:FC<DropDownWidgetPropType> = (props) => {
    return (
        <DropDownWidgetStyledDiv className='post-drop-down-section'>
            <div className='post-drop-down-section-header'>
                <p className='post-drop-down-section-header-title'>{props.title}</p>
            </div>
            <div className="post-drop-down-component">
                {/*//@ts-ignore*/}
                <props.component {...props}/>
            </div>
        </DropDownWidgetStyledDiv>
    );

};
export default DropDownWidget;