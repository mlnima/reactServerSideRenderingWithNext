import React, {useState, useRef, useEffect, useContext} from 'react';
import Link from "next/link";
import FA from 'react-fontawesome'
import {AppContext} from "../../../../context/AppContext";
import BarsSvg from '../../../../static/images/fontawesome/bars-solid.svg'
import withRouter from "next/dist/client/with-router";
import {
    addOrReplaceQueryToWindowLocationSearch,
    getLanguageQuery,
    getLanguageQueryFromWindowLocationSearch, pathAndAsPathGenerator
} from '../../../../_variables/_variables'
import {useRouter} from 'next/router'


const Navigation = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const navigation = useRef(null)
    const navigationMobileBtn = useRef(null)
    const [navigationData, setNavigationData] = useState({
        isOpen: false,
        items: [],
        style: {},
        queries: {},
        asUrlWithLang: ''
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
        if (localStorage) {
            if (localStorage.lang) {
                if (localStorage.lang !== 'default') {
                    setNavigationData({
                        ...navigationData,
                        queries: {
                            ...navigationData.queries,
                            lang: localStorage.lang,
                        },
                        // asUrlWithLang: addOrReplaceQueryToWindowLocationSearch('lang', localStorage.lang)
                    })
                }

            }
        }
    }, [props]);


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


    const renderNavigationItems = contextData.navigationData.map(item => {
console.log(item)
        const queryArrayToObject = (arr) => {
            let returningData = {}
            arr.forEach(arrItem => {
                returningData[Object.keys(arrItem)[0]] = Object.values(arrItem)[0]
            })
            return returningData
        }

        const pathData = pathAndAsPathGenerator(item.url, item.as || item.url, item.query)

        //---

        //---


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
