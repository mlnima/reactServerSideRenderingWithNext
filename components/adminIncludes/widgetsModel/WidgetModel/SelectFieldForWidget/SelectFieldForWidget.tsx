import React, {useEffect} from 'react';
//import convertVariableNameToName from "../../../../../_variables/util/convertVariableNameToName";
import styled from "styled-components";
const SelectFieldForWidgetStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  select {
    // width: 100px;
  }

  p {
    width: 50%;
    margin: 0;
  }
`
interface selectFieldTypes {
    title: string,
    name: string,
    value?: string | boolean | number | any,
    ref: React.RefObject<HTMLSelectElement>,
    options: string[]
    onChangeHandler: any
}




const SelectFieldForWidget = (props: selectFieldTypes) => {

    return (
        <SelectFieldForWidgetStyledDiv className='selectFieldForWidget'>
            <p>{props.title}</p>
            <select ref={props.ref} name={props.name} onChange={e => props.onChangeHandler(e)} value={props.value} className={'custom-select'} placeholder={'post type'}>
                {props.options.map((option: string, index: number) => {
                    return (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    )
                })}
            </select>
        </SelectFieldForWidgetStyledDiv>

    );
};
export default SelectFieldForWidget;
