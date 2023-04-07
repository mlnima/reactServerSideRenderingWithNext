import {Request, Response} from 'express';
import {formSchema} from 'models';
interface SaveFormDataRequestBody {
    data: Record<string, unknown>;
}
const saveFormData = async (req: Request<{}, {}, SaveFormDataRequestBody>, res: Response): Promise<void> => {
    try {
        const {data} = req.body;
        const formDataDataToSave = new formSchema(data);

        await formDataDataToSave.save((error, savedData) => {
            if (error) {
                console.error('Error saving form data:', error);
                res.status(500).json({message: 'Something went wrong'});
                return;
            }

            res.json({savedData});
        });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({message: 'Something went wrong'});
    }
};
export default saveFormData;
