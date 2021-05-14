import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";

const Price = ({currency, price}) => {

    return (
        <div className='price-information'>
            <style jsx>{`
                .price-information{
                margin: 0 20px;
                display: flex;
                align-items: center;
                font-size: 25px;
                font-weight: bold;
                color:var(--post-page-info-color);
                }
                .price-info-logo{
                width: 23px;
                height: 23px
                color:var(--post-page-info-color);
                }
            `}</style>
            <FontAwesomeIcon icon={currency === 'Usd' ? faDollarSign : faEuroSign} className='price-info-logo'/>
            <p>{price}</p>
        </div>
    )
};
export default Price;
