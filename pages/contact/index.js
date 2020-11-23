import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import SiteSettingSetter from "../../components/includes/SiteSettingsSetter/SiteSettingsSetter";
import {getAbsolutePath} from "../../_variables/_variables";
import {getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
import dataDecoder from "../../server/tools/dataDecoder";
import './Contact.scss'
import {contactAjaxPost} from "../../_variables/ajaxVariables";
import {AppContext} from "../../context/AppContext";

const contact = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        name: 'test name',
        email: 'test email',
        subject: 'test subject',
        description: 'test description'
    });


    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        contactAjaxPost(state).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <AppLayout>
            <SiteSettingSetter  {...props} />
            <form className='contact-form' onSubmit={e => onSubmitHandler(e)}>
                <div className='contact-form-item'>
                    <p>Name:</p>
                    <input type='text' name='name' onChange={e => onChangeHandler(e)}/>
                </div>
                <div className='contact-form-item'>
                    <p>Email:</p>
                    <input type='text' name='email' onChange={e => onChangeHandler(e)}/>
                </div>
                <div className='contact-form-item'>
                    <p>Subject:</p>
                    <input type='text' name='subject' onChange={e => onChangeHandler(e)}/>
                </div>
                <div className='contact-form-item'>
                    <p>Description:</p>
                    <textarea name='description' onChange={e => onChangeHandler(e)}/>
                </div>
                <button>Submit</button>
            </form>
        </AppLayout>
    );
};

// contact.getInitialProps = async ({pathname, query, req, asPath}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let errorCode = 200
//     let settings;
//     let widgets;
//     const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'tagsPage')
//     const widgetsData = await getMultipleWidgetWithData({widgets: [ 'footer', 'header','topBar','navigation']}, domainName, true, 'tagsPage')
//
//     settings = settingsData.data.settings ? settingsData.data.settings : []
//     widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
//
//     return {...settings, query, pathname, asPath, widgets}
// }

export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : '';

    let errorCode = 200
    let settings;
    let widgets;
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'tagsPage')
    const widgetsData = await getMultipleWidgetWithData({widgets: [ 'footer', 'header','topBar','navigation']}, domainName, true, 'tagsPage')

    settings = settingsData.data.settings ? settingsData.data.settings : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return {props:{...settings, query, asPath, widgets}}

}




export default contact;
