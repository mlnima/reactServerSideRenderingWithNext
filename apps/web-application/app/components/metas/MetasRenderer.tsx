import React, {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter, convertMetasTypeToSingular} from "custom-util";
import {groupingArrayOfObjectByKey} from "custom-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesDown} from "@fortawesome/free-solid-svg-icons";
import './MetasRenderer.styles.scss'

interface MetasRendererPropTypes {
    metaData: Meta[] | undefined,
    metaType: string,
    locale: string,
    startWith?: string
    isWidget?: boolean
}

const MetasRenderer: FC<MetasRendererPropTypes> = ({metaType, metaData, locale, startWith, isWidget}) => {

    const typePath = convertMetasTypeToSingular(metaType)
    const groupMetas = groupingArrayOfObjectByKey(metaData as any, 'name')

    return (
        <div className={`metaRenderer`}>
            <div className={'lettersContainer '}>
                {Object.keys(groupMetas || []).sort((a, b) => a > b ? 1 : -1).map(group => {
                    return (
                        <article className={'groupWrapper'} key={group}>
                            <div className={'groupWrapperHeader'}>
                                    <span className={'letter'}>
                                        {capitalizeFirstLetter(group)}
                                    </span>
                            </div>
                            <div className={'items '}>
                                {/*//@ts-ignore*/}
                                {groupMetas[group].map((meta) => {
                                    const name = capitalizeFirstLetter(
                                        meta?.translations?.[locale]?.name ??
                                        meta.name
                                    )
                                    return (
                                        <Link className={`metaWidgetItem `}
                                              key={meta._id}
                                              href={`/${typePath}/${meta._id}`}
                                              title={name}>
                                            {name}
                                        </Link>
                                    )
                                })}
                                {!startWith &&
                                    <Link href={`/${metaType}?startWith=${group === '#' ? 'digits' : group}`}
                                          aria-label={metaType}
                                          title={`all the ${metaType} starts with ${group}`}>
                                        <span className={`view-all flex items-center justify-start text-primary-active-color 
                                        text-lg font-bold m-2.5 min-h-12 md:text-sm md:h-auto`}>
                                            <FontAwesomeIcon icon={faAnglesDown} style={{width: 28, height: 20}}/>
                                        </span>
                                    </Link>
                                }
                            </div>
                        </article>
                    )
                })}
            </div>

        </div>
    )
};
export default MetasRenderer
