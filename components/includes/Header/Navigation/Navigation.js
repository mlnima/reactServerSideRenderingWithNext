import React, {useState, useRef, useEffect, useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import BarsSvg from '../../../../static/images/fontawesome/bars-solid.svg'
import withRouter from "next/dist/client/with-router";
import {pathAndAsPathGenerator} from '../../../../_variables/_variables'

const Navigation = props => {
    const contextData = useContext(AppContext);
    const navigation = useRef(null)
    const navigationMobileBtn = useRef(null)
    const [navigationData, setNavigationData] = useState({
        isOpen: false,
        items: [],
        style: {},
        queries: {},
        asUrlWithLang: ''
    });

    const [navigationBtnData,setNavigationBtnData] = useState({
        style:{}
    })



    useEffect(() => {
        setNavigationData({
            ...navigationData,
            style: {
                backgroundColor: contextData.siteDesign.navigationBackgroundColor,
                color: contextData.siteDesign.navigationTextColor
            }
        })
    }, [contextData.siteDesign, props]);


    useEffect(() => {
        if (window.innerWidth >= 768) {
            setNavigationData({
                ...navigationData,
                isOpen: true,
                style:{
                    ...navigationData.style,
                    display:'flex'}
            });
        }else {

        }
    }, []);

    //
    // useEffect(() => {
    //     if (navigation.current) {
    //         if (navigationData.isOpen) {
    //             navigationMobileBtn.current.style.transform = 'rotate(-90deg)'
    //         } else if (!navigationData.isOpen){
    //             navigationMobileBtn.current.style.transform = 'rotate(0deg)'
    //         }
    //     }
    // }, [navigationData.isOpen]);

    useEffect(() => {
        setNavigationData(navigationData => ({
            ...navigationData,
            items: contextData.navigationData || []
        }))
    }, [contextData.navigationData]);




    const onNavigationMobileBtnClickHandler = () => {

        if (navigationData.isOpen){
            setNavigationData({
                ...navigationData,
                isOpen: false,
                style:{
                    ...navigationData.style,
                    display:'none'
                }
            })

            setNavigationBtnData({
                ...navigationBtnData,
                style: {
                    ...navigationBtnData,
                    transform:'rotate(0deg)'
                }
            })



        }else {
            setNavigationData({
                ...navigationData,
                isOpen: true,
                style:{
                    ...navigationData.style,
                    display:'flex'}
            })
            setNavigationBtnData({
                ...navigationBtnData,
                style: {
                    ...navigationBtnData,
                    transform:'rotate(-90deg)'
                }
            })

        }

    };



    const renderNavigationItems = (contextData.navigationData || []).map(item => {

        const queryArrayToObject = (arr) => {
            let returningData = {}
            if (arr){
                arr.forEach(arrItem => {
                    returningData[Object.keys(arrItem)[0]] = Object.values(arrItem)[0]
                })
                return returningData
            }
        }

        const pathData = pathAndAsPathGenerator(item.url, item.as || item.url, item.query)


        return (
            <Link
                as={item.as || item.url}
                key={item.title}
                href={{
                    pathname: pathData.pathname,
                    query: queryArrayToObject(item.query),
                }}><a style={navigationData.style}>{
                item.translations ? item.translations[contextData.state.activeLanguage] ? item.translations[contextData.state.activeLanguage].title || item.title : item.title : item.title
            }</a></Link>
        )
    })


    return (
        <>
            <button style={navigationBtnData.style} ref={navigationMobileBtn} className='navigationMobileBtn'
                    onClick={onNavigationMobileBtnClickHandler}><img className='fontawesomeSvgMedium' src={BarsSvg} alt=""/></button>
            <div ref={navigation} className='Navigation' style={navigationData.style}>
                {renderNavigationItems}
            </div>
        </>
    );
};

export default withRouter(Navigation);
