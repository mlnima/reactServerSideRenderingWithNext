import {FC, useId} from "react";
import Link from 'next/link'
import styled from "styled-components";
import rangeNumGenerator from "@_variables/util/rangeNumGenerator";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const WidgetPaginationStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;

  .pagination-item {
    color: var(--main-text-color);
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    .pagination-item{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
    }
  }
`

interface WidgetPaginationPropTypes {
    baseUrl: string,
    totalCount: number,
    count:number
}

const WidgetPagination: FC<WidgetPaginationPropTypes> = ({baseUrl, totalCount,count}) => {
    const id = useId();
    const postsCountPerPage = useSelector(({settings}:StoreTypes) => {
        return settings?.identity?.postsCountPerPage ?
               parseInt(settings?.identity?.postsCountPerPage)
               : 20
    })

    const maxPage = totalCount ? Math.ceil(totalCount / postsCountPerPage) : 0
    const pages = [...rangeNumGenerator(1,maxPage),maxPage]

    return (
        <WidgetPaginationStyledDiv className={'widget-pagination'}>
            {pages.map((pageNumber,index) => {
                if (pageNumber && typeof pageNumber === "number"){
                    return (
                        <Link key={id + index + pageNumber}
                              href={`${baseUrl.includes('?') ? baseUrl + `&page=${pageNumber}` : baseUrl + `?page=${pageNumber}`}`}>
                            <a
                                className='pagination-item'
                                style={{
                                    backgroundColor: pageNumber === 1 && postsCountPerPage === count?
                                        'var(--main-active-color,#f90)' :
                                        'var(--navigation-background-color,#18181b)',
                                    color: pageNumber === 1 && postsCountPerPage === count ?
                                        'var(--navigation-background-color,#18181b)' :
                                        'var(--navigation-text-color,#ccc)'
                                }}
                            >
                                {pageNumber}
                            </a>
                        </Link>
                    )
                }else return null

            })}
        </WidgetPaginationStyledDiv>
    )
};
export default WidgetPagination
