import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";
import _ from "lodash";

const PaginationComponent = props => {
    if (props.isActive && props.totalCount > props.size) {
        const range = rangeNumGenerator(props.currentPage, props.maxPage)
            .filter(n => (n !== (1 || props.maxPage)) && (n < props.maxPage) && (n > 0))
        const rangeWithMinMax = [1, ...range, props.maxPage]
        return (
            <div className='pagination' key={_.uniqueId('pagination')}>
                <style jsx>{`
                  .pagination {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                    flex-wrap: wrap;
                  }
                `}</style>
                {
                    rangeWithMinMax.map(pageNumber => {
                        return (
                            <PaginationComponentPageLink
                                {...props}
                                key={_.uniqueId('page_')}
                                pageNumber={pageNumber}
                            />
                        )
                    })
                }
            </div>
        );
    } else return null
};

export default PaginationComponent;
