import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";

import { saveCustomStyle, getSetting, updateSetting } from '../../../_variables/ajaxVariables'

import { AppContext } from '../../../context/AppContext'
import { getAbsolutePath } from '../../../_variables/_variables'

const design = props => {
    const contextData = useContext(AppContext);
    const [ colors, setColors ] = useState({
        themeColor: props.design.themeColor || '',
    });

    const renderColorsFields = Object.keys(colors).map(element => {
        return (
            <div key={ element } className="adminDesignSection">
                <div className="adminDesignSectionItems">
                    <div className="adminDesignSectionItem">
                        <p className='adminDesignSectionItemTitle'>{ element.replace(/([A-Z])/g, " $1") } :</p>
                        <input name={ element } value={ colors[element] } onChange={ e => onChangeHandler(e) }/>
                        <div className="previewColor" style={ { backgroundColor: colors[element] } }/>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <AdminLayout>
            <form className='adminDesign' onSubmit={ e => onSubmitHandler(e) }>

                <div className='colorsContent'>
                    { renderColorsFields }
                </div>
                <button className='submitBtn' type='submit'>Save Colors</button>
            </form>
        </AdminLayout>
    );
};

export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let design;
    let customStyles;
    const designData = await getSetting('design', domainName, false);
    const customStylesData = await getSetting('customStyle', domainName, false);

    design = designData.data.setting ? designData.data.setting.data : {}
    customStyles = customStylesData.data.setting ? customStylesData.data.setting : {}
    return {props:{ design, customStyles }}
}

export default design;
