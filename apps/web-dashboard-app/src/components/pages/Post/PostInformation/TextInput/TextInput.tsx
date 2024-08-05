import {convertVariableNameToName} from "@repo/shared-util";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {DashboardStore, Store} from "@repo/typescript-types";
import {FC} from "react";

let StyledTextarea = styled.textarea`
  outline: none;
  padding: 3px 5px;
  height: 30px;
  width: 90%;
`

interface PropTypes{
    onChangeHandler:Function,
    rendering:boolean
    name:string,
}
const TextInput:FC<PropTypes> = props => {
    const post = useSelector(({posts}: DashboardStore) => posts.post);
    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName(props.name)}</p>
                </div>
                <div className="editor">
                    {/*//@ts-ignore*/}
                    <StyledTextarea className={'primaryInput'} name={props.name} value={post[props.name] || ''}
                                    onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null

};
export default TextInput;