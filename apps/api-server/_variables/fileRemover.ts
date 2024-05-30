import {FileSchema} from "shared-schemas";
import path from "path";
import fsExtra from "fs-extra";

const dev = process.env.NODE_ENV !== 'production';
const fileRemover = async (fileId) => {
    try {
        const file = await FileSchema.findById(fileId).exec()
        const fileLocation = path.join(__dirname, dev ? `../${file.filePath}` : `../../${file.filePath}`);

        fsExtra.pathExists(fileLocation)
            .then(async (exists) => {
                if (exists) {
                    await fsExtra.unlink(fileLocation).then(async () => {
                        await FileSchema.findByIdAndDelete(fileId);
                    })

                } else {
                    console.log('File does not exist =>', fileLocation);
                }
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    } catch (error) {
        console.log(error)
    }
}

export default fileRemover