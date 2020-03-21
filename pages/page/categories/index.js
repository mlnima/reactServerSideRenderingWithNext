import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from "../../../components/layouts/AppLayout";
import { getSetting } from '../../../_variables/ajaxVariables'
import { AppContext } from '../../../context/AppContext'
import { getMeta } from '../../../_variables/ajaxPostsVariables'
import withRouter from 'next/dist/client/with-router';
import CategoryElement from '../../../components/includes/CategoryElement/CategoryElement';
// import './categories.scss'import './categories.scss'

const categories = props => {
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
        if (props.categories.length){
            setState({
                ...state,
                metaData: props.categories
            })
        }else if (props.categories.length<1){
            getMeta({
                type: 'category',
                pageNo: 1,
                size: 100,
                searchForImageIn:'categories',
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

    const renderCategories = state.metaData.map(meta => {
        if (meta.count>0){
            return (
                <CategoryElement key={meta._id} imageUrl={meta.imageUrl} noImageUrl={meta.noImageUrl} name={meta.name} count={meta.count}/>
            )
        }

    })

    return (
        <AppLayout>
            <div className='categories'>
                { renderCategories }
            </div>
        </AppLayout>
    );
};

categories.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let categories = []
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');

    if (query.meta) {
        const categoriesData = await getMeta({
            type: query.meta,
            pageNo: 1,
            size: 100,
            searchForImageIn:'categories',
        })
        categories = categoriesData.data.metas ? categoriesData.data.metas : []
    }

    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}
    return { identity, navigation, query, categories }
}
export default withRouter(categories);
