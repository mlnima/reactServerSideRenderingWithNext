import React, {FC} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {useAppSelector} from "@store_toolkit/hooks";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const Style = styled.div`
  background-color: var(--navigation-background-color, #000);
  width: 100%;
  .breadcrumbs{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 0 5px;
    padding: 5px 0;

    .breadcrumbs-item {
      margin-right: 5px;
      .breadcrumbs-link {
        color: var(--navigation-text-color, #ccc);
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          color: var(--main-active-color, #f90);
        }

        span{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 80vw;
        }
        
        .breadcrumbList-arrow {

        }
      }
    }
  }

`

interface BreadcrumbListPropTypes {
}

const BreadcrumbList: FC<BreadcrumbListPropTypes> = (props) => {
    const {asPath} = useRouter()

    const siteName = useAppSelector(({settings}) => settings?.identity?.siteName || 'Home')

    const linkPath = asPath.split('/');
    //const linkPath =useMemo(()=>asPath.split('/'),[asPath])

    linkPath.shift();



    const renderListItems = linkPath.map((path, index) => {

        const normalPath = `/${linkPath.slice(0, index + 1).join('/')}`
        const overWritePath = normalPath === '/post' ? '/posts' :
            normalPath.includes('post/video') ? '/posts?postType=video' :
                normalPath.includes('post/article') ? '/posts?postType=article' :
                    normalPath.includes('post/promotion') ? '/posts?postType=promotion' :
                        normalPath.includes('post/learn') ? '/posts?postType=learn' :
                            normalPath === '/category' ? '/categories' :
                                normalPath === '/tag' ? '/tags' :
                                    normalPath === '/actor' ? 'actors' :
                                        normalPath

        const itemData = {
            breadcrumb: path,
            href: overWritePath
        }

        return (
            <li className="breadcrumbs-item"
                itemProp="itemListElement"
                key={index}
                itemScope
                itemType="https://schema.org/ListItem">
                <Link href={itemData.href}>
                    <a itemProp="item" className="breadcrumbs-link">
                        <SvgRenderer svgUrl={'/public/asset/images/icons/chevron-right-solid.svg'}
                                     size={10}
                                     customClassName={'breadcrumbList-arrow icon'}
                                     color={'var(--navigation-text-color,#ccc)'}
                        />
                        <span itemProp="name">  {itemData.breadcrumb.substring(0,20)}</span>
                    </a>
                </Link>
                <meta itemProp="position" content={(index + 2).toString()}/>
            </li>
        )
    });

    return (
        <Style className={'breadcrumbs-area'}>
            <ol className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList">
                <li className="breadcrumbs-item"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem">
                    <Link href={'/'}>
                        <a itemProp="item" className="breadcrumbs-link">
                            <span itemProp="name">{siteName  || 'Home'} </span>
                        </a>
                    </Link>
                    <meta itemProp="position" content={'1'}/>
                </li>
                {renderListItems}
            </ol>
        </Style>
    )
};
export default BreadcrumbList
