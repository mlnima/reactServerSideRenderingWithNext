import React, {FC, useEffect, useMemo} from "react";
import {Meta} from "typescript-types";
import styled from "styled-components";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import MetaElement from "./MetaElement";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import SvgRenderer from "../../global/commonComponents/SvgRenderer/SvgRenderer";

const MetasRendererStyle = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  //margin: 8px;
  //box-sizing: border-box;

  .letters-container {
    //margin: 0;
    //box-sizing: border-box;
    width: 100%;
    .group-wrapper {
  
      
      .letter {
        margin: 10px;;
        font-size: xx-large;
        color: var(--secondary-text-color, #ccc);
      }

      .items {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .meta-widget-item {
          max-width: 250px;
          display: block;
          list-style: none;
          text-overflow: ellipsis;
          padding: 14px 10px;
          background-color: var(--secondary-background-color, #181818);
          overflow:hidden;
          a {
            overflow:hidden;
            font-size: large;
            min-height: 48px;
            color: var(--secondary-text-color, #ccc);
            cursor: pointer;
            text-decoration: none;
            overflow-wrap: break-word;
        
          }
        }

        .view-all {
          display: flex;
          align-items: center;
          color: var(--main-active-color, #f90);
          font-size: large;
          font-weight: bold;
          //padding: 3px 6px;
          margin: 10px;;
          min-height: 48px;
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
      //width: 90%;

      .group-wrapper {
        
        a{
          .letter{
            margin: 0;
            padding: 5px;
          }
        }
        .items {
          .meta-widget-item {
            padding: 5px;
            a {
              //padding: 2px;
              font-size: initial;
              min-height: auto;
            }
          }

          .view-all {
            font-size: small;
            min-height: auto;
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
                                    <h2 className={'letter'}>{capitalizeFirstLetter(group)}</h2>
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
                                        <span className={'view-all'}>
                                            {t('common:View All', {}, {fallback: 'View All'})}
                                            <SvgRenderer svgUrl={'/asset/images/icons/sort-up-solid.svg'}
                                                         size={20}
                                                         customClassName={'view-all-arrow-icon'}
                                                         color={'var(--main-active-color, #f90)'}/>
                                        </span>
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
