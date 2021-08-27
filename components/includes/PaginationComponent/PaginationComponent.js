import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";
import _ from "lodash";
import {useContext} from "react";
import {AppContext} from "../../../context/AppContext";
import styled from "styled-components";


const PaginationComponentStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;
`

const PaginationComponent = props => {
    const contextData = useContext(AppContext);

    const onActivateLoadingHandler = ()=>{
        contextData.dispatchState(prevState => ({
            ...prevState,
            loading:true
        }))
    }

    if (props.isActive && props.totalCount > props.size) {
        const range = rangeNumGenerator(props.currentPage, props.maxPage)
            .filter(n => (n !== (1 || props.maxPage)) && (n < props.maxPage) && (n > 0))
        const rangeWithMinMax = [1, ...range, props.maxPage]
        return (
            <PaginationComponentStyledDiv className='pagination' key={_.uniqueId('pagination')}>

                {
                    rangeWithMinMax.map(pageNumber => {
                        return (
                            <PaginationComponentPageLink
                                {...props}
                                onActivateLoadingHandler={onActivateLoadingHandler}
                                key={_.uniqueId('page_')}
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
