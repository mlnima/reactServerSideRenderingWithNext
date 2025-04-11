'use client';
import { FC } from 'react';
import LoginRegisterPopupForms from './LoginRegisterPopupForms';
import './LoginRegisterPopup.scss';
import { useAppSelector } from '@store/hooks';

interface IProps {
  locale: string,
  dictionary: {
    [key: string]: string
  }
}

const LoginRegisterPopup: FC<IProps> = ({ locale, dictionary }) => {
  const { loginRegisterFormPopup } = useAppSelector(({ globalState }) => globalState);
  const { loggedIn } = useAppSelector(({ user }) => user);

  if (!loggedIn && (loginRegisterFormPopup === 'register' || loginRegisterFormPopup === 'login')) {
    return (
      <div className="loginRegisterPopup">
        <LoginRegisterPopupForms locale={locale} dictionary={dictionary} />
      </div>
    );
  } else return null;
};

export default LoginRegisterPopup;
