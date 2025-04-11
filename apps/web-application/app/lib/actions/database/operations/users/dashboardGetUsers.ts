'use server';
import { userStatus } from '@repo/data-structures';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { connectToDatabase, userSchema } from '@repo/db';
import { IInitialSettings } from '@repo/typescript-types';



const dashboardGetUsers = async (
  {
    keyword,
    status,
    role,
    page = 1,
    size,
    sort = '-updatedAt',
  }: any) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetPosts');


    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
    const searchQuery = !decodedKeyword
      ? []
      : [{ $or: [{ username: new RegExp(decodedKeyword, 'i') }, { email: new RegExp(decodedKeyword, 'i') }] }];
    const statusQuery = status ? [{ status }] : [];
    const roleQuery = role ? [{ role }] : [];
    const findOptions = [...searchQuery, ...statusQuery, ...roleQuery];
    const findUsersQuery = findOptions.length > 0 ? {
      $and: [...searchQuery, ...statusQuery, ...roleQuery],
    } : {};

    const totalCount = await userSchema.countDocuments(findUsersQuery).exec();

    let statusesCount = userStatus.reduce((final: { [key: string]: number }, current: string) => {
      final[current] = 0;
      return final;
    }, {});

    for await (const status of userStatus) {
      statusesCount[status] = await userSchema.countDocuments({ status });
    }


    const users = await userSchema.find(findUsersQuery, null, {
      skip: page ? (limit || 20) * (page - 1) : 0,
      limit: size || 20,
      sort: sort || '-updatedAt',
    }).select('username role email status postsCount').lean();


    return successResponse({
      data: {
        users: JSON.parse(JSON.stringify(users)),
        totalCount,
        statusesCount,
      },
    });

  } catch (error) {
    console.log(`error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGetUsers;