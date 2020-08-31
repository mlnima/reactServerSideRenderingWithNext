import React, {useState, useRef, useEffect, useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import withRouter from "next/dist/client/with-router";
import {pathAndAsPathGenerator} from '../../../../_variables/_variables'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import NavigationMobileButton from "./NavigationMobileButton/NavigationMobileButton";
import LoggedInItemsForMenu from "../../LoggedInItemsForMenu/LoggedInItemsForMenu";
import LoggedOutItemsMenu from "../../LoggedOutItemsMenu/LoggedOutItemsMenu";

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
                style: {
                    ...navigationData.style,
                    display: 'flex'
                }
            });
            contextData.dispatchState({
                ...contextData.state,
                navigationOpenStatus: true
            })
        } else {

        }
    }, []);



    useEffect(() => {
        setNavigationData(navigationData => ({
            ...navigationData,
            items: contextData.navigationData || []
        }))
    }, [contextData.navigationData]);

    useEffect(() => {
        if (contextData.state.navigationOpenStatus) {
            setNavigationData({
                ...navigationData,
                style: {
                    ...navigationData.style,
                    display: 'flex'
                }
            })
        } else {
            setNavigationData({
                ...navigationData,
                style: {
                    ...navigationData.style,
                    display: 'none'
                }
            })
        }
    }, [contextData.state.navigationOpenStatus]);





    const renderNavigationItems = (contextData.navigationData || []).map(item => {

        const queryArrayToObject = (arr) => {
            let returningData = {}
            if (arr) {
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
                }}><a style={{...navigationData.style,backgroundColor:'transparent'}} className='navigation-link'>{
                item.translations ? item.translations[contextData.state.activeLanguage] ? item.translations[contextData.state.activeLanguage].title || item.title : item.title : item.title
            }</a></Link>
        )
    })

    return (
            <div ref={navigation} className='navigation' style={navigationData.style}>
                <LoggedInItemsForMenu visible={contextData.state.isMobile}/>
                <LoggedOutItemsMenu visible={contextData.state.isMobile}/>
                <div className="navigation-links">
                    {renderNavigationItems}
                </div>


            </div>
    );
};

export default withRouter(Navigation);
