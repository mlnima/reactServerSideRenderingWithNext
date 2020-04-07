import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import { AppContext } from '../../../../context/AppContext'
import { DelayInput } from 'react-delay-input'
import './topBar.scss'

const topBar = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        topBarBackgroundColor: '',
        topBarTextColor: ''
    });
    useEffect(() => {
        setState({
            ...state,
            topBarBackgroundColor: contextData.siteDesign.topBarBackgroundColor,
            topBarTextColor: ''
        })
    }, []);

    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            customScript: e.target.value
        })
    }

    return (
        <AdminLayout>
            <div className='topBarSettings'>
                <div className="topBarSettingsSection">
                    <p>Top Bar Background Color :</p>
                    <DelayInput className='topBarSettingsSectionInput' name='topBarBackgroundColor' value={ contextData.siteIdentity.topBarBackgroundColor } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                </div>
            </div>
        </AdminLayout>
    );
};
export default topBar;
