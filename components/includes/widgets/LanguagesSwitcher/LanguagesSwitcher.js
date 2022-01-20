import {useRouter} from "next/router";
import {languagesOptions} from "../../../../_variables/_variables";
import styled from "styled-components";

const LanguagesSwitcherStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .globe-icon {
    margin: 0 3px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .language-switcher-widget-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    font-size: 12px;
    color: var(--navigation-text-color, #ccc);
  }

  .custom-select {
    border: none;
    width: 60px;
    background-color: var(--navigation-background-color, #18181b);
    color: var(--navigation-text-color, #ccc);
  }
`
const LanguagesSwitcher = () => {
    const router = useRouter()

    const onChangeHandler = e => {
        const localToSet = e.target.value === 'default' ? process.env.NEXT_PUBLIC_DEFAULT_LOCAL : e.target.value
        router?.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: localToSet})
    }

    return (
        <LanguagesSwitcherStyledDiv className='language-switcher-widget'>

            <select className={'custom-select'}
                    value={router.locale}
                    aria-label='Center Align'
                    onChange={e => onChangeHandler(e)}
            >
                <option key='default' value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>

        </LanguagesSwitcherStyledDiv>
    );
};
export default LanguagesSwitcher;
