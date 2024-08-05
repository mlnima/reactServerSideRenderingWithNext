'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {UniqueDataTypes} from "@repo/typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEarthAmerica, faGear, faLightbulb} from "@fortawesome/free-solid-svg-icons";
import './UserPreferenceConfigWidget.scss'
import dynamic from "next/dynamic";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";

const LanguagesSwitcher = dynamic(() => import('../LanguagesSwitcher/LanguagesSwitcher'))
const DayModeNightMode = dynamic(() => import('../DayModeNightMode/DayModeNightMode'))

interface IProps {
    uniqueData?: UniqueDataTypes,
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const UserPreferenceConfigWidget: FC<IProps> = ({uniqueData, locale, dictionary}) => {
    const [open, setOpen] = useState(false);
    const preferenceMenuRef = useRef<HTMLDivElement | null>(null)

    const onOpenHandler = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (open) {
            if (preferenceMenuRef.current) {
                const rect = preferenceMenuRef.current.getBoundingClientRect();
                if (rect.right > window.innerWidth / 2) {
                    preferenceMenuRef.current.style.right = '0'
                } else {
                    preferenceMenuRef.current.style.left = '0'
                }
            }
        }
    }, [open]);

    return (
        <div className={'userPreference'}>
            <button className={'btn openPreferenceMenuButton'} onClick={onOpenHandler} aria-label={'preference'}>
                <FontAwesomeIcon className={'gearIcon'} icon={faGear} width={20} height={20}/>
                <FontAwesomeIcon className={'earthIcon'} icon={faEarthAmerica} width={18} height={18}/>
            </button>
                <div className={`preferenceMenu ${open?'preferenceMenuOpened':'preferenceMenuClosed'}`} ref={preferenceMenuRef}>
                    {uniqueData?.languagesSwitcher &&
                        <div className={'preferenceMenuItem'}>
                              <span className={'preferenceMenuItemTitle'}>
                                    <FontAwesomeIcon icon={faEarthAmerica}/>
                                  {/*{dictionary?.['Language'] || 'Language'}:*/}
                              </span>
                            <LanguagesSwitcher locale={locale}/>
                        </div>
                    }

                    {uniqueData?.themeColorsSwitcher &&
                        <div className={'preferenceMenuItem'}>
                            <span className={'preferenceMenuItemTitle'}>
                                  <FontAwesomeIcon icon={faSun}/>
                                {/*{dictionary?.['Theme'] || 'Theme'}:*/}
                            </span>
                            <DayModeNightMode uniqueData={uniqueData}/>
                        </div>
                    }
                </div>
        </div>
    )
};
export default UserPreferenceConfigWidget
