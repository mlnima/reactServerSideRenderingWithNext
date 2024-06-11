import metaSchema from '@schemas/metaSchema';
import { Request, Response } from 'express';

const tags = async (req: Request, res: Response) => {
    try {
        const statusQuery = { status: 'published' };
        const startWithNumberRegex = /^[0-9]/g;

        const startWithQuery = !req.query.startWith
            ? {}
            : req.query.startWith === 'other'
              ? { name: { $regex: startWithNumberRegex } }
              : { name: { $regex: '^' + req.query.startWith } };

        const countQuery = { count: { $gt: 0 } };
        const type = { type: 'tags' };

        const sortQuery = !req.query.sort
            ? {
                  // 'rank': 1,
                  count: -1,
              }
            : { [req.query?.sort as string]: -1 };

        if (req.query.startWith) {
            const findQuery = {
                $and: [type, startWithQuery, statusQuery, countQuery],
            };
            const metas = await metaSchema
                .find(findQuery, {}, { sort: sortQuery })
                .select('name type')
                .exec();

            res.status(200).json({ metas });
        } else {
            const findQuery = { $and: [type, statusQuery, countQuery] };
            const metas = await metaSchema
                .find(findQuery, {}, { sort: sortQuery })
                .limit(500)
                .select('name type')
                .exec();

            res.status(200).json({ metas });
        }
    } catch (err) {
        console.log(err);
        res.end();
    }
};

export default tags;
