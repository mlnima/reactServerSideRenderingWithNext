import PaginationComponentPageLink from "./PaginationComponentPageLink";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/clientActions/globalStateActions";
import {useRouter} from "next/router";
import rangeNumGenerator from "@_variables/util/rangeNumGenerator";

const PaginationComponentStyledDiv = styled.div`
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
const PaginationComponent = props => {
    const dispatch = useDispatch()
    const router = useRouter()
    if (props.isActive && props.totalCount > props.size) {
        const range = rangeNumGenerator(props.currentPage, props.maxPage)
            .filter(n => (n !== (1 || props.maxPage)) && (n < props.maxPage) && (n > 0))
        const rangeWithMinMax = [1, ...range, props.maxPage]
        return (
            <PaginationComponentStyledDiv className='pagination' page={router.query?.page} pageNumber={props.pageNumber}>
                {
                    rangeWithMinMax.map((pageNumber,index) => {
                        const currentPage = router?.query?.page ? parseInt(router.query?.page): 1;

                        return (
                            <PaginationComponentPageLink
                                {...props}
                                onActivateLoadingHandler={()=> dispatch(setLoading(true))}
                                key={index}
                                pageNumber={pageNumber}
                                isActivePage={ pageNumber === currentPage }
                            />
                        )
                    })
                }
            </PaginationComponentStyledDiv>
        );
    } else return null
};

export default PaginationComponent;
