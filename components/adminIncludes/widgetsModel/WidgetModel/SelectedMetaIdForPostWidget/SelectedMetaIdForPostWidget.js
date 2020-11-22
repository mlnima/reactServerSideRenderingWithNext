import React from 'react';

const SelectedMetaIdForPostWidget = props => {
    return (
        <>
            <p>Selected Meta For Posts:</p>
            <input className='redirectLink' name='selectedMetaForPosts' placeholder='Enter the meta ID'
                        value={props.widgetData.selectedMetaForPosts}
                        onChange={e => props.onChangeHandler(e)}/>
        </>
    )
};
export default SelectedMetaIdForPostWidget;
