import { cookieChecker } from '@lib/actions/cookieTools';
import CookiesInformerBar from '../CookiesInformerBar/CookiesInformerBar';


const CookieInitializer = async () : Promise<any> => {

  const areCookiesAccepted = await cookieChecker('cookiesAccepted')

  if (!areCookiesAccepted){
    return <CookiesInformerBar/>
  }

  return null;
};

export default CookieInitializer;