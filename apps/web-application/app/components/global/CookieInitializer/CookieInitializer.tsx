import { cookieChecker } from '@lib/actions/cookieTools';
import CookiesInformerBar from '../CookiesInformerBar/CookiesInformerBar';


const CookieInitializer = async (): Promise<any> => {

  const areCookiesAccepted = await cookieChecker('cookiesAccepted');

  if (areCookiesAccepted) return null;

  return <CookiesInformerBar />;
};

export default CookieInitializer;