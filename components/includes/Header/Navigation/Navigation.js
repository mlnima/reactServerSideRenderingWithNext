import React, {useState, useRef, useEffect, useContext} from 'react';
import Link from "next/link";
import FA from 'react-fontawesome'
import {AppContext} from "../../../../context/AppContext";
import BarsSvg from '../../../../static/images/fontawesome/bars-solid.svg'
import withRouter from "next/dist/client/with-router";
// import  BarsIcon from '../../../../styles/icons/bars-solid.svg'

const Navigation = props => {
    const contextData = useContext(AppContext);
    const navigation = useRef(null)
    const navigationMobileBtn = useRef(null)
    const [navigationData, setNavigationData] = useState({
        isOpen: false,
        items: [],
        style: {}
    });

    useEffect(() => {
        setNavigationData({
            ...navigationData,
            style: {
                backgroundColor: contextData.siteDesign.navigationBackgroundColor,
                color: contextData.siteDesign.navigationTextColor
            }
        })
    }, [contextData.siteDesign]);


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
                navigationMobileBtn.current.style.transform = 'rotate(-90deg)'
            } else {
                navigation.current.style.display = 'none'
                navigationMobileBtn.current.style.transform = 'rotate(0deg)'
            }
        }
    }, [navigationData.isOpen]);

    useEffect(() => {
        setNavigationData(navigationData => ({
            ...navigationData,
            items: contextData.navigationData || []
        }))
    }, [contextData.navigationData]);

    const onNavigationMobileBtnClickHandler = () => {
        navigationData.isOpen ? setNavigationData({
            ...navigationData,
            isOpen: false
        }) : setNavigationData({...navigationData, isOpen: true})
    };


    // useEffect(() => {
    //     console.log(contextData.navigationData)
    // }, [contextData.navigationData]);
    // useEffect(() => {
    //     console.log(props)
    // }, [props]);

    const renderNavigationItems = contextData.navigationData.map(item => {
        const queryArrayToObject = (arr) => {
            let returningData = {}
            arr.forEach(arrItem => {
                returningData[Object.keys(arrItem)[0]] = Object.values(arrItem)[0]
            })
            return returningData
        }

        return (
            <Link as={item.as ? item.as : {}} key={item.title}
                  href={{
                      pathname: item.url,
                      // query:item.query?queryArrayToObject(item.query):{},
                      query: props.router ? props.router.query.lang ? item.translation ? item.translation[props.router.query.lang] ? item.translation[props.router.query.lang].query ? queryArrayToObject(item.translation[props.router.query.lang].query) : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {},
                      // query: !props.router ? item.query ? queryArrayToObject(item.query) : props.router.query.lang ? item.translation ? item.translation[props.router.query.lang] ? item.translation[props.router.query.lang].query ? queryArrayToObject(item.translation[props.router.query.lang].query) : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {} : item.query ? queryArrayToObject(item.query) : {},
                  }}><a style={navigationData.style}>{
                // item.title
                props.router ? props.router.query.lang ? item.translations ? item.translations[props.router.query.lang] ? item.translations[props.router.query.lang].title || item.title : item.title : item.title : item.title : item.title
            }</a></Link>
        )
    })


    return (
        <>
            <button ref={navigationMobileBtn} className='navigationMobileBtn'
                    onClick={() => onNavigationMobileBtnClickHandler()}><img className='fontawesomeSvgMedium'
                                                                             src={BarsSvg} alt=""/></button>
            <div ref={navigation} className='Navigation' style={navigationData.style}>
                {renderNavigationItems}
            </div>
        </>
    );
};

export default withRouter(Navigation);
