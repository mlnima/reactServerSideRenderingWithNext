import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";

const MenuWidgetItemLink = ({linkTargetType,linkType,linkTargetUrl,linkAs,linkName,linkTranslations,showSub,mobileNavigationOnClickHandler,subItems}) => {
    const router = useRouter()
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);



 const linkClassName = linkType === 'parent' ? 'menu-widget-item' : 'menu-widget-sub-item'
    return (
        <ol className={linkClassName}>
<style jsx>{`
//.menu-widget-item{
//list-style-type: none;
//width: 90%;
//padding: 10px 0;
//font-size: 1.2rem;
//display: flex;
//justify-content: space-between;
//align-items: center;
//position: relative;
//}
//.open-submenus{
//background-color: transparent;
//border: none;
//outline: none;
//display: flex;
//justify-content: flex-end;
//align-items: center;
//}
//.navigation-dropdown-icon{
//width: 10px;
//height: 10px;
//color: var(--navigation-text-color);
//}
.menu-widget-item-link{
color: var(--navigation-text-color);
text-decoration: none;
}


//----------------------
.menu-widget-item-link{
color: var(--navigation-text-color);
text-decoration: none;
}


`}</style>
            {linkTargetType === 'internal' ?
                <Link href={linkTargetUrl} as={linkAs} scroll={false}>
                    <a className={'menu-widget-item-link'} rel='next' onClick={linkTargetUrl.includes('#') ? null : mobileNavigationOnClickHandler}>
                        {linkTranslations?.[router.locale || contextData.state.activeLanguage]?.name || linkName}
                    </a>
                </Link> :
                <a className='menu-widget-item-link' href={linkTargetUrl}>{linkName}</a>
            }
        { linkType === 'parent' && subItems?.length > 0 ?
        <button className='open-submenus'  onClick={onOpenSubmenusHandler}>
             <FontAwesomeIcon icon={showSub ?  faSortUp :faSortDown} className='navigation-dropdown-icon' style={{color:'white',width:'20px',height:'20px'}}  />
        </button>
        : null}
        </ol>
    );
};
export default MenuWidgetItemLink;
