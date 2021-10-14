import React, { useContext } from 'react';
import { updateSetting } from '../../../_variables/ajaxVariables'
import { AppContext } from '../../../context/AppContext'

const SaveDesignChangesBtn = ({name,value}) => {
    const contextData = useContext(AppContext);

    const onSaveHandler = e => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })

        const designToSave={
            ...contextData.siteDesign,
            [name]:value
        }



        updateSetting('design', designToSave).then(() => {
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
