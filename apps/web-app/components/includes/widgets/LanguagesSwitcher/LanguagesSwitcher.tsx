import {useRouter} from "next/router";
import {languagesOptions} from "@_variables/variables";
import styled from "styled-components";
import {FC} from "react";

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
    color: var(--main-text-color, #fff);
  }

  .custom-select {
    border: none;
    width: 70px;
    font-size: initial;
    background-color: var(--secondary-background-color, #181818);
    color: var(--main-text-color, #fff);
  }
`
const LanguagesSwitcher :FC = () => {
    const router = useRouter()



    const onChangeHandler = e => {

        const localToSet = e.target.value === 'default' ? process.env.NEXT_PUBLIC_DEFAULT_LOCAL : e.target.value
        router?.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: localToSet})


        // if (process.env.NEXT_PUBLIC_DOMAINS){
        //
        //     const locales = process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [];
        //     const domains = !process.env.NEXT_PUBLIC_DOMAINS ? {} :
        //         process.env.NEXT_PUBLIC_DOMAINS.split(' ').map((domain, index) => {
        //             return {
        //                 domain,
        //                 defaultLocale: locales[index],
        //             }
        //         })
        //
        // if (typeof window !=='undefined'){
        //     window.location.assign('https://duckduckgo.com/')
        // }
        //
        // }else{
        //     const localToSet = e.target.value === 'default' ? process.env.NEXT_PUBLIC_DEFAULT_LOCAL : e.target.value
        //     router?.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: localToSet})
        // }
    }

    return (
        <LanguagesSwitcherStyledDiv className='language-switcher-widget'>

            <select className={'custom-select'}
                    value={router.locale}
                    aria-label='switch language'
                    onChange={e => onChangeHandler(e)}
                    title={'select language'}
            >
                <option key='default' value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>

        </LanguagesSwitcherStyledDiv>
    );
};
export default LanguagesSwitcher;
