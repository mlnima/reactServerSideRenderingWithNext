import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../../components/layouts/AppLayout'
import { getSetting } from '../../../_variables/ajaxVariables'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../context/AppContext'
import TagElement from '../../../components/includes/TagElement/TagElement'
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement'

const tags = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        metaData: []
    });
    useEffect(() => {
        console.log(props )
    }, [props]);
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
        if (props.tags.length){
            setState({
                ...state,
                metaData: props.tags
            })
        }else if (props.tags.length<1){
            getMeta({
                type: 'tag',
                pageNo: 1,
                size: 100,
                searchForImageIn:'tags',
                sortBy:'-_id'
            }).then(res=>{
                console.log(res )
                setState({
                    ...state,
                    metaData: res.data.metas
                })
            }).catch(err=>{
                console.log( err)
            })
        }
    }, [ props ]);

    const renderTags = state.metaData.map(meta => {
        if (meta.count>0){
            return (
                <TagElement key={meta._id} imageUrl={meta.imageUrl} noImageUrl={meta.noImageUrl} name={meta.name} count={meta.count}/>
            )
        }

    })
    return (
        <AppLayout>
            <div className='tags'>
                {renderTags}
            </div>
        </AppLayout>
    );
};



tags.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let tags = []
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');

    if (query.meta) {
        const tagsData = await getMeta({
            type: query.meta,
            searchForImageIn:'tags',
            pageNo: 1,
            size: 100
        })
        tags = tagsData.data.metas ? tagsData.data.metas : []
    }

    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}
    return { identity, navigation, query, tags }
}
export default tags;
