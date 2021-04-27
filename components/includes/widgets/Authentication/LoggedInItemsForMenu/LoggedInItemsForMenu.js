import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faUser} from "@fortawesome/free-regular-svg-icons";

const LoggedInItemsForMenu = props => {
    const contextData = useContext(AppContext);
      const [state,setState] = useState({
          svgDefaultStyle:{
              maxWidth:'25px',
              maxHeight: '25px'
          }
      })

    const MyProfile = () => {
        if (contextData.siteIdentity.membership) {
            return (
                <Link href={`/profile?username=${contextData.userData.username}`}>
                    <a className='logged-in-item' >
                        <style jsx>{`
                          .logged-in-item{
                           color: var(--navigation-text-color);
                          }
                        `}</style>
                        <FontAwesomeIcon style={state.svgDefaultStyle} icon={faUser} className='svg-logo-small'/>
                    </a>
                </Link>
            )
        } else return null
    }

    if (contextData.userData.username ) {
        return (
            <div className='logged-in-items'>
                <style jsx>{`
                             .logged-in-item{
                               color: var(--navigation-text-color);

                             }
                             .svg-logo-small{
                               color: var(--navigation-text-color);
                               max-width: 15px;
                               max-height: 15px;
                             }
                  `}</style>
                <p className='logged-in-item' onClick={() => contextData.functions.logOutUser()}>
                    <FontAwesomeIcon style={state.svgDefaultStyle} icon={faPowerOff} className=' svg-logo-small' />
                </p>
                {contextData.siteIdentity.membership?
                    <Link href={`/profile?username=${contextData.userData.username}`}>
                        <a className='logged-in-item' >
                            <FontAwesomeIcon style={state.svgDefaultStyle} icon={faUser} className='svg-logo-small'/>
                        </a>
                    </Link>
                :null
                }

            </div>
        )
    } else return null
};
export default LoggedInItemsForMenu;
