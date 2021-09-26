import React, {useEffect, useState, useContext, useRef} from 'react';
import MyProfileInfo from '../MyProfileInfo/MyProfileInfo'
import MyProfilePosts from '../MyProfilePosts/MyProfilePosts'
import {useRouter} from "next/router";
import MyProfileFollowers from "../MyProfileFollowers/MyProfileFollowers";

const ProfileComponentsRenderer = ({activeTab}) => {
    const router = useRouter();

    if (activeTab === 'myProfile') {
        return (
            <MyProfileInfo/>
        )
    } else if (activeTab === 'posts') {
        return (
            <MyProfilePosts/>
        )
    } else if (activeTab === 'followers') {
        return (
            <MyProfileFollowers/>
        )
    } else return null

};
export default ProfileComponentsRenderer;
