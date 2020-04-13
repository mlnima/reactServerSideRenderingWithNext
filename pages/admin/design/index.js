import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";

import { saveCustomStyle, getSetting, updateSetting } from '../../../_variables/ajaxVariables'
import './design.scss'
import { AppContext } from '../../../context/AppContext'
import { getAbsolutePath } from '../../../_variables/_variables'

const design = props => {
    const contextData = useContext(AppContext);
    const [ colors, setColors ] = useState({
        //body
        bodyBackgroundColor: props.design.bodyBackgroundColor || '#000',
        bodyTextColor: props.design.bodyTextColor || '#fff',
        //Logo
        textLogoColor:props.design.textLogoColor ||'#fff',
        textLogoSize:props.design.textLogoSize ||'40px',
        headLineColor:props.design.headLineColor ||'#fff',
        headLineSize:props.design.headLineSize ||'10px',
        //mobile theme
        themeColor: props.design.themeColor || '#fff',
        //top bar
        // topBarBackgroundColor: props.design.topBarBackgroundColor || '#181818',
        // topBarTextColor: props.design.topBarTextColor || '#fff',
        //header
        // headerBackgroundColor: props.design.headerBackgroundColor || '#000',
        // headerTextColor: props.design.headerTextColor || '#fff',
        //navigation
        // navigationBackgroundColor: props.design.navigationBackgroundColor || '#181818',
        // navigationTextColor: props.design.navigationTextColor || '#fff',
        //footer
        // footerBackgroundColor: props.design.footerBackgroundColor || '#181818',
        // footerTextColor: props.design.footerTextColor || '#fff',
        //widgets
        // widgetHeaderBackgroundColor: props.design.widgetHeaderBackgroundColor || '#222222',
        // widgetHeaderTextColor: props.design.widgetHeaderTextColor || '#fff',
        // widgetHeaderRedirectLinkBackgroundColor: props.design.widgetHeaderRedirectLinkBackgroundColor || '#fff',
        // widgetHeaderRedirectLinkTextColor: props.design.widgetHeaderRedirectLinkTextColor || '#fff',
        // widgetBodyBackgroundColor: props.design.widgetBodyBackgroundColor || 'transparent',
        // widgetBodyTextColor: props.design.widgetBodyTextColor || '#fff',
        // widgetBodyBorder: props.design.widgetBodyBorder || 'none',
        //************Post Page***************
        //comments
        // commentsAuthorTextColor: props.design.commentsAuthorTextColor || '#0085ba',
        // commentsDateTextColor: props.design.commentsDateTextColor || '#FF3565',
        // commentsBodyTextColor: props.design.commentsBodyTextColor || '#fff',
        // commentsBackgroundColor:  props.design.commentsBackgroundColor ||'transparent',


    });
    const [ customStyle, setCustomStyle ] = useState( '')

    useEffect(() => {
        console.log( props)
        if(props.customStyles.data){
            setCustomStyle(props.customStyles.data)
        }
    }, [props]);

    // useEffect(() => {
    //     console.log( customStyle)
    // }, [customStyle]);

    // const onChangeHandler = e => {
    //     setColors({
    //         ...colors,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const onSubmitHandler = e => {
    //     e.preventDefault()
    //     contextData.dispatchState({
    //         ...contextData.state,
    //         loading: true
    //     })
    //     updateSetting('design', { ...colors }).then(() => {
    //         contextData.dispatchState({
    //             ...contextData.state,
    //             loading: false
    //         })
    //     })
    // };

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


    const onCustomStyleSaveHandler = e => {
        e.preventDefault()
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        saveCustomStyle( customStyle ).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    }

    const onCustomStyleChangeHandler = e => {
        setCustomStyle(e.target.value)
    }

    return (
        <AdminLayout>
            <form className='adminDesign' onSubmit={ e => onSubmitHandler(e) }>

                <div className='colorsContent'>
                    { renderColorsFields }
                </div>
                <button className='submitBtn' type='submit'>Save Colors</button>
            </form>

            <form className='customStyle' onSubmit={ e => onCustomStyleSaveHandler(e) }>
                <textarea value={  customStyle } onChange={ e => onCustomStyleChangeHandler(e) }/>
                <button className='submitBtn' type='submit'>Save Custom Style</button>
            </form>
        </AdminLayout>
    );
};

design.getInitialProps = async ({ req }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let design;
    let customStyles;
    const designData = await getSetting('design', false, domainName);
    const customStylesData = await getSetting('customStyle', false, domainName);

    design = designData.data.setting ? designData.data.setting.data : {}
    customStyles = customStylesData.data.setting ? customStylesData.data.setting : {}
    return { design, customStyles }
}
export default design;
