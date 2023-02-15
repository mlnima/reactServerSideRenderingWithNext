import {FC} from "react";
import PaginationComponentPageLink from "./PaginationComponentPageLink";
import styled from "styled-components";
import {useRouter} from "next/router";
import {rangeNumGenerator} from "custom-util";

const PaginationComponentStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;

  .pagination-item {
    color: var(--main-text-color, #fff);
    background-color:var(--secondary-background-color, #181818) ;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .active-item{
    color: var(--secondary-background-color, #181818);
    background-color:var(--main-active-color,#f90) ;
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

interface PaginationComponentPropTypes {
    size: number,
    maxPage: number,
    // pageNumber: number,
    totalCount: number,
    currentPage: number,
    isActive: boolean
}

const PaginationComponent: FC<PaginationComponentPropTypes> =
    ({
         size,
         maxPage,
         isActive,
         totalCount,
         currentPage
     }) => {
        const {query} = useRouter()

        if (isActive && totalCount > size) {
            const range = rangeNumGenerator(currentPage, maxPage)
                .filter(n => (n !== (1 || maxPage)) && (n < maxPage) && (n > 0))
            const rangeWithMinMax = [1, ...range, maxPage]
            return (
                <PaginationComponentStyledDiv className='pagination'>

                    {
                        rangeWithMinMax.map((pageNumber, index) => {
                            const currentPage = query?.page ? parseInt(query?.page as string) : 1;

                            return (
                                <PaginationComponentPageLink key={index}
                                                             pageNumber={pageNumber}
                                                             isActivePage={pageNumber === currentPage}
                                />
                            )
                        })
                    }
                </PaginationComponentStyledDiv>
            );
        } else return null
    };

export default PaginationComponent;
