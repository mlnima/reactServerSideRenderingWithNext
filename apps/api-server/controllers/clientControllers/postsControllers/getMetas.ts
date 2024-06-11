import { Request, Response } from 'express';
import { findMetas } from '@_variables/serverGlobalVariable/findMetas';

const getMetas = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const resultMetaFindQueries = await findMetas({ ...req.query, page });

        res.json({ ...resultMetaFindQueries });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export default getMetas;
