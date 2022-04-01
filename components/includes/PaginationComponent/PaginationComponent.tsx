import {FC} from "react";
import PaginationComponentPageLink from "./PaginationComponentPageLink";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useRouter} from "next/router";
import rangeNumGenerator from "@_variables/util/rangeNumGenerator";

const PaginationComponentStyledDiv = styled.div`
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
         // pageNumber,
         isActive,
         totalCount,
         currentPage
     }) => {
        const dispatch = useDispatch()
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
                                                             onActivateLoadingHandler={() => dispatch(setLoading(true))}
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
