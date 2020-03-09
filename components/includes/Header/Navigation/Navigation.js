import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from "next/link";
import FA from 'react-fontawesome'
import { AppContext } from "../../../../context/AppContext";
// import  BarsIcon from '../../../../styles/icons/bars-solid.svg'

const Navigation = props => {
    const contextData = useContext(AppContext);
    const navigation = useRef(null)
    const [ navigationData, setNavigationData ] = useState({
        isOpen: false,
        items: []
    });

    useEffect(() => {
        if (window.innerWidth < 768) {
            setNavigationData({
                ...navigationData,
                isOpen: false
            });

        } else {
            setNavigationData({
                ...navigationData,
                isOpen: true
            })
        }
    }, []);
    useEffect(() => {
        if (navigation.current) {
            if (navigationData.isOpen) {
                navigation.current.style.display = 'flex'
            } else {
                navigation.current.style.display = 'none'
            }
        }
    }, [ navigationData.isOpen ]);

    useEffect(() => {
        setNavigationData(navigationData=>({
            ...navigationData,
            items: contextData.navigationData
        }))
    }, [ contextData.navigationData ]);

    const onNavigationMobileBtnClickHandler = () => {
        navigationData.isOpen ? setNavigationData({ ...navigationData, isOpen: false }) : setNavigationData({ ...navigationData, isOpen: true })
    };

    const renderNavigationItems = navigationData.items.map(item=>{
        return(
            <Link key={item.title} href={item.url}><a>{item.title}</a></Link>
        )
    })



    return (
        <>
            <button className='navigationMobileBtn' onClick={ () => onNavigationMobileBtnClickHandler() }><FA className='fontawesomeMedium' name={ navigationData.isOpen ? 'times' : 'bars' }/></button>

            <div ref={ navigation } className='Navigation'>
                {/*<Link href='/'><a>Home</a></Link>*/}
                {/*<Link href='/categories'><a>Categories</a></Link>*/}
                {/*<Link href='/tags'><a>Tags</a></Link>*/}
                {renderNavigationItems}
            </div>
        </>
    );
};

export default Navigation;
