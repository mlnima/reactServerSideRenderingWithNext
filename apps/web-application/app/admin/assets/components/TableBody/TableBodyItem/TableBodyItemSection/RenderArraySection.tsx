"use client";
import styled from "styled-components";
import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import paramsQueryGenerator from "../../../paramsQueryGenerator";
import { _updateSearchParams } from '@lib/navigationTools';

const ArraySectionStyledDiv = styled.div`
  button {
    border: none;
    margin: 2px;
    font-size: 12px;
  }
`;

interface RenderArraySectionPropTypes {
  data: {
    _id: string;
    name: string;
  }[];
}

const RenderArraySection: FC<RenderArraySectionPropTypes> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const paramsQueries = paramsQueryGenerator(searchParams);

  const onClickHandler = (_id: string) => {
    const newQuery = { ...paramsQueries as {}, metaId: _id };
    delete queryData.keyword;
    delete queryData.page;

    router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
  };

  const renderArrItem = (data || []).map((item, index) => {
    return (
      <button
        key={`${item._id}${index}`}
        className={'btn btn-primary'}
        onClick={() => onClickHandler(item._id)}
      >
        {item.name}
      </button>
    );
  });

  return (
    <ArraySectionStyledDiv className='asset-page-item-array-section'>
      {renderArrItem}
    </ArraySectionStyledDiv>
  );
};

export default RenderArraySection;








// import styled from "styled-components";
// import {FC,} from "react";
// import {useSearchParams} from "react-router-dom";
// import paramsQueryGenerator from "../../../paramsQueryGenerator";
//
// const ArraySectionStyledDiv = styled.div`
//   button{
//     border: none;
//     margin: 2px;
//     font-size: 12px;
//   }
// `
//
// interface RenderArraySectionPropTypes{
//     data:{
//         _id:string,
//         name:string,
//     }[]
// }
//
// const RenderArraySection :FC<RenderArraySectionPropTypes> = ({data}) => {
//     const [search, setSearch] = useSearchParams();
//     const paramsQueries = paramsQueryGenerator(search)
//     // const {query,pathname,push} = useRouter()
//
//     const onClickHandler = (_id:string) => {
//         const queryData = {...paramsQueries as {}, metaId:_id}
//         // @ts-ignore
//         delete queryData.keyword
//         // @ts-ignore
//         delete queryData.page
//         // push({
//         //     pathname,
//         //     query :queryData
//         // }).finally()
//     }
//
//     const renderArrItem = (data || []).map((item,index) => {
//         return (
//                 <button key={`${item._id}${index}`} className={'btn btn-primary'} onClick={()=>onClickHandler(item._id)}>
//                     {item.name}
//                 </button>
//         )
//     })
//
//     return (
//         <ArraySectionStyledDiv className='asset-page-item-array-section'>
//             {renderArrItem}
//         </ArraySectionStyledDiv>
//     );
// };
// export default RenderArraySection;
