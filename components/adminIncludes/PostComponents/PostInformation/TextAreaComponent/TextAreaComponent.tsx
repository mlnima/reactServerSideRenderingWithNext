import convertVariableNameToName from "../../../../../_variables/util/convertVariableNameToName";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const TextAreaComponent = props => {
    const post = useSelector((store: Store) => store?.adminPanelPosts.post);
    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName(props.name)}</p>
                </div>
                <div className="editor">
                    <textarea className='form-control-input' name={props.name} value={post[props.name] || ''}
                              onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null

};

export default TextAreaComponent;
