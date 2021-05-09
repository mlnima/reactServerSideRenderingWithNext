import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";

const BottomLeft = props => {
    // if ((props.type === 'video' && props.duration) || props.type === 'redirect') {
    //     return (
    //         <StyledSpan className='bottom-left'>
    //             <style jsx>{`
    //                   .bottom-left{
    //                         position: absolute;
    //                         left: 3px;
    //                         bottom: 3px;
    //                         display: flex;
    //                         align-items: center;
    //                         padding: 1px 3px;
    //                         border-radius: 3px;
    //                   }
    //                   .value-next-icon{
    //                         margin: 0 5px;
    //                   }
    //                   .post-element-info-logo,.value-next-icon{
    //                     color:var(--post-element-text-color);
    //                   }
    //             `}</style>
    //             <FontAwesomeIcon icon={faClock} className='post-element-info-logo' style={props.svgDefaultStyle}/>
    //             <span className='value-next-icon'>  {props.duration}</span>
    //         </StyledSpan>
    //     );
    // } else if (props.type === 'product') {
    //     return (
    //         <StyledSpan className='bottom-left'>
    //             <style jsx>{`
    //                   .bottom-left{
    //                         position: absolute;
    //                         left: 3px;
    //                         bottom: 3px;
    //                         display: flex;
    //                         align-items: center;
    //                         padding: 1px 3px;
    //                         border-radius: 3px;
    //                   }
    //                   .value-next-icon{
    //                         margin: 0 5px;
    //                   }
    //                   .post-element-info-logo,.value-next-icon{
    //                     color:var(--post-element-text-color);
    //                   }
    //             `}</style>
    //             {props.type === 'product' ?
    //                 <>
    //                     <FontAwesomeIcon icon={props?.state?.currency === 'Usd' ? faDollarSign : faEuroSign} className='post-element-info-logo' style={props.svgDefaultStyle}/>
    //                     <span className='value-next-icon'>{props.price}</span>
    //                 </> : (props.type === 'video' && props.duration) || props.type === 'redirect' ?
    //                     <>
    //                         <FontAwesomeIcon icon={faClock} className='post-element-info-logo' style={props.svgDefaultStyle}/>
    //                         <span className='value-next-icon'>  {props.duration}</span>
    //                     </> : null
    //             }
    //
    //         </StyledSpan>
    //     )
    // } else return null

    return (
        <span className='bottom-left post-element-info-data'>
            <style jsx>{`
                      .bottom-left{
                            left: 3px;
                            bottom: 3px;
                      }
                `}</style>
               {props.type === 'product' ?
                <>
                    <FontAwesomeIcon icon={props?.state?.currency === 'Usd' ? faDollarSign : faEuroSign} className='post-element-info-logo' style={props.svgDefaultStyle}/>
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
