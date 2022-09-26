import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import {FC} from "react";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

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
    height: 40px;
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
    const {t} = useTranslation();
    if (render) {
        return (
            <DownloadLinkStyledDiv>
                <span className={'download-text'}>
                    {t(`common:Download`, {}, {fallback:'Download'})}
                </span>
                <div className={'multiple-download-links'}>

                    {downloadLinks?.length ?
                        downloadLinks.map(link => {
                            return (
                                <a href={link.url}
                                   target={'_blank'}
                                   className={'btn btn-primary'}
                                   rel={'noreferrer'}
                                   title= {t(`common:Download`, {}, {fallback:'Download'})}
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
                       title= {t(`common:Download`, {}, {fallback:'Download'})}
                    >
                        <span style={{display: 'none'}}>download link for post</span>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/download-solid.svg'}
                                     size={25}
                                     customClassName={'download-logo'}
                                     color={'var(--primary-button-link-text-color, #000)'}/>
                    </a>
                    : null
                }
            </DownloadLinkStyledDiv>
        );
    } else return null

};

export default DownloadLink;