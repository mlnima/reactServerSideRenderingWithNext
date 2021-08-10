import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const DownloadLink = props => {
    if (props.render) {
        return (
            <a href={props.downloadLink} target='_blank' className='download-link' rel="noreferrer">
                <style jsx>{`
                  .download-link {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 5px 20px;
                    margin: 0 5px;
                    color: var(--meta-text-color);
                    text-decoration: none;
                    width: 100px;
                    height: 24px;
                    background-color: var(--meta-background-color);
                  }
                  .download-logo {
                    color: var(--post-page-info-color);
                  }
                `}</style>
                <span style={{display: 'none'}}>download link for post</span>
                <FontAwesomeIcon icon={faDownload} style={{width: '24px', height: '24px'}} className='download-logo'/>
            </a>


        );
    } else return null

};
export default DownloadLink;