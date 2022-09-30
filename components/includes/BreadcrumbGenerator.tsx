import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { Link as MUILink } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/router';
import useTranslation from "next-translate/useTranslation";
import _breadcrumbLinkCorrector from "@_variables/clientVariables/_breadcrumbLinkCorrector";
import {useAppSelector} from "@store_toolkit/hooks";
import mongoIdValidator from "@_variables/util/mongoIdValidatorClient";
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const getPathFromUrl = function getPathFromUrl(url) {
    return url.split(/[?#]/)[0];
};


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
            <HomeIcon/>
            <Link href="/">
                <MUILink  color="inherit">

                </MUILink>
                {/*{t(`common:Home`, {}, {fallback: 'Home'})}*/}
            </Link>

            {!!breadcrumbs.length && breadcrumbs.map((breadcrumb, index) => {
                return (
                    <React.Fragment key={index}>
                        <ChevronRightIcon key={index+'icon'}/>
                        <Link  href={_breadcrumbLinkCorrector(breadcrumb.href)}key={index}  >
                            <MUILink underline="hover" color="inherit" href={_breadcrumbLinkCorrector(breadcrumb.href)} >
                                {mongoIdValidator(breadcrumb.breadcrumb) ? currentPageTitle : breadcrumb.breadcrumb}
                            </MUILink>
                            {/*{convertBreadcrumb(breadcrumb.breadcrumb, labelsToUppercase, replaceCharacterList, transformLabel)}*/}
                        </Link>
                    </React.Fragment>
                )
            })

            }
        </>
    )
};


// Breadcrumbs.defaultProps = defaultProps;

export default BreadcrumbGenerator;

