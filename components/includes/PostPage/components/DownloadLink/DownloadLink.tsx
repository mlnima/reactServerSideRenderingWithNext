import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {FC} from "react";

const DownloadLinkStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 5px;
  
  .download-text{
    margin: 0 3px;
  }

  .single-download-link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: 100px;
    height: 24px;
  }

  .multiple-download-links {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

  }

  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
  }

`

interface DownloadLinkPropTypes{
    downloadLink:string,
    render:string|number,
    downloadLinks:{
        url:string,
        title:string
    }[]
}

const DownloadLink:FC<DownloadLinkPropTypes> = ({ downloadLink, render, downloadLinks}) => {
    const {t} = useTranslation('common');
    if (render) {
        return (
            <DownloadLinkStyledDiv>
                <span className={'download-text'}>
                    {t([t('Download', {ns: 'common'}), t('Download', {ns: 'customTranslation'})])}:
                </span>
                <div className={'multiple-download-links'}>

                    {downloadLinks?.length ?
                        downloadLinks.map(link => {
                            return (
                                <a href={link.url}
                                   target={'_blank'}
                                   className={'btn btn-primary'}
                                   rel={'noreferrer'}
                                   title={t(`Download`)}
                                >
                                    <span>{link.title}</span>
                                </a>
                            )
                        })
                        : null
                    }
                </div>
                {downloadLink ?
                    <a className={'single-download-link btn btn-primary'}
                       href={downloadLink}
                       target={'_blank'}
                       title={t([
                               t('Download', {ns: 'common'}),
                               t('Download', {ns: 'customTranslation'})
                           ])}
                    >
                        <span style={{display: 'none'}}>download link for post</span>
                        <FontAwesomeIcon icon={faDownload}
                                         style={{width: '24px', height: '24px'}}
                                         className={'download-logo'}/>
                    </a>
                    : null
                }
            </DownloadLinkStyledDiv>
        );
    } else return null

};

export default DownloadLink;