'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';
import { IForm } from '@repo/typescript-types';

const dashboardGetForm = async (
  {
    _id,
  }: { _id: string },
): Promise<ServerActionResponse<{ form: IForm } | null>> => {


  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetForm');

    let form = await formSchema.findById(_id).lean<IForm>().exec();

    if (!form) {
      return errorResponse({
        message: 'Form was not found',
      });
    }

    const serializedData = {
      form: JSON.parse(JSON.stringify(form)),
    };

    form = null;

    return successResponse({
      data: serializedData,
    });

  } catch (error) {

    console.log(`dashboardGetForm Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetForm;

