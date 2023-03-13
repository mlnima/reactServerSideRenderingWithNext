import {FC} from "react";
import PaginationComponentPageLink from "./PaginationComponentPageLink";
import styled from "styled-components";
import {useRouter} from "next/router";
import {rangeNumGenerator} from "custom-util";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const PaginationComponentStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;
  height: 40px;

  .pagination-item {
    color: var(--main-text-color, #fff);
    background-color: var(--secondary-background-color, #181818);
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
  }

  .active-item {
    color: var(--secondary-background-color, #181818);
    background-color: var(--main-active-color, #f90);
  }

  @media only screen and (max-width: 768px) {
    .pagination-item {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
    }
  }
`

const PaginationComponent: FC = () => {
    const {query} = useRouter()
    const numberOfCardsPerPage = useSelector(({settings}: Store) => settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20)
    const totalCount = useSelector(({posts}: Store) => posts?.totalCount)
    const currentPage = query?.page ? parseInt(query?.page as string) : 1
    const maxPage = Math.ceil(totalCount / numberOfCardsPerPage)

    if (totalCount > numberOfCardsPerPage) {
        const range = rangeNumGenerator(currentPage, maxPage)
            .filter(n => (n !== (1 || maxPage)) && (n < maxPage) && (n > 0))
        const rangeWithMinMax = [1, ...range, maxPage]
        return (
            <PaginationComponentStyledDiv className='pagination'>
                {rangeWithMinMax.map((pageNumber, index) => {
                    return (
                        <PaginationComponentPageLink key={index}
                                                     pageNumber={pageNumber}
                                                     isActivePage={pageNumber === currentPage}/>
                    )
                })}
            </PaginationComponentStyledDiv>
        );
    } else return null
};

export default PaginationComponent;
