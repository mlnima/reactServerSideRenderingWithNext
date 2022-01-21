import parse from 'html-react-parser';
import styled from "styled-components";
import {useRouter} from "next/router";

const TextStyledDiv = styled.div`
  color: var(--main-text-color);
  max-width: 100vw;
  @media only screen and (min-width: 768px) {
    color: var(--main-text-color);
  }
`

const Text = ({translations,text}) => {
    const router = useRouter();
    const textData = translations ? translations[router.locale] ? translations[router.locale].text || text : text : text;
    const data = parse(textData);

    return (
        <TextStyledDiv className='widgetText'>
            {data}
        </TextStyledDiv>
    );
};
export default Text;
