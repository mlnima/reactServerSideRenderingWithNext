import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import { getSetting, updateSetting } from "../../../../_variables/ajaxVariables";
import FA from 'react-fontawesome'
import NavigationItem from "../../../../components/includes/Header/Navigation/NavigationItem/NavigationItem";

const navigation = props => {
    const titleEl = useRef(null)
    const urlEl = useRef(null)
    const [ state, setState ] = useState({
        type: 'navigation',
        data: []

    });

    useEffect(() => {
        getSetting(state.type,false,window.location.origin).then(res => {
            if (res.data.setting) {
                setState({
                    ...state,
                    data: res.data.setting.data || []
                })
            }
        })
    }, []);

    const onSaveChangesHandler = () => {
        updateSetting('navigation', state.data).then(() => {
            getSetting(state.type).then(res => {
                if (res.data.setting) {
                    setState({
                        ...state,
                        data: res.data.setting.data || []
                    })
                }
            })
        })
    };

    const onDeleteItemHandler = (e) => {
        setState({
            ...state,
            data: state.data.filter(i => i.title !== e.target.name)
        })
    };

    const onAddItemHandler = () => {
        const newItem = {
            title: titleEl.current.value,
            url: urlEl.current.value
        };
        setState({
            ...state,
            data: [ ...state.data, newItem ]
        })

        titleEl.current.value = '';
        urlEl.current.value = ''
    };

    const renderItems = state.data.map(item => {
        return (
            <NavigationItem title={ item.title } url={ item.url } onDeleteItemHandler={ onDeleteItemHandler }/>
        )
    });

    {/*<div className='items-preview-item'>*/
    }
    {/*    <div className="item-title">*/
    }
    {/*        <p>{ item.title }</p>*/
    }
    {/*        <button><FA className='fontawesomeMedium' name={ 'bars' }/></button>*/
    }
    {/*    </div>*/
    }
    {/*    <button name={ item.title } onClick={ (e) => onDeleteItemHandler(e) }>Del</button>*/
    }
    {/*    <p>{ item.url }</p>*/
    }

    {/*</div>*/
    }
    return (
        <AdminLayout>
            <div id='navigation-setting'>
                <div className='add-navigation-items'>
                    <p>Title :</p>
                    <input ref={ titleEl } type="text" name='title'/>
                    <p>Url :</p>
                    <input ref={ urlEl } type="text" name='url'/>
                    <button onClick={ () => onAddItemHandler() }>Add</button>
                </div>
                <div className='items-preview'>
                    { renderItems }
                </div>
                <button className='saveBtn' onClick={ () => onSaveChangesHandler() }>Save</button>
            </div>
        </AdminLayout>
    );
};
export default navigation;