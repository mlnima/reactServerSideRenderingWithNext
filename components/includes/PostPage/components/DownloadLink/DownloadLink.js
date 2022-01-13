import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

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

const DownloadLink = ({t, downloadLink, render, downloadLinks}) => {
    if (render) {
        return (
            <DownloadLinkStyledDiv target='_blank'
                                   rel="noreferrer"

            >
                <span className={'download-text'}>{t([`common:Download`, t(`customTranslation:Download`)])}:</span>
                <div className={'multiple-download-links'}>

                    {downloadLinks.length ?
                        downloadLinks.map(link => {
                            return (
                                <a href={link.url}
                                   target='_blank'
                                   className={'btn btn-primary'}
                                   rel={'noreferrer'}
                                   title={t([`common:Download`, t(`customTranslation:Download`)])}
                                >
                                    <span>{link.title}</span>
                                </a>
                            )
                        })
                        : null
                    }
                </div>
                {downloadLink ?
                    <a className={'single-download-link btn btn-primary'} href={downloadLink} title={t([`common:Download`, t(`customTranslation:Download`)])}>
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

export default withTranslation(['common'])(DownloadLink);