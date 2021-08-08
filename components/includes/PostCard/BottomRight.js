import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";

const BottomRight = props => {

    return (
        <span className='bottom-right post-element-info-data'>
            <style jsx>{`
                      .bottom-right{
                            position: absolute;
                            right: 3px;
                            bottom: 43px;
                            margin: auto;
                      }
                `}</style>
                 <FontAwesomeIcon style={{width:'24px',height:'24px'}} icon={faEye} className='post-element-info-logo'/>
                 <span className='view-count value-next-icon'>{props.views}</span>

         </span>
    );
};
export default BottomRight;
