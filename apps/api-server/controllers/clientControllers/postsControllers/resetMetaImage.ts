import { randomNumberGenerator } from '@util/math-util';
import { isEmptyObject } from '@util/object-util';
import metaSchema from '@schemas/metaSchema';
import postSchema from '@schemas/postSchema';

const resetMetaImage = async (req, res) => {
    try {
        const metaId = req.body._id;
        const metaDocument = await metaSchema.findById(metaId).exec();
        const metaCount = await postSchema
            .countDocuments({
                $and: [
                    { [metaDocument.type]: metaDocument._id },
                    { status: 'published' },
                ],
            })
            .exec();
        const randomSkip = randomNumberGenerator(1, metaCount);

        if (!isEmptyObject(metaDocument) && !metaDocument?.imageUrlLock) {
            const findPostWithSameMeta = await postSchema
                .findOne({
                    $and: [
                        { [metaDocument.type]: metaDocument._id },
                        { status: 'published' },
                    ],
                })
                .skip(randomSkip)
                .exec();
            if (findPostWithSameMeta) {
                await metaSchema
                    .findByIdAndUpdate(
                        metaId,
                        { imageUrl: findPostWithSameMeta.mainThumbnail },
                        { new: true },
                    )
                    .exec()
                    .then(updatedMeta => {
                        res.json({ newImageUrl: updatedMeta.imageUrl });
                    })
                    .catch(err => {
                        console.log(err);
                        res.end();
                    });
            } else {
                res.end();
            }
        } else {
            res.json({ newImageUrl: metaDocument?.imageUrl });
        }
    } catch (err) {
        console.log(err);
        res.end();
    }
};

export default resetMetaImage;
