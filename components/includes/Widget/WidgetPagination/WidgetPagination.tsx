import {FC} from "react";
import {rangeNumGenerator} from "../../../../_variables/_variables";
import Link from 'next/link'
import styled from "styled-components";
const WidgetPaginationStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;
  .pagination-item{
    color: var(--main-text-color);
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
`

interface WidgetPaginationPropTypes {
    baseUrl:string,
}

const WidgetPagination: FC<WidgetPaginationPropTypes> = ({baseUrl}) => {
   const pages = rangeNumGenerator(1,10)

    return (
        <WidgetPaginationStyledDiv>
            {pages.map(pageNumber=>{
                return(
                    <Link key={pageNumber.toString()} href={`${baseUrl.includes('?') ? baseUrl + `&page=${pageNumber}` :  baseUrl + `?page=${pageNumber}` }`} scroll={false}>
                        <a
                           className='pagination-item'
                           style={{
                               backgroundColor: pageNumber === 1 ? 'var(--main-active-color,#f90)': 'var(--navigation-background-color,#18181b)',
                               color:pageNumber === 1 ? 'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color,#ccc)'
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
