'use server';
import { connectToDatabase, formSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

interface ISaveFormWidgetData {
  data: {
    [key: string]: any;
  };
}

const saveFormWidgetData = async ({ data }: ISaveFormWidgetData): Promise<ServerActionResponse<null>> => {
  let connection;

  try {
    connection = await connectToDatabase('saveFormWidgetData');
    const session = await connection.startSession();

    try {
      const formDataDataToSave = new formSchema(data);
      await formDataDataToSave.save({ session });
      return successResponse({ data: null });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.log(`saveFormWidgetData=> `, error);
    return errorResponse({
      message: 'Failed to save form data.',
    });
  }
};

export default saveFormWidgetData;








// 'use server';
// import { connectToDatabase, formSchema } from '@repo/db';
//
// interface ISaveFormWidgetData {
//   data: {
//     [key: string]: any;
//   };
// }
//
// const saveFormWidgetData = async ({ data }: ISaveFormWidgetData) => {
//   try {
//     await connectToDatabase('saveFormWidgetData');
//     const formDataDataToSave = new formSchema(data);
//     await formDataDataToSave.save();
//     return;
//   } catch (error) {
//     console.log(`saveFormWidgetData=> `, error);
//     return;
//   }
// };
//
// export default saveFormWidgetData;