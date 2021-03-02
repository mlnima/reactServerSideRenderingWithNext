import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import './MyProfileInfo.scss'
const MyProfileInfo = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        editMode: false,
        changeableFields: [
            'email',
            'firstName',
            'lastName',
            'nickName',
            'gender',
            'relationshipStatus',
            'city',
            'country',
            'sexualOrientation',
            'about',
        ]
    });

    const onChangeHandler = e => {
        contextData.dispatchUserData({
            ...contextData.userData,
            [e.target.name]: e.target.value
        })
    }

    const WhatToRender = () => {
        if (state.editMode) {
            return (
                <>

                    <label className='profile-info-label'>Name: <input className='profile-edit-input' name='firstName' value={ contextData.userData.firstName } onChange={ e => onChangeHandler(e) }/></label>
                    <label className='profile-info-label'>Last Name: <input className='profile-edit-input' name='lastName' value={ contextData.userData.lastName } onChange={ e => onChangeHandler(e) }/></label>

                    <label className='profile-info-label'>Last Name:
                        <select onChange={ e => onChangeHandler(e) } name='gender' value={ contextData.userData.gender || 'not provided' }>
                            <option value=''>not provided</option>
                            <option value='male'>Male</option>
                            <option value='female'>female</option>
                        </select>
                    </label>
                    <label className='profile-info-label'>Relationship Status: <input className='profile-edit-input' name='relationshipStatus' value={ contextData.userData.relationshipStatus } onChange={ e => onChangeHandler(e) }/></label>
                    <label className='profile-info-label'>City: <input className='profile-edit-input' name='city' value={ contextData.userData.city } onChange={ e => onChangeHandler(e) }/></label>
                    <label className='profile-info-label'>Country: <input className='profile-edit-input' name='country' value={ contextData.userData.country } onChange={ e => onChangeHandler(e) }/></label>
                    <label className='profile-info-label'>Sexual Orientation: <input className='profile-edit-input' name='sexualOrientation' value={ contextData.userData.sexualOrientation } onChange={ e => onChangeHandler(e) }/></label>
                    <label className='profile-info-label'>Sexual Orientation: <textarea className='profile-edit-input' name='about' value={ contextData.userData.about } onChange={ e => onChangeHandler(e) }/></label>
                </>
            )
        } else {
            return (
                <>
                    <label className='profile-info-label'>Username: { contextData.userData.username }</label>
                    <label className='profile-info-label'>Email: { contextData.userData.email || 'not provided' }</label>
                    <label className='profile-info-label'>Name: { contextData.userData.firstName || 'not provided' }</label>
                    <label className='profile-info-label'>Last Name: { contextData.userData.lastName || 'not provided' }</label>
                    <label className='profile-info-label'>Gender: { contextData.userData.gender || 'not provided' }</label>
                    <label className='profile-info-label'>Relationship Status: { contextData.userData.relationshipStatus || 'not provided' }</label>
                    <label className='profile-info-label'>City: { contextData.userData.city || 'not provided' }</label>
                    <label className='profile-info-label'>Country: { contextData.userData.country || 'not provided' }</label>
                    <label className='profile-info-label'>Sexual Orientation: { contextData.userData.sexualOrientation || 'not provided' }</label>
                    <label className='profile-info-label'>Sexual Orientation: { contextData.userData.about || 'not provided' }</label>

                </>
            )
        }
    }

    return (
        <div className='my-profile-info'>
            <h1> My Profile Info</h1>
            <button onClick={ () => state.editMode ? setState({ ...state, editMode: false }) : setState({ ...state, editMode: true }) }>Edit</button>
            <div className='my-profile-fields'>
                <WhatToRender/>
            </div>

        </div>
    );
};
export default MyProfileInfo;
