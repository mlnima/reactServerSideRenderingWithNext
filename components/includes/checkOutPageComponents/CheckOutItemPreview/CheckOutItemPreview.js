import React from 'react';
import ItemCountUI from "./ItemCountUI";
import {useRouter} from "next/router";
import styled from "styled-components";

let StyledDiv = styled.div`
 width: 100%;
  display: flex;
  align-items: center;
  border: solid 1px white;
  padding: 0;
  background-color: white;
  margin: 5px 0;

  .check-out-item-preview-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    .count-remove {
      display: flex;
      align-items: center;
      //justify-content: space-between;
      margin: 10px 0;
      .check-out-item-remove {
        width: 50px;
        height: 40px;
        background-color: transparent;
        border: .5px solid;
        border-radius: 0;
        margin: 0 5px;
        .check-out-item-remove-icon {
          padding: 2px 5px;
          width: 16px;
          height: 16px;
        }
      }
      .check-out-item-count{

        background-color: transparent;
        border: .5px solid;
        border-radius: 0;
        padding: 1px 6px;
        height: 38px;
        //margin: 0 30px ;
      }
    }
  }

  img {
    margin: 0 10px;
    width: 100px;
  }
  @media only screen and (min-width: 769px) {
    .check-out-item-preview-title {
      .count-remove {
        .check-out-item-remove {
          margin: 0 20px;
          .check-out-item-remove-icon {

          }
        }
        .check-out-item-count{

        }
      }
    }
 

}
`



const CheckOutItemPreview = props => {

    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || ''
    const onRemoveItemFromBasketHandler = () => {
        // const items = contextData.checkOutData.items.filter(i => i.productId !== props.productId)
        // contextData.setCheckOutData({
        //     ...contextData.checkOutData,
        //     items
        // })
        // localStorage.setItem('checkOutItems', JSON.stringify(items))
    }

    const FullDataForFinalPage = () => {
        return (
            <>
                <span>{props.eCommerce?.data?.currencySymbol ?? ' € '}{Number(props.price) * Number(props.count)}</span>
                {props.shippingCost ?
                    <>
                     <span>{props?.eCommerce?.data?.translations?.[locale]?.shippingCostText || 'Shipping Cost'} :</span>
                     <span>
                        + {props.eCommerce?.data?.currencySymbol ?? ' € '} {props.shippingCost}
                    </span>
                    </>
                    : null}
                <div className='count-remove'>
                    <button className='check-out-item-remove' onClick={() => onRemoveItemFromBasketHandler()}>
                        {/*<FontAwesomeIcon className='check-out-item-remove-icon' icon={faTrash}/>*/}
                    </button>
                    <ItemCountUI count={props.count} productId={props.productId}/>
                </div>

            </>
        )
    }

    return (
        <StyledDiv className='check-out-item-preview'>
            <img src={props.mainThumbnail} alt={props.title}/>
            <div className='check-out-item-preview-title'>
                <h4>{props?.translations?.[locale]?.title || props.title} </h4>
                <FullDataForFinalPage/>
            </div>
        </StyledDiv>
    );
};
export default CheckOutItemPreview;
