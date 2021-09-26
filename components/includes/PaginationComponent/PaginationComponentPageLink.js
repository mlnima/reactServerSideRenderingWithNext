import Link from 'next/link'
import {useRouter} from "next/router";
import styled from "styled-components";

const PaginationComponentPageLinkStyledLink = styled.a`
  background-color: ${props=>(parseInt(props.page) === props.pageNumber) || (!props.page && props.pageNumber ===1) ? 'var(--main-active-color,#f90)' : '#282828'};
  color: var(--main-text-color);
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: invert(1);
  }
`
const PaginationComponentPageLink = props => {
    const router = useRouter()
    return (
        <Link key={props.pageNumber.toString()} href={{pathname:router.pathname,query: {...router.query,page:props.pageNumber}}} scroll={false}>
            <PaginationComponentPageLinkStyledLink onClick={props.onActivateLoadingHandler} page={router.query?.page} pageNumber={props.pageNumber}>
                {props.pageNumber}
            </PaginationComponentPageLinkStyledLink>
        </Link>
    );
};
export default PaginationComponentPageLink;



