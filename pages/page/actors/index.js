import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../../components/layouts/AppLayout'
import { AppContext } from '../../../context/AppContext'
import TagElement from '../../../components/includes/TagElement/TagElement'
import { getSetting } from '../../../_variables/ajaxVariables'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement'
import ActorElement from '../../../components/includes/ActorElement/ActorElement'

const actors = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        metaData: []
    });
    useEffect(() => {
        console.log(props)
    }, [ props ]);

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
        if (props.actors.length){
            setState({
                ...state,
                metaData: props.actors
            })
        }else if (props.actors.length<1){
            getMeta({
                type: 'actor',
                pageNo: 1,
                size: 100,
                searchForImageIn:'actors',
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
    }, [props]);

    const renderActors = state.metaData.map(meta => {
        if (meta.count>0){
            return (
                <ActorElement key={ meta._id } imageUrl={meta.imageUrl} noImageUrl={meta.noImageUrl} name={ meta.name } count={meta.count}/>
            )
        }

    })

    return (
        <AppLayout>
            <div className='actors'>
                { renderActors }
            </div>
        </AppLayout>
    );
};

actors.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let actors = []
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');

    if (query.meta) {
        const categoriesData = await getMeta({
            type: query.meta,
            pageNo: 1,
            size: 100,
            searchForImageIn:'actors',
        })
        actors = categoriesData.data.metas ? categoriesData.data.metas : []
    }

    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}
    return { identity, navigation, query, actors }
}
export default actors;
