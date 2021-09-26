import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const DownloadLinkStyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
  margin: 0 5px;
  color: var(--meta-text-color,#000);
  text-decoration: none;
  width: 100px;
  height: 24px;
  background-color: var(--meta-background-color,#f90);
  .download-logo {
    color: var(--post-page-info-color,#ccc);
  }
`

const DownloadLink = ({t, downloadLink, render}) => {
    if (render) {
        return (
            <DownloadLinkStyledLink href={downloadLink} target='_blank' className='download-link' rel="noreferrer" title={t([`common:Download`, t(`customTranslation:Download`)])}>
                <span style={{display: 'none'}}>download link for post</span>
                <FontAwesomeIcon icon={faDownload} style={{width: '24px', height: '24px'}} className='download-logo'/>
            </DownloadLinkStyledLink>
        );
    } else return null

};

export default withTranslation(['common'])(DownloadLink);