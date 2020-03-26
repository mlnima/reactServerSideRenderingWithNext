import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../../components/layouts/AppLayout'
import { getSetting } from '../../../_variables/ajaxVariables'
import { AppContext } from '../../../context/AppContext'
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement'

const metaPage = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        metaData: []
    });
    useEffect(() => {
        if (props.navigation) {
            contextData.dispatchNavigationData(props.navigation.data)
        }
        if (props.identity) {
            contextData.dispatchSiteIdentity(siteIdentity => ({
                ...siteIdentity,
                ...props.identity
            }))
        }
    }, [ props ]);
    const renderMetas = state.metaData.map(meta => {
        if (meta.count > 0) {
            return (
                <CategoryElement key={ meta._id } imageUrl={ meta.imageUrl } noImageUrl={ meta.noImageUrl } name={ meta.name } count={ meta.count }/>
            )
        }

    })

    useEffect(() => {
        console.log(props )
    }, []);

    return (
        <AppLayout>
            <div>xxx</div>
            { renderMetas }
        </AppLayout>
    );
};

metaPage.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let metaData = []
    const metaDetail = {
        type: query.meta,
        pageNo: 1,
        size: 100,
        searchForImageIn: 'categories',
    }
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');
    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}
    return { identity, navigation, query }
}

export default metaPage;
