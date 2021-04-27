import { convertVariableNameToName } from '../../../../../_variables/_variables'
import styled from "styled-components";
let StyledDiv = styled.div`
    .editor{
        .textareaInput{
        background-color: #f1f1f1;
        }
    }
`
const TextAreaComponent = props => {

    if (props.rendering){
        return (
            <StyledDiv className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName( props.name)}</p>
                </div>
                <div className="editor">
                    <textarea  className='textareaInput' name={ props.name } value={props.postData[props.name]}  onChange={e => props.onChangeHandler(e)}/>
                </div>
            </StyledDiv>
        );
    }else return null

};
export default TextAreaComponent;
