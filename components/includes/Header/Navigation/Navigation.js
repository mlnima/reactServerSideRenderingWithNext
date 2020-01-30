import React, { useState, useRef , useEffect } from 'react';
import Link from "next/link";
import './Navigation.scss';

const Navigation = () => {
    const navigation = useRef(null)
    const [ navigationData, setNavigationData ] = useState({
        isOpen:false
    });

    useEffect(()=>{
            if (window.innerWidth < 768){
                setNavigationData({
                    ...navigationData,
                    isOpen: false
                });

            }else {
                setNavigationData({
                    ...navigationData,
                    isOpen: true
                })
            }
    },[ ]);

    useEffect(()=>{
        if (navigation.current){
            if(navigationData.isOpen){
                navigation.current.style.display = 'flex'
            }else {
                navigation.current.style.display = 'none'
            }
        }
    },[ navigationData.isOpen]);

    const onNavigationMobileBtnClickHandler = () => {
         navigationData.isOpen?setNavigationData({...navigationData,isOpen:false}):setNavigationData({...navigationData,isOpen:true})
    };

    return (
        <>
            <button className='navigationMobileBtn fas fa-bars' onClick={()=>onNavigationMobileBtnClickHandler()}>Menu</button>
            <div ref={navigation} className='Navigation'>
                <Link href='/'><a>Home</a></Link>
                <Link href='/categories'><a>Categories</a></Link>
                <Link href='/tags'><a>Tags</a></Link>
            </div>
        </>
    );
};

export default Navigation;
