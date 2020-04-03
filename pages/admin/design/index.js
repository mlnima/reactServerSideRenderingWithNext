import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import settings from '../settings/general'
import { getSetting } from '../../../_variables/ajaxVariables'
import './design.scss'
const design = props => {
    const [ state, setState ] = useState({
        topBarBackgroundColor:props.design.topBarBackgroundColor || '#181818',
        topBarTextColor:props.design.topBarTextColor || '#fff',
    });
    useEffect(() => {
    }, []);


    const onChangeHandler = e =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }


    return (
        <AdminLayout>
            <div className='adminDesign'>
                <div className="adminDesignSection">
                    <h2>Top Bar:</h2>
                    <div className="adminDesignSectionItems">
                        <p>Top Bar Background Color</p>
                        <input name='topBarBackgroundColor' value={state.topBarBackgroundColor} onChange={e=>onChangeHandler(e)}/>
                        <div className="previewColor" style={{backgroundColor:state.topBarBackgroundColor}}/>
                        <p>Top Bar Text Color</p>
                        <input name='topBarTextColor' value={state.topBarTextColor} onChange={e=>onChangeHandler(e)}/>
                        <div className="previewColor" style={{backgroundColor:state.topBarTextColor}}/>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

design.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let design;
    const designData = await getSetting('design');
    design = designData.data.setting ? designData.data.setting.data : {}
    return { design }
}
export default design;
