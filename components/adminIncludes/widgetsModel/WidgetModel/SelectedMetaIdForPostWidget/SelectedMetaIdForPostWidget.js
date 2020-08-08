import React, {useEffect, useState, useContext, useRef} from 'react';
import {DelayInput} from "react-delay-input";

const SelectedMetaIdForPostWidget = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <>
            <p>Selected Meta For Posts:</p>
            <DelayInput className='redirectLink' name='selectedMetaForPosts' placeholder='Enter the meta ID'
                        value={props.widgetData.data.selectedMetaForPosts} delayTimeout={1000}
                        onChange={e => props.onChangeHandler(e)}/>
        </>
    )
};
export default SelectedMetaIdForPostWidget;
