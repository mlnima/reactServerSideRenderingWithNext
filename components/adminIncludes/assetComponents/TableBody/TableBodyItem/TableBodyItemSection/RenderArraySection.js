import {useRouter} from "next/router";
import styled from "styled-components";


const ArraySectionStyledDiv = styled.div`
  button{
    border: none;
    margin: 2px;
    font-size: 12px;
  }

`

const RenderArraySection = props => {
    const router = useRouter()

    const onClickHandler = (_id) => {
        console.log('onClickHandler')
        const query = {...router.query, metaId:_id}
        delete query.keyword
        delete query.page
        router?.push({
            pathname: router.pathname,
            query
        })
    }


    const renderArrItem = (props.data || []).map((item,index) => {
        return (
                <button key={index} className={'btn btn-primary'} onClick={()=>onClickHandler(item._id)}>
                    {item.name}
                </button>
        )
    })

    return (
        <ArraySectionStyledDiv className='asset-page-item-array-section'>
            {renderArrItem}
        </ArraySectionStyledDiv>
    );
};
export default RenderArraySection;
