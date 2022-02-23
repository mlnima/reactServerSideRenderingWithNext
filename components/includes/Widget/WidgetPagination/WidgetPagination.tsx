import {FC} from "react";
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
`

interface WidgetPaginationPropTypes {
    baseUrl: string,
    totalCount: number
}

const WidgetPagination: FC<WidgetPaginationPropTypes> = ({baseUrl, totalCount}) => {
    const postsCountPerPage = useSelector((store:StoreTypes) => {
        return store?.settings?.identity?.postsCountPerPage ?
              // @ts-ignore
               parseInt(store?.settings?.identity?.postsCountPerPage)
               : 20
    })
    const maxPage = totalCount ? Math.ceil(totalCount / postsCountPerPage) : []
    const pages = [...rangeNumGenerator(1,maxPage),maxPage]

    return (
        <WidgetPaginationStyledDiv className={'widget-pagination'}>
            {pages.map(pageNumber => {
                return (
                    <Link key={pageNumber.toString()}
                          href={`${baseUrl.includes('?') ? baseUrl + `&page=${pageNumber}` : baseUrl + `?page=${pageNumber}`}`}>
                        <a
                            className='pagination-item'
                            style={{
                                backgroundColor: pageNumber === 1 ? 'var(--main-active-color,#f90)' : 'var(--navigation-background-color,#18181b)',
                                color: pageNumber === 1 ? 'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color,#ccc)'
                            }}
                        >
                            {pageNumber}
                        </a>
                    </Link>
                )
            })}
        </WidgetPaginationStyledDiv>
    )
};
export default WidgetPagination
