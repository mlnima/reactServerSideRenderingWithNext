import React from 'react';
import {updateSetting} from '../../../store/actions/settingsActions'
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../store/actions/globalStateActions";

const SaveDesignChangesBtn = ({name, value}) => {
    const dispatch = useDispatch()
    const design = useSelector(state => state.settings.design)

    const onSaveHandler = () => {
        dispatch(setLoading(true))
        dispatch(updateSetting('design', {
            ...design,
            [name]: value
        }))
    };

    return (
        <button className='save-design-btn' onClick={() => onSaveHandler()}>
            Save Changes
        </button>
    );
};
export default SaveDesignChangesBtn;
