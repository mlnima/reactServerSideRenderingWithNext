import Link from 'next/link'
import withRouter from 'next/dist/client/with-router'
import { useRouter } from 'next/router'
import styled from "styled-components";
import {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
let StyledDiv = styled.div`
  display:flex;
  flex-wrap: wrap;

`
let StyledA = styled.a`
    background-color: #33373c;
    color: white;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
`



const AlphabeticalNumericalRangeLinksWidget = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    // const [state, setState] = useState({
    //     range: [...'abcdefghijklmnopqrstuvwxyz0123456789']
    // });

    const renderRange = [...'abcdefghijklmnopqrstuvwxyz0123456789'].map(i => {
        const path = {
            pathname: props.router ? props.router.pathname : '',
            query: props.router ? {...props.router.query, startWith: i} : ''
        }
        return (
            <Link key={i} href={path} as={router.asPath} scroll={false}><StyledA onClick={contextData.functions.loadingHandler}>{i}</StyledA></Link>
        )
    })

    return (
        <StyledDiv className='alphabetical-range'>

            {renderRange}
        </StyledDiv>
    );
};
export default withRouter(AlphabeticalNumericalRangeLinksWidget);
