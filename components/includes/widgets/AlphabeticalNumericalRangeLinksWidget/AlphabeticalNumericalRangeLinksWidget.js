import {useContext,useState} from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AppContext} from "../../../../context/AppContext";
import _ from "lodash";
import styled from "styled-components";
const AlphabeticalNumericalRangeLinksWidgetStyledDiv = styled.div`
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  .alphabetical-range-widget-item{
    background-color: var(--navigation-background-color);
    color: var(--navigation-text-color);
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
  }
  
`
const AlphabeticalNumericalRangeLinksWidget = () => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [range,setRange] = useState(()=>{
        return router.pathname === '/actors' ? [...'abcdefghijklmnopqrstuvwxyz'] : [...'abcdefghijklmnopqrstuvwxyz0123456789']
    })

    const renderRange = range.map(i => {
        return (
            <Link key={_.uniqueId('alphabetical-range_')} href={{
                pathname: router.pathname,
                query: {...router?.query, startWith: i,page:1}
            }}  scroll={false}>
                <a className='alphabetical-range-widget-item' onClick={contextData.functions.loadingHandler}>
                    {i}
                </a>
            </Link>
        )
    })

    return (
        <AlphabeticalNumericalRangeLinksWidgetStyledDiv className='alphabetical-range-widget'>
            {renderRange}
        </AlphabeticalNumericalRangeLinksWidgetStyledDiv>
    );
};
export default AlphabeticalNumericalRangeLinksWidget;
