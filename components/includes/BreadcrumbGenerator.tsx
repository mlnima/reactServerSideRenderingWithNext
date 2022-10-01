import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import useTranslation from "next-translate/useTranslation";
import _breadcrumbLinkCorrector from "@_variables/clientVariables/_breadcrumbLinkCorrector";
import {useAppSelector} from "@store_toolkit/hooks";
import mongoIdValidator from "@_variables/util/mongoIdValidatorClient";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const BreadcrumbGenerator = ({}) => {

    const {asPath} = useRouter();
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
                <Link href="/">
                    <a className={'breadcrumb-item-link'}>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/home-solid.svg'}
                                     size={20}
                                     customClassName={'breadcrumb-item-icon'}
                                     color={'var(--navigation-text-color, #ccc)'}/>
                    </a>
                </Link>
            </div>
            {!!breadcrumbs.length && breadcrumbs.map((breadcrumb, index) => {
                return (
                    <div key={index} className={'breadcrumb-item'}>
                        <Link href={_breadcrumbLinkCorrector(breadcrumb.href)} key={index}>
                            <a className={'breadcrumb-item-link'}>
                                <SvgRenderer svgUrl={'/public/asset/images/icons/sort-up-solid.svg'}
                                             size={20}
                                             customClassName={'breadcrumb-item-arrow-icon'}
                                             color={'var(--navigation-text-color, #ccc)'}/>
                                {mongoIdValidator(breadcrumb.breadcrumb) ?
                                    currentPageTitle : t(capitalizeFirstLetter(breadcrumb.breadcrumb))}
                            </a>
                        </Link>
                    </div>
                )
            })

            }
        </>
    )
};


// Breadcrumbs.defaultProps = defaultProps;

export default BreadcrumbGenerator;

