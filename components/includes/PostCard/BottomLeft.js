import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";

const BottomLeft = props => {

    return (
        <span className='bottom-left post-element-info-data'>
            <style jsx>{`
                      .bottom-left{
                            left: 3px;
                            bottom: 43px;
                      }
                `}</style>
               {props.type === 'product' ?
                <>
                    <FontAwesomeIcon style={{width:'24px',height:'24px'}} icon={props?.state?.currency === 'Usd' ? faDollarSign : faEuroSign} className='post-element-info-logo' style={props.svgDefaultStyle}/>
                    <span className='value-next-icon'>{props.price}</span>
                </> : (props.type === 'video' && props.duration) || props.type === 'redirect' ?
                    <>
                        <span className='value-next-icon'>  {props.duration}</span>
                    </>
                    : null
            }

        </span>
    )


};
export default BottomLeft;
