import React, { useContext } from 'react';
import { updateSetting } from '../../../_variables/ajaxVariables'
import { AppContext } from '../../../context/AppContext'

const SaveDesignChangesBtn = props => {
    const contextData = useContext(AppContext);

    const onSaveHandler = e => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        updateSetting('design', contextData.siteDesign).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    };

    return (
        <button className='save-design-btn' onClick={ () => onSaveHandler() }>Save Changes</button>
    );
};
export default SaveDesignChangesBtn;
