import React, {useEffect, useState, useContext, useRef} from 'react';
import MyProfileInfo from '../ProfileInfo/ProfileInfo'
import MyProfilePosts from '../ProfilePosts/ProfilePosts'
import {useRouter} from "next/router";
import ProfileFollowers from "../ProfileFollowers/ProfileFollowers";

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
            <ProfileFollowers/>
        )
    } else return null

};
export default ProfileComponentsRenderer;
