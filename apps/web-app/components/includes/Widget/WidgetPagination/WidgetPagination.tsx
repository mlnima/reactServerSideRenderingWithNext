import {FC} from "react";
import Link from 'next/link'
import styled from "styled-components";
import {rangeNumGenerator} from "custom-util";
import {useAppSelector} from "@store_toolkit/hooks";

const WidgetPaginationStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;

  .pagination-item {
    color: var(--primary-text-color,#fff);
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

    const numberOfCardsPerPage = useAppSelector(({settings}) => {
        return settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20
    })

    const maxPage = totalCount ? Math.ceil(totalCount / numberOfCardsPerPage) : 0
    const pages = [...rangeNumGenerator(1,maxPage),maxPage]

    return (
        <WidgetPaginationStyledDiv className={'widget-pagination'}>
            {[...new Set(pages)].map((pageNumber,index) => {
                if (pageNumber && typeof pageNumber === "number"){
                    return (
                        <Link key={ index + pageNumber}
                              href={`${baseUrl.includes('?') ? baseUrl + `&page=${pageNumber}` : baseUrl + `?page=${pageNumber}`}`}
                              className='pagination-item'
                              style={{
                                  backgroundColor: pageNumber === 1 && numberOfCardsPerPage === (count || 20)?
                                      'var(--primary-active-color,#f90)' :
                                      'var(--secondary-background-color, #181818)',
                                  color: pageNumber === 1 && numberOfCardsPerPage === (count || 20) ?
                                      'var(--secondary-background-color, #181818)' :
                                      'var(--primary-text-color,#fff)'
                              }}>
                                {pageNumber}
                        </Link>
                    )
                }else return null

            })}
        </WidgetPaginationStyledDiv>
    )
};
export default WidgetPagination
