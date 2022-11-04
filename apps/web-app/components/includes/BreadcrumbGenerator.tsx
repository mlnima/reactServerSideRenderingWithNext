import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import useTranslation from "next-translate/useTranslation";
import _breadcrumbLinkCorrector from "@_variables/_clientVariables/clientVariables/_breadcrumbLinkCorrector";
import {useAppSelector} from "@store_toolkit/hooks";
import {mongoIdValidator,capitalizeFirstLetter} from "custom-util";
import SvgRenderer from "../global/commonComponents/SvgRenderer/SvgRenderer";
import {postTypes} from "data-structures";

const overrideCrumbWithQueryName =  (name : string,asPath:string)=>{

    const matchPaths = postTypes.reduce((finalMatches,currentPostType)=>{
        finalMatches[`${currentPostType}s`] = new RegExp(`posts\\?postType=${currentPostType}`,'g')
        return finalMatches
    },{})

    for (const matchPath in matchPaths){
        if (matchPaths[matchPath].test(name)){
            return matchPath
        }
    }

    const ifIsSearchPageRegex = new RegExp(/\/search\/(.*?)\\?page=/g)
    if (ifIsSearchPageRegex.test(asPath) && name !== 'search'){
       // const keyword = new RegExp(/\/search\/(.*?)\\?page=/g)
        const keywordRegex = new RegExp(/(?<=\/search\/\s*).*?(?=\s*\\?page=)/gs)
        const keyword = asPath.match(keywordRegex)?.[0]?.replace('?','')
        return keyword
    }
    return name
}

const BreadcrumbGenerator = ({}) => {

    const {asPath,query} = useRouter();
    const {t} = useTranslation();
    const currentPageTitle = useAppSelector(({globalState}) => globalState.headData?.title)

    const [breadcrumbs, setBreadcrumbs] = useState(null)

    useEffect(() => {

        if (asPath) {
            const linkPath = asPath?.split('/');
            linkPath.shift();

            const pathArray = linkPath.map((path, i) => {
                return {
                    breadcrumb: path,
                    href: '/' + linkPath.slice(0, i + 1).join('/')
                };
            });
            setBreadcrumbs(pathArray);
        }
    }, [asPath]);

    if (!breadcrumbs) {
        return null;
    }

    return (
        <>
            <div className={'breadcrumb-item'}>
                <Link href="/" className={'breadcrumb-item-link'}>
                        <SvgRenderer svgUrl={'/asset/images/icons/home-solid.svg'}
                                     size={20}
                                     customClassName={'breadcrumb-item-icon'}
                                     color={'var(--navigation-text-color, #ccc)'}/>
                </Link>
            </div>
            {!!breadcrumbs.length && breadcrumbs.map((breadcrumb, index) => {
                const crumbName = overrideCrumbWithQueryName(breadcrumb.breadcrumb,asPath)
                return (
                    <div key={index} className={'breadcrumb-item'}>
                        <Link href={_breadcrumbLinkCorrector(breadcrumb.href)} key={index} className={'breadcrumb-item-link'}>
                                <SvgRenderer svgUrl={'/asset/images/icons/sort-up-solid.svg'}
                                             size={20}
                                             customClassName={'breadcrumb-item-arrow-icon'}
                                             color={'var(--navigation-text-color, #ccc)'}/>
                                {mongoIdValidator(breadcrumb.breadcrumb) ?
                                    currentPageTitle : t(  capitalizeFirstLetter(crumbName))}
                                {query.page && crumbName!== 'search' ?  ` ${query.page}` : null }
                        </Link>
                    </div>
                )
            })

            }
        </>
    )
};

export default BreadcrumbGenerator;
