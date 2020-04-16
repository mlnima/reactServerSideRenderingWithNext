import React, { useEffect, useState, useRef, useContext } from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import { getSetting, updateSetting } from "../../../../_variables/ajaxVariables";
import FA from 'react-fontawesome'
import NavigationItem from "../../../../components/adminIncludes/NavigationItem/NavigationItem";
import './navigationAdmin.scss';
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import AdminDesignSettingColorType from '../../../../components/adminIncludes/AdminDesignSettingColorType/AdminDesignSettingColorType'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'

const navigation = props => {
    const contextData = useContext(AppContext);
    const titleEl = useRef(null)
    const urlEl = useRef(null)
    const asEl = useRef(null)
    const queryEl = useRef(null)
    const queryType = useRef(null)

    const [ state, setState ] = useState({
        type: 'navigation',
        data: [],
        style: {
            backgroundColor: '',
            color: ''
        }
    });

    const [newNavigationItem,setNewNavigationItem] = useState({

    })
    // useEffect(() => {
    //     console.log(contextData.siteDesign)
    // }, [ contextData.siteDesign ]);

    useEffect(() => {
        setState({
            ...state,
            style: {
                backgroundColor: contextData.siteDesign.navigationBackgroundColor || '',
                color: contextData.siteDesign.navigationTextColor || ''
            }
        })
    }, [ contextData.siteDesign.navigationTextColor, contextData.siteDesign.navigationBackgroundColor ]);

    const onSaveChangesHandler = (type) => {
        const contextValue = type === 'design' ?
            'siteDesign' :
            type === 'navigation' ?
                'navigationData' : null
        updateSetting(type, contextData[contextValue]).then(() => {
            props.router.push({ pathname: props.router.pathname, query: { ...props.router.query } })
        }).catch(err => {
            console.log(err)
            props.router.push({ pathname: props.router.pathname, query: { ...props.router.query } })
        })
    };

    const onDeleteItemHandler = (e) => {
        contextData.dispatchNavigationData([ ...contextData.navigationData.filter(i => i.title !== e.target.name) ])
    };

    const onSaveHandler = (newData,index) => {

        // console.log(newData,index )
     const updatedItems = [...contextData.navigationData.slice(0,index),newData,...contextData.navigationData.slice(index+1)]
        // console.log( updatedItems)
        contextData.dispatchNavigationData(updatedItems)
     //
     //
     //    setState({
     //        ...state,
     //        data: updatedItems
     //    })

    }

    // const onChaneHandler = (newData) => {
    //     //     setState({
    //     //         ...state,
    //     //         data: newData
    //     //     })
    //     // }

    const onAddItemHandler = () => {
        const newItem = {
            title: titleEl.current.value,
            url: urlEl.current.value,
            as: asEl.current.value,
        };
        contextData.dispatchNavigationData([ ...contextData.navigationData, newItem ])
        titleEl.current.value = '';
        urlEl.current.value = ''
    };

    const renderItems = (contextData.navigationData || []).map(item => {
        return (
            <NavigationItem key={contextData.navigationData.indexOf(item)}   itemIndex={ contextData.navigationData.indexOf(item) } title={ item.title } url={ item.url } as={ item.as } data={ contextData.navigationData } onSaveHandler={ onSaveHandler }
                            onDeleteItemHandler={ onDeleteItemHandler }/>
        )
    });

    return (
        <AdminLayout>
            <div id='navigation-setting'>
                <div className='add-navigation-items'>
                    <div className='add-navigation-item'>
                        <p>Title :</p>
                        <input ref={ titleEl } type="text" name='title'/>
                    </div>
                    <div className='add-navigation-item'>
                        <p>Url :</p>
                        <input ref={ urlEl } type="text" name='url'/>
                    </div>
                    <div className='add-navigation-item'>
                        <p>As :</p>
                        <input ref={ asEl } type="text" name='as'/>
                    </div>
                    <div className='add-navigation-item'>
                        <p>query :</p>
                        <input ref={ queryEl } type="text" name='query'/>
                        <input ref={ queryType } type="text" name='queryType'/>
                        <button onClick>Add Query</button>
                    </div>
                    <button onClick={ () => onAddItemHandler() }>Add</button>
                </div>
                <div className='items-preview' style={ state.style }>
                    { renderItems }
                </div>
                <button className='saveBtn' onClick={ () => onSaveChangesHandler('navigation') }>Save</button>
            </div>
            {/*<AdminDesignSettingColorType positionName='navigationBackgroundColor' type='background'/>*/ }
            {/*<AdminDesignSettingColorType positionName='navigationTextColor' type='color'/>*/ }
            {/*<button className='saveBtn' onClick={ () => onSaveChangesHandler('design') }>Save</button>*/ }

            <div className='colorSettingSections'>
                <ColorSection designName='navigationBackgroundColor'/>
                <ColorSection designName='navigationTextColor'/>
            </div>
        </AdminLayout>
    );
};
export default withRouter(navigation);