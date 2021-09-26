import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/actions/globalStateActions";


const PaginationComponentStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;
`

const PaginationComponent = props => {
    const dispatch = useDispatch()

    if (props.isActive && props.totalCount > props.size) {
        const range = rangeNumGenerator(props.currentPage, props.maxPage)
            .filter(n => (n !== (1 || props.maxPage)) && (n < props.maxPage) && (n > 0))
        const rangeWithMinMax = [1, ...range, props.maxPage]
        return (
            <PaginationComponentStyledDiv className='pagination'>
                {
                    rangeWithMinMax.map((pageNumber,index) => {
                        return (
                            <PaginationComponentPageLink
                                {...props}
                                onActivateLoadingHandler={()=> dispatch(setLoading(true))}
                                key={index}
                                pageNumber={pageNumber}
                            />
                        )
                    })
                }
            </PaginationComponentStyledDiv>
        );
    } else return null
};

export default PaginationComponent;
