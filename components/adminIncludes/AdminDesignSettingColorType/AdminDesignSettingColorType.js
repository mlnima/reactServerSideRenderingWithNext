import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';


const AdminDesignSettingColorType = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});

    const onChangeHandler = e=>{
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className='AdminDesignSettingColorType'>
                <div className="adminDesignSectionItems">
                    <div className="adminDesignSectionItem">
                        <p className='adminDesignSectionItemTitle'>{ props.positionName.replace(/([A-Z])/g, " $1") } :</p>
                        <input name={ props.positionName } value={ contextData.siteDesign[props.positionName] } onChange={ e => onChangeHandler(e) }/>
                        <div className="previewColor" style={ {
                            background: [contextData.siteDesign[props.positionName]]
                        } }/>
                    </div>
                </div>
        </div>
    );
};
export default AdminDesignSettingColorType;
