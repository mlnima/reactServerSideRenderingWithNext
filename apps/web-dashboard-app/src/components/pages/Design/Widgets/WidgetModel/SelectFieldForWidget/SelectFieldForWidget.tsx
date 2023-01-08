import styled from "styled-components";
import React from "react";

const SelectFieldForWidgetStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    width: 50%;
    margin: 0;
  }
`

interface selectFieldTypes {
    title: string,
    name: string,
    value?: string | boolean | number | any,
    options: string[] | number[]
    onChangeHandler: any
}

const SelectFieldForWidget = (props: selectFieldTypes) => {

    return (
        <SelectFieldForWidgetStyledDiv className='selectFieldForWidget'>
            <p>{props.title}</p>
            <select name={props.name} onChange={e => props.onChangeHandler(e)} value={props.value}
                    className={'custom-select'} placeholder={'post type'}>
                <option value=''>select</option>
                {props.options.map((option: string | number, index: number) => {
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
