'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';
import { deepConvertObjectIdsToStrings } from '@repo/utils';

interface IDashboardGetForms {
  keyword?: string,
  page?: number,
  size?: number,
  sort?: string
}

const dashboardGetForms = async (
  {
    keyword,
    page = 1,
    size,
    sort = '-updatedAt',
  }: IDashboardGetForms,
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

    console.log(`forms=> `,typeof forms[0].createdAt)

    const transformedForms = forms.map((doc) => deepConvertObjectIdsToStrings(doc));


    const totalCount = await formSchema.countDocuments({});

    // const transformedForms = forms.map((doc) => ({
    //   ...doc,
    //   _id: doc._id.toString(),
    //   widgetId: doc.widgetId.toString(),
    // }));




    return successResponse({
      data: {
        forms: transformedForms,
        totalCount,
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

export default dashboardGetForms;