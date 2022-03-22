import styled from "styled-components";
import {FC} from "react";

const DropDownWidgetStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  padding: 10px;

  .post-drop-down-section-header {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 1px;
    background-color: white;
  }

  .post-drop-down-component {
    padding: 10px;
    width: 100%;
    background-color: white;
  }
`

interface DropDownWidgetPropType{
    title:string,
    component:any,
    type?:string
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