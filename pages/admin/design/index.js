import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import settings from '../settings/general'
import { getSetting, updateSetting } from '../../../_variables/ajaxVariables'
import './design.scss'
import { AppContext } from '../../../context/AppContext'

const design = props => {
    const contextData = useContext(AppContext);
    const [ colors, setColors ] = useState({
        //body
        bodyBackgroundColor: props.design.bodyBackgroundColor || '#000',
        bodyTextColor: props.design.bodyTextColor || '#fff',
        //top bar
        topBarBackgroundColor: props.design.topBarBackgroundColor || '#181818',
        topBarTextColor: props.design.topBarTextColor || '#fff',
        //header
        headerBackgroundColor: props.design.headerBackgroundColor || '#000',
        headerTextColor: props.design.headerTextColor || '#fff',
        //navigation
        navigationBackgroundColor: props.design.navigationBackgroundColor || '#181818',
        navigationTextColor: props.design.navigationTextColor || '#fff',
        //footer
        footerBackgroundColor: props.design.footerBackgroundColor || '#181818',
        footerTextColor: props.design.footerTextColor || '#fff',
        //widgets
        widgetHeaderBackgroundColor: props.design.widgetHeaderBackgroundColor || '#222222',
        widgetHeaderTextColor: props.design.widgetHeaderTextColor || '#fff',
        widgetHeaderRedirectLinkBackgroundColor: props.design.widgetHeaderRedirectLinkBackgroundColor || '#fff',
        widgetHeaderRedirectLinkTextColor: props.design.widgetHeaderRedirectLinkTextColor || '#fff',
        widgetBodyBackgroundColor: props.design.widgetBodyBackgroundColor || 'transparent',
        widgetBodyTextColor: props.design.widgetBodyTextColor || '#fff',
        widgetBodyBorder: props.design.widgetBodyBorder || 'none',
        //comments
        commentsAuthorTextColor:'',
        commentsDateTextColor:'',
        commentsBodyTextColor:'',
        commentsBackgroundColor:'',

    });


    const onChangeHandler = e => {
        setColors({
            ...colors,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        updateSetting('design', {...colors}).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    };
    const renderColorsFields = Object.keys(colors).map(element => {
        return (
            <div className="adminDesignSection">
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
                <button className='submitBtn' type='submit'>save settings</button>
            </form>
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
