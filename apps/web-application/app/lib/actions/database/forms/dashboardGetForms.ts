'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';
import { deepConvertObjectIdsToStrings } from '../../../../../../../packages/utils-server';


const dashboardGetForms = async (
  {
    keyword,
    page = 1,
    size,
    sort = '-updatedAt',
  }: any,
) => {
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

    const searchQuery = !decodedKeyword ? [] : [{
      $or: [
        { widgetId: new RegExp(decodedKeyword, 'i') },
        { formName: new RegExp(decodedKeyword, 'i') },
      ],
    }];

    const findQuery = { $and: [...searchQuery] };

    const forms = await formSchema.find(findQuery, null,
      {
        skip: page ? (limit || 20) * (page - 1) : 0,
        limit: size || 20,
        sort: sort || '-updatedAt',
      }).lean();

    const transformedForms = forms.map((doc) => deepConvertObjectIdsToStrings(doc));

    const totalCount = await formSchema.countDocuments({});

    return successResponse({
      data: {
        forms: transformedForms,
        totalCount,
      },
    });

  } catch (error) {

    console.log(`dashboardGetForms Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGetForms;