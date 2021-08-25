import { convertVariableNameToName } from '../../../../../_variables/_variables'

const TextAreaComponent = props => {

    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName( props.name)}</p>
                </div>
                <div className="editor">
                    <textarea  className='textareaInput' name={ props.name } value={props.postData[props.name]}  onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    }else return null

};
export default TextAreaComponent;
