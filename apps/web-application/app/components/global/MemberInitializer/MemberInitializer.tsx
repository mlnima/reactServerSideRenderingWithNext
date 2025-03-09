import memberAutoLogin from '@lib/actions/database/operations/users/memberAutoLogin';
import { ServerActionResponse } from '@lib/actions/response';
import MemberInitializerClient from '@components/global/MemberInitializer/MemberInitializerClient';
import { JSX} from 'react'

const MemberInitializer = async (): Promise< JSX.Element> => {
  const autoLoginData = await memberAutoLogin() as ServerActionResponse<{ userData: { role: string } }>;
  return<>
    <MemberInitializerClient autoLoginData={autoLoginData} />
  </> ;
};

export default MemberInitializer;
