import {useRouter} from "next/router";
import {LanguagesOptions} from "custom-util";
import styled from "styled-components";
import {FC} from "react";
import * as process from "process";

const LanguagesSwitcherStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

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
    color: var(--primary-text-color,#fff);
  }

  .custom-select {
    border: none;
    width: 70px;
    font-size: initial;
    background-color: var(--primary-background-color,#000);
    color: var(--primary-text-color,#fff);
    option{
      background-color: var(--primary-background-color,#000);
      color: var(--primary-text-color,#fff);
    }
  }
`
const LanguagesSwitcher :FC = () => {
    const router = useRouter()



    const onChangeHandler = e => {
        const localToSet = e.target.value === 'default' ? process.env.NEXT_PUBLIC_DEFAULT_LOCALE : e.target.value
        router?.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: localToSet})
    }

    return (
        <LanguagesSwitcherStyledDiv className='language-switcher-widget'>

            <select className={'custom-select'}
                    value={router.locale}
                    aria-label='switch language'
                    onChange={e => onChangeHandler(e)}
                    title={'select language'}
            >
                <option key='default' value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'default'}</option>
                <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''}/>
            </select>

        </LanguagesSwitcherStyledDiv>
    );
};
export default LanguagesSwitcher;
