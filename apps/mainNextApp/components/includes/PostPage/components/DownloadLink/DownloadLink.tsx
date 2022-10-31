import useTranslation from 'next-translate/useTranslation'
import {FC} from "react";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";

interface DownloadLinkPropTypes {
    downloadLink?: string,
    downloadLinks?: {
        url: string,
        title: string
    }[]
}

const DownloadLink: FC<DownloadLinkPropTypes> = ({downloadLink, downloadLinks}) => {
    const {t} = useTranslation();
    return (
        <div className={'download-button'}>
                    <a className={'download-link'}
                       href={downloadLink}
                       target={'_blank'}
                       title={t(`common:Download`, {}, {fallback: 'Download'})}>

                        <span style={{display: 'none'}}>download link for post</span>
                        <SvgRenderer svgUrl={'/asset/images/icons/download-solid.svg'}
                                     size={16}
                                     customClassName={'download-logo'}/>
                        <p className={'download-text'}>
                            {t(`common:Download`, {}, {fallback: 'Download'})}
                        </p>

                    </a>

        </div>
    );

};

export default DownloadLink;

// <div className={'multiple-download-links'}>
//
//     {downloadLinks?.length ?
//         downloadLinks.map(link => {
//             return (
//                 <a href={link.url}
//                    target={'_blank'}
//                    className={'btn btn-primary'}
//                    rel={'noreferrer'}
//                    title= {t(`common:Download`, {}, {fallback:'Download'})}
//                 >
//                     <span>{link.title}</span>
//                 </a>
//             )
//         })
//         : null
//     }
// </div>