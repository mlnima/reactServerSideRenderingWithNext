import React, {FC, useEffect, useMemo} from "react";
import {Meta} from "@_typeScriptTypes/Meta";
import styled from "styled-components";
import Link from "next/link";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import MetaElement from "@components/includes/metasPage/MetaElement";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const MetasRendererStyle = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .letters-container {
    margin: auto;

    .group-wrapper {
      margin: 20px auto;

      .letter {
        margin: 3px 5px;
        font-size: xx-large;
        color: var(--meta-text-color, #ccc);
      }

      .items {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .meta-widget-item {
          display: block;
          list-style: none;
          text-overflow: ellipsis;
          padding: 3px 6px;
          margin: 2px 5px;
          background-color: var(--meta-background-color, #f90);

          a {
            display: inline-block;
            font-size: large;
            color: var(--meta-text-color, #ccc);
            cursor: pointer;
            text-decoration: none;
          }
        }

        .view-all {
          display: flex;
          align-items: center;
          color: var(--main-active-color, #f90);
          font-size: large;
          font-weight: bold;
          padding: 3px 6px;
          margin: 2px 5px;
          .view-all-arrow-icon{
            rotate: 90deg;
          }
        }
      }

    }
  }

  .show-more-link {
    margin: auto;
  }


  @media only screen and (min-width: 768px) {

    .letters-container {
      columns: 200px 5;
      margin: auto;
      padding: 0;
      width: 90%;

      .group-wrapper {

        .items {
          .meta-widget-item {
            padding: 2px;

            a {
              font-size: small;
            }
          }

          .view-all {
            font-size: small;
          }
        }
      }
    }
  }
`

interface MetasRendererPropTypes {
    metaData: Meta[],
    metaType: string
}

const MetasRenderer: FC<MetasRendererPropTypes> = ({metaType, metaData}) => {

    const {t} = useTranslation()
    const {query, pathname,push} = useRouter()

    const typePath = useMemo(() => {
        return metaType === 'tags' ? 'tag' :
            metaType === 'categories' ? 'category' :
                metaType === 'actors' ? 'actor' : 'category'
    }, [metaData])

    const groupMetas = useMemo(() => {
        if (!!metaData.length){
            return metaData.reduce((finalData, current) => {
                const firstLetter = current?.name?.[0]
                finalData[firstLetter] = [...(finalData?.[current.name?.[0]] || []), current]
                return finalData
            }, {})
        }else return []
    }, [metaData])

    useEffect(() => {
         if (!query.startWith && query.hasOwnProperty('startWith')){
             const targetUrl ={
                 pathname: pathname,
                 query: {...query}
             }
             delete targetUrl.query.startWith

             push(targetUrl)
         }

    }, [query]);

    return (
        <MetasRendererStyle>
            <div className={'letters-container'}>
                {Object.keys(groupMetas).sort((a, b) => a > b ? 1 : -1).map(group => {
                    return (
                        <div className={'group-wrapper'} key={group}>
                            <Link href={`/${metaType}?startWith=${group === '#' ? 'digits' : group}`}>
                                <a>
                                    <h2 className={'letter'}>{capitalizeFirstLetter(group)}</h2>
                                </a>
                            </Link>

                            <div className={'items'}>
                                {groupMetas[group].map(meta => {
                                    return (
                                        <MetaElement typePath={typePath} id={meta._id} key={meta._id}
                                                     name={`${capitalizeFirstLetter(meta.name)}`}/>
                                    )
                                })}
                                {((!query?.startWith && /\/tags|\/categories/.test(pathname)) ||
                                !/\/tags|\/categories/.test(pathname)) &&
                                <Link href={`/${metaType}?startWith=${group === '#' ? 'digits' : group}`}>
                                    <a>
                                        <span className={'view-all'}>
                                            {t('common:View All', {}, {fallback: 'View All'})}
                                            <SvgRenderer svgUrl={'/public/asset/images/icons/sort-up-solid.svg'}
                                                         size={20}
                                                         customClassName={'view-all-arrow-icon'}
                                                         color={'var(--main-active-color, #f90)'}/>
                                        </span>
                                    </a>
                                </Link>
                                }
                            </div>

                        </div>
                    )
                })}
            </div>

        </MetasRendererStyle>
    )
};
export default MetasRenderer
