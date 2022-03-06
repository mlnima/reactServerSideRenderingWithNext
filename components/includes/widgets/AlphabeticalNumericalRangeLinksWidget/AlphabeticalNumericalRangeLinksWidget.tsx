import {FC, useMemo} from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import styled from "styled-components";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useDispatch} from "react-redux";

const AlphabeticalNumericalRangeLinksWidgetStyledDiv = styled.div`
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  .alphabetical-range-widget-item{
    //background-color: var(--navigation-background-color,#18181b);
    color: var(--navigation-text-color, #ccc);
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
  }
`
const AlphabeticalNumericalRangeLinksWidget : FC = () => {
    const dispatch = useDispatch()

    const {pathname,query} = useRouter()
    const activePage = query.startWith;

    const range = useMemo(()=>{
        return pathname === '/actors' ? [...'abcdefghijklmnopqrstuvwxyz'] : [...'abcdefghijklmnopqrstuvwxyz0123456789'];
    },[])

    const renderRange = range.map((Letter,index) => {

        return (
            <Link key={index} href={{
                pathname: pathname,
                query: {...query, startWith: Letter,page:1}
            }}  >
                <a className='alphabetical-range-widget-item'

                   onClick={() => dispatch(setLoading(true))}
                   style={{
                       backgroundColor:  Letter === activePage ? 'var(--main-active-color,#f90)': 'var(--navigation-background-color,#18181b)',
                       color:  Letter === activePage ? 'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color,#ccc)'
                   }}
                >
                    {Letter}
                </a>
            </Link>
        )
    })

    return (
        <AlphabeticalNumericalRangeLinksWidgetStyledDiv className='alphabetical-range-widget'>
            {
                <Link key={'all'} href={{
                    pathname: pathname,
                    query: {...query,startWith:''}
                }} >
                    <a className='alphabetical-range-widget-item'
                       onClick={() => dispatch(setLoading(true))}
                       style={{
                           backgroundColor:  !activePage ? 'var(--main-active-color,#f90)': 'var(--navigation-background-color,#18181b)',
                           color:   !activePage ? 'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color,#ccc)'
                       }}
                    >
                        All
                    </a>
                </Link>
            }
            {renderRange}
        </AlphabeticalNumericalRangeLinksWidgetStyledDiv>
    );
};
export default AlphabeticalNumericalRangeLinksWidget;
