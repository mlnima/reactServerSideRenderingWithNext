//syncDuplicateMetas
import postSchema from "@schemas/postSchema";
import metaSchema from "@schemas/metaSchema";

const findDuplicateMetas = async () => {
    try {
        const duplicates = await metaSchema.aggregate([
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
            const postsWithThisMeta = await postSchema.countDocuments({
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

            const postWithWrongMeta = await postSchema.find({[duplicate._id.type]: wrongMeta._id}).exec()


            for await(const post of postWithWrongMeta) {
                await postSchema.findByIdAndUpdate(post._id, {
                    $pull: {
                        [duplicate._id.type]: wrongMeta._id,
                    }
                }, {new: true}).exec()

                await postSchema.findByIdAndUpdate(post._id, {
                    $push: {
                        [duplicate._id.type]: itemWithHighestCount._id,
                    },
                }, {new: true}).exec()
            }

            await metaSchema.findByIdAndDelete(wrongMeta?._id).exec();

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