import React, {useState, useRef, useEffect, useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import withRouter from "next/dist/client/with-router";
import {pathAndAsPathGenerator} from '../../../../_variables/_variables'
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faBars} from "@fortawesome/free-solid-svg-icons";
// import NavigationMobileButton from "./NavigationMobileButton/NavigationMobileButton";
import LoggedInItemsForMenu from "../../widgets/Authentication/LoggedInItemsForMenu/LoggedInItemsForMenu";
import LoggedOutItemsMenu from "../../widgets/Authentication/LoggedOutItemsMenu/LoggedOutItemsMenu";

const Navigation = props => {
    const contextData = useContext(AppContext);
    const navigation = useRef(null)
    // useEffect(() => {
    //     setNavigationData({
    //         ...navigationData,
    //         style: {
    //             // ...navigationData.style,
    //             color: contextData.siteDesign.navigationTextColor
    //         }
    //     })
    // }, [ props]);
    // useEffect(() => {
    //     setNavigationData({
    //         ...navigationData,
    //         items: contextData.navigationData || []
    //     })
    // }, [contextData.navigationData]);
    //
    //
    //
    // useEffect(() => {
    //     if (contextData.state.navigationOpenStatus) {
    //         setNavigationData({
    //             ...navigationData,
    //             items: contextData.navigationData || [],
    //             style: {
    //                 ...navigationData.style,
    //                 display: 'flex'
    //             }
    //         })
    //     } else {
    //         setNavigationData({
    //             ...navigationData,
    //             items: contextData.navigationData || [],
    //             style: {
    //                 ...navigationData.style,
    //                 display: 'none'
    //             }
    //         })
    //     }
    // }, [contextData.state.navigationOpenStatus,contextData.navigationData]);


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
                }}><a  className='navigation-link'>{
                item.translations ? item.translations[contextData.state.activeLanguage] ? item.translations[contextData.state.activeLanguage].title || item.title : item.title : item.title
            }</a></Link>
        )
    })

    if ((contextData.navigationData || []).length >0){
        return (
            <div ref={navigation} className='navigation' style={{
                display : contextData.state.navigationOpenStatus?'flex':'none'
            }}>
                <LoggedInItemsForMenu visible={contextData.state.isMobile}/>
                <LoggedOutItemsMenu visible={contextData.state.isMobile}/>
                <div className="navigation-links">
                    {renderNavigationItems}
                </div>
            </div>
        );
    }else return null



};

export default withRouter(Navigation);
