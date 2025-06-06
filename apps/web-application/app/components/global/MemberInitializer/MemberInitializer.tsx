import memberAutoLogin from '@lib/actions/database/users/memberAutoLogin';
import { ServerActionResponse } from '@lib/actions/response';
import MemberInitializerClient from '@components/global/MemberInitializer/MemberInitializerClient';

const MemberInitializer = async () => {
  const autoLoginData = await memberAutoLogin() as ServerActionResponse<{ userData: { role: string } }>;
  return  <MemberInitializerClient autoLoginData={autoLoginData} />

};

export default MemberInitializer;
