import convertVariableNameToName from "../../../../../_variables/util/convertVariableNameToName";
import styled from "styled-components";
import {useSelector} from "react-redux";
let StyledTextarea = styled.textarea`
        outline: none;
        padding: 3px 5px;
        height: 30px;
        width: 90%;
`
const TextInput = props => {
    const post = useSelector((store) => store?.adminPanelPosts.post);
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName( props.name) }</p>
                </div>
                <div className="editor">
                    <StyledTextarea className={'form-control-input'} name={ props.name } value={ post[props.name] || '' }  onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    }else return null

};
export default TextInput;