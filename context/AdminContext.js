import React, { useEffect, useState,createContext} from 'react';
import  axios from 'axios'
import {useRouter} from "next/router";
import {getSignedInUserData} from "../_variables/ajaxAuthVariables";


export const AdminContext = createContext();


const AppProvider = props =>{
    const [state, dispatchState] = useState({
        loading: false,
        activeLanguage: router.locale || router.query.locale || 'default',
        designSet:false,
        identitySet:false,
        adminPanelSettingsSet:false,
    });

    const [siteIdentity, dispatchSiteIdentity] = useState({
        isSet:false,
        title: 'site title',
        themeColor: '#000',
        description: 'site description',
        keywords: [],
        customScripts: []
    });

    const [eCommerceSettings,dispatchECommerceSettings]= useState({
        translations:{}
    })

    const [siteDesign, dispatchSiteDesign] = useState({});

    const [settings, dispatchSettings] = useState({
        adminPanelSideBar: false,
        textEditorCurrentFile: '',
        textEditorEditMode: false
    });


    
}