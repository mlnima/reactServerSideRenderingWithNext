import styled from "styled-components";

let StyledDiv = styled.div`
  border: .2px solid black;
  width: 100px;
  padding: 0 2px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button{
    border: none;
    outline: none;
    background-color: transparent;
    .item-count-ui-btn{
      width: 10px;
      height: 10px;
    }
  }
`
const ItemCountUI = props => {

    // const changeAmountItems = valueData =>{
    //     if (props.count>0 || (props.count===0 && valueData === 1)){
    //         const items = contextData.checkOutData.items.map(item=>{
    //             if (item.productId === props.productId){
    //                 let currentCount = parseInt(item.count)
    //                 item.count = currentCount +  valueData
    //             }
    //             return item
    //         })
    //
    //         contextData.setCheckOutData({
    //             ...contextData.checkOutData,
    //             items
    //         })
    //         localStorage.setItem('checkOutItems',JSON.stringify(items))
    //     }else if(props.count===0 ){
    //         const items = contextData.checkOutData.items.filter(item=>item.productId !==props.productId )
    //         contextData.setCheckOutData({
    //             ...contextData.checkOutData,
    //             items
    //         })
    //         localStorage.setItem('checkOutItems',JSON.stringify(items))
    //
    //     }
    // }

    return (
        <StyledDiv className='item-count-ui'>
            {/*<button disabled={props.count<=1} onClick={()=>changeAmountItems(-1)}></button>*/}
            {/*  {props.count}*/}
            {/*<button onClick={()=>changeAmountItems(1)}><FontAwesomeIcon className='item-count-ui-btn'  icon={faPlus}/></button>*/}
        </StyledDiv>
    );
};
export default ItemCountUI;
