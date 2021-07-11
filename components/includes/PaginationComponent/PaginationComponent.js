import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";
import {useRouter} from "next/router";
import _ from "lodash";

const PaginationComponent = props => {
    const router = useRouter()
    if (props.isActive && props.totalCount > props.size) {
        const range  = rangeNumGenerator(props.currentPage, props.maxPage)
                       .filter(n=>(n !== (1||props.maxPage)) && (n < props.maxPage) && (n>0) )
        const rangeWithMinMax =  [1,...range,props.maxPage]
        const metaType = router.query.metaType
        const metaName = router.query.metaName


        const mainPath =  
        router.asPath.includes('/posts') ||
        router.asPath.includes('/tags/') ||
        router.asPath.includes('/categories/') ||
        router.asPath.includes('/actors/') ?
        '/posts' : '/meta'

        const asPath =
        router.asPath.includes('/tags/') ||
        router.asPath.includes('/categories/') ||
        router.asPath.includes('/actors/') ?
        `/${metaType}/${metaName}`:
        router.asPath.includes('/tags') ||
        router.asPath.includes('/categories') ||
        router.asPath.includes('/actors')   ?
        `/${metaType}` :
        router.pathname;

        const queries = router.query.metaId ? {metaId:router.query.metaId} :{};



        return (
            <div className='pagination' key={props.paginationIndex}>
            <style jsx>{`
                .pagination{
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
                                mainPath={mainPath}
                                asPath={asPath}
                                queries={queries}
                                {...props}
                                key={_.uniqueId('id_')}
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
