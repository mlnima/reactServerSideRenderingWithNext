import {useContext,useState} from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AppContext} from "../../../../context/AppContext";
import styled from "styled-components";

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
const AlphabeticalNumericalRangeLinksWidget = () => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const activePage = router.query.startWith
    const [range,setRange] = useState(()=>{
        return router.pathname === '/actors' ? [...'abcdefghijklmnopqrstuvwxyz'] : [...'abcdefghijklmnopqrstuvwxyz0123456789']
    })

    const renderRange = range.map((Letter,index) => {

        return (
            <Link key={index} href={{
                pathname: router.pathname,
                query: {...router?.query, startWith: Letter,page:1}
            }}  scroll={false}>
                <a className='alphabetical-range-widget-item'
                   onClick={contextData.functions.loadingHandler}
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
                    pathname: router.pathname,
                    query: {...router?.query,startWith:''}
                }}  scroll={false}>
                    <a className='alphabetical-range-widget-item'
                       onClick={contextData.functions.loadingHandler}
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
