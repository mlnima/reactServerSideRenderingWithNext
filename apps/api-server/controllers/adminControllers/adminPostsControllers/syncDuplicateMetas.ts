//syncDuplicateMetas
import {MetaSchema, PostSchema} from 'shared-schemas';


const findDuplicateMetas = async () => {
    try {
        const duplicates = await MetaSchema.aggregate([
            {
                $group: {
                    _id: {name: "$name", type: "$type"},
                    ids: {$push: "$_id"},
                    count: {$sum: 1}
                }
            },
            {
                $match: {
                    count: {$gt: 1}
                }
            }
        ]);

        return duplicates;
    } catch (err) {
        console.error("Error while finding duplicates:", err);
        return null;
    }
};


const findPostsWithDuplicatedMeta = async (duplicate) => {

    try {
        let metasWithCount = []

        for await (const item of duplicate.ids) {
            const postsWithThisMeta = await PostSchema.countDocuments({
                $or: [
                    {categories: item},
                    {tags: item},
                    {actors: item},
                ]
            }).exec();
            metasWithCount.push({_id: item, count: postsWithThisMeta})
        }


        const highestCountMeta = Math.max(...metasWithCount.map(item => item.count));
        const itemWithHighestCount = metasWithCount.find(item => item.count === highestCountMeta);
        const itemsToRemoveFromPosts = metasWithCount.filter(meta => meta._id !== itemWithHighestCount._id)


        for await(const wrongMeta of itemsToRemoveFromPosts) {

            const postWithWrongMeta = await PostSchema.find({[duplicate._id.type]: wrongMeta._id}).exec()


            for await(const post of postWithWrongMeta) {
                await PostSchema.findByIdAndUpdate(post._id, {
                    $pull: {
                        [duplicate._id.type]: wrongMeta._id,
                    }
                }, {new: true}).exec()

                await PostSchema.findByIdAndUpdate(post._id, {
                    $push: {
                        [duplicate._id.type]: itemWithHighestCount._id,
                    },
                }, {new: true}).exec()
            }

            await MetaSchema.findByIdAndDelete(wrongMeta?._id).exec();

        }

    } catch (error) {

    }


}


const syncDuplicateMetas = async (req, res) => {

    try {
        const duplicates = await findDuplicateMetas();

        for await (const duplicate of duplicates) {
            await findPostsWithDuplicatedMeta(duplicate);
        }


        res.end()
    } catch (error) {
        res.end()
    }
}

export default syncDuplicateMetas;