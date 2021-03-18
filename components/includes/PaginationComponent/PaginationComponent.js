import React from 'react';
import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";

const PaginationComponent = props => {

    if (props.isActive && props.totalCount > props.size) {
        const range  = rangeNumGenerator(props.currentPage, props.maxPage).filter(n=>(n !== (1||props.maxPage)) && (n < props.maxPage) )
        const rangeWithMinMax =  [1,...range,props.maxPage]

        return (
            <div className='pagination' key={props.paginationIndex}>
                {
                    rangeWithMinMax.map(pageNumber => {
                        return (
                            <PaginationComponentPageLink {...props} key={pageNumber}  pageNumber={pageNumber}/>
                        )
                    })
                }
            </div>
        );
    } else return null

};
export default PaginationComponent;
