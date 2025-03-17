import styled from "styled-components";
import {FC,} from "react";
import {useSearchParams} from "react-router-dom";
import paramsQueryGenerator from "@variables/paramsQueryGenerator";

const ArraySectionStyledDiv = styled.div`
  button{
    border: none;
    margin: 2px;
    font-size: 12px;
  }
`

interface RenderArraySectionPropTypes{
    data:{
        _id:string,
        name:string,
    }[]
}

const RenderArraySection :FC<RenderArraySectionPropTypes> = ({data}) => {
  const searchParams = useSearchParams();
    const [search, setSearch] = useSearchParams();
    const paramsQueries = paramsQueryGenerator(search)
    // const {query,pathname,push} = useRouter()

    const onClickHandler = (_id:string) => {
        const queryData = {...paramsQueries as {}, metaId:_id}
        // @ts-ignore
        delete queryData.keyword
        // @ts-ignore
        delete queryData.page
        // push({
        //     pathname,
        //     query :queryData
        // }).finally()



    }

    const renderArrItem = (data || []).map((item,index) => {
        return (
                <button key={`${item._id}${index}`} className={'btn btn-primary'} onClick={()=>onClickHandler(item._id)}>
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
