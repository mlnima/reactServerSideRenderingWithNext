import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";

const TopLeft = props => {
    return (
        <span className='top-left post-element-info-data'>
            <style jsx>{`
                      .top-left{
                        left: 3px;
                        top: 3px;
                      }
                `}</style>
            <span className='view-count value-next-icon'>%{props.rating}</span>
            <FontAwesomeIcon  style={props.svgDefaultStyle} icon={faThumbsUp} className='post-element-info-logo'/>
        </span>
    );
};
export default TopLeft;
