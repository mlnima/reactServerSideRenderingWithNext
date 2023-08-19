import React, {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter, convertMetasTypeToSingular} from "custom-util";
import {groupingArrayOfObjectByKey} from "custom-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesDown} from "@fortawesome/free-solid-svg-icons";

interface MetasRendererPropTypes {
    metaData: Meta[] | undefined,
    metaType: string,
    locale: string
}

const MetasRenderer: FC<MetasRendererPropTypes> = ({metaType, metaData, locale}) => {

    const typePath = convertMetasTypeToSingular(metaType)
    const groupMetas = groupingArrayOfObjectByKey(metaData as any, 'name')

    return (
        <div className={`flex justify-center items-center flex-col max-w-full w-full`}>
            <div className={'letters-container w-full md:columns-3xs md:m-auto md:p-0'}>
                {Object.keys(groupMetas || []).sort((a, b) => a > b ? 1 : -1).map(group => {
                    return (
                        <article className={'group-wrapper'} key={group}>
                            <Link href={`/${metaType}?startWith=${group === '#' ? 'digits' : group}`}
                                  aria-label={metaType}
                                  title={`all the ${metaType} starts with ${group}`}>
                                <span
                                    className={'letter m-2.5 text-2xl text-secondary-text-color'}>
                                    {capitalizeFirstLetter(group)}
                                </span>
                            </Link>

                            <div className={'items flex flex-wrap w-full gap-2 '}>
                                {/*//@ts-ignore*/}
                                {groupMetas[group].map((meta) => {
                                    const name = capitalizeFirstLetter(
                                        meta?.translations?.[locale]?.name ??
                                        meta.name
                                    )
                                    return (
                                        <Link className={`meta-widget-item max-w-64 block
                                          list-none truncate py-3 px-1.5 min-h-12 rounded
                                          text-secondary-text-color cursor-pointer break-words
                                          bg-secondary-background-color md:bg-primary-background-color
                                          md:p-1`}
                                              key={meta._id}
                                              href={`/${typePath}/${meta._id}`}
                                              title={name}>
                                            {name}
                                        </Link>
                                    )
                                })}
                                <Link href={`/${metaType}?startWith=${group === '#' ? 'digits' : group}`}
                                      aria-label={metaType}
                                      title={`all the ${metaType} starts with ${group}`}>
                                        <span className={`view-all flex items-center justify-start text-primary-active-color 
                                        text-lg font-bold m-2.5 min-h-12 md:text-sm md:h-auto`}>
                                            <FontAwesomeIcon icon={faAnglesDown}/>
                                        </span>
                                </Link>

                            </div>

                        </article>
                    )
                })}
            </div>

        </div>
    )
};
export default MetasRenderer
