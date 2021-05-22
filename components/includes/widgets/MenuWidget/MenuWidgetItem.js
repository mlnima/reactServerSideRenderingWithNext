import React, {useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import _ from "lodash";
import {faBars, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MenuWidgetItemLink from "./MenuWidgetItemLink";

const MenuWidgetItem = ({menuItem, linkAsForMenuItems, mobileNavigationOnClickHandler, menuItems}) => {
    const [showSub, setShowSub] = useState(false)
    const router = useRouter()

    const renderSubMenus = (menuItem.subItems || []).map(subItem => {
        // console.log(subItem)
        const linkAsForMenuItem = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? subItem.as :
            (!router.locale && !router.query.locale) ? subItem.as :
                `/${router.locale || router.query.locale}${subItem.as}`;


        // {subItem.type === 'internal' ?
        //     <Link href={subItem.target} as={linkAsForMenuItem} scroll={false}>
        //         <a className='menu-widget-item-link' rel='next' onClick={subItem.target.includes('#') ? null : mobileNavigationOnClickHandler}>
        //             {subItem.translations?.[router.locale]?.name || subItem.name}
        //         </a>
        //     </Link> :
        //     <a className='menu-widget-item-link' href={subItem.target}>{subItem.name}</a>
        // }
//console.log(subItem)
        return (
            <ul className='menu-widget-sub-item' key={_.uniqueId('id_')}>
                <style jsx>{`
.menu-widget-sub-item{
display: ${showSub ? 'initial' : 'none'};
z-index: 10;
background-color: var(--navigation-background-color);
width:200px ;
list-style-type: none;
padding: 10px 15px;

}
//
`}</style>

                <MenuWidgetItemLink
                    linkTargetType={subItem?.type}
                    linkType='sub'
                    linkTargetUrl={subItem?.target}
                    linkAs={linkAsForMenuItem}
                    linkName={subItem?.name}
                    linkTranslations={subItem?.translations}
                    showSub={showSub}
                    mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}
                />

            </ul>
        )
    })


    const onOpenSubmenusHandler = () => {
        showSub ? setShowSub(false) : setShowSub(true)
    }

    return (

        <li key={_.uniqueId('id_')} className='menu-widget-item'  onMouseEnter={ menuItem.subItems?.length > 0 ? onOpenSubmenusHandler :null}  onMouseLeave={ menuItem.subItems?.length > 0 ? onOpenSubmenusHandler :null}>
            <style jsx>{`
.menu-widget-item{
list-style-type: none;
width: 90%;
padding: 10px 0;
font-size: 1.2rem;
display: flex;
justify-content: space-between;
align-items: center;
position: relative;
margin:${!menuItem.parent?'0 10px':'0'};
}
.open-submenus{
background-color: transparent;
border: none;
outline: none;
display: flex;
justify-content: flex-end;
align-items: center;
}
.navigation-dropdown-icon{
width: 10px;
height: 10px;
color: var(--navigation-text-color);
}
.dropdown-content{
width: 100%;
max-width: 200px;
position: absolute;
top:40px;
display: flex;
flex-direction: column;
}
@media only screen and (min-width: 768px) {
.menu-widget-item{
font-size: 1rem;
}
}
`}</style>

            <MenuWidgetItemLink
                linkTargetType={menuItem?.type}
                linkType='parent'
                linkTargetUrl={menuItem?.target}
                linkAs={linkAsForMenuItems}
                linkName={menuItem?.name}
                linkTranslations={menuItem?.translations}
                showSub={showSub}
                mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}
            />
            {menuItem?.subItems?.length > 0 ?
                <button className='open-submenus' onClick={onOpenSubmenusHandler}>
                    <FontAwesomeIcon icon={showSub ? faSortUp : faSortDown} className='navigation-dropdown-icon' style={{color: 'white', width: '20px', height: '20px'}}/>
                </button>
                : null}

            {showSub ?
                <div className='dropdown-content'>
                    {renderSubMenus}
                </div>
                : null
            }

        </li>
    );
};
export default MenuWidgetItem;

