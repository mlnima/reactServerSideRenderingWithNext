import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const DownloadLink = props => {
    if (props.render) {
        return (
            <div  className='download-url action-wide-button'>
                <style jsx>{`
                    .download-url{
                        width: 40px;
                        height: 40px;
                    }
                    .download-link{
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color:var(--post-page-info-color);
                        text-decoration: none;
                    }
                    .download-logo{
                        width: 20px ;
                        height: 20px;
                        color:var(--post-page-info-color);
                    }
                `}</style>
                <a  href={ props.downloadLink } target='_blank' className='download-link' rel="noreferrer">
                    <span style={{display:'none'}}>download link for post</span>
                    <FontAwesomeIcon icon={faDownload} className='download-logo'/>
                </a>
            </div>

        );
    } else return null

};
export default DownloadLink;