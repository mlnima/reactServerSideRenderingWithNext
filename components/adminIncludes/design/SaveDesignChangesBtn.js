import React from 'react';
import {updateSetting} from '../../../store/actions/settingsActions'
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../store/actions/globalStateActions";
// import {useRouter} from "next/router";

const SaveDesignChangesBtn = ({reload,editorRef,name}) => {
    const dispatch = useDispatch()
    const design = useSelector(state => state?.settings.design)
    // const router = useRouter()

    const onSaveHandler = () => {
        console.log(editorRef?.current?.getValue())
        dispatch(setLoading(true))
        dispatch(updateSetting('design', {
            ...design,
            [name]:editorRef?.current?.getValue()
        }))

    };

    return (
        <button className='save-design-btn' onClick={() => onSaveHandler()}>
            Save Changes
        </button>
    );
};
export default SaveDesignChangesBtn;
