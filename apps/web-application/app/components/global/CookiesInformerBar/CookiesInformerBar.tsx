'use client';
import './CookiesInformerBar.scss';
import { cookieSetter } from '@lib/actions/cookieTools';

const CookiesInformerBar= () => {

  const onAcceptHandler = () => {
    cookieSetter({
      name: 'cookiesAccepted',
      value: 'true',
    });
  };

  return (
    <div id={'cookiePopupWrapper'}>
      <p>
        This website collects cookies to deliver better user experience
      </p>
      <button className={'btn btn-primary'} onClick={onAcceptHandler}>
        OK
      </button>
    </div>
  );

};

export default CookiesInformerBar;
