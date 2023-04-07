const fs = require('fs').promises;
const path = require('path');

const renameFile = async (oldPath: string, newBaseName: string) => {
    const ext = path.extname(oldPath);
    const dir = path.dirname(oldPath);
    const newPath = path.join(dir, newBaseName + ext);

    try {
        await fs.rename(oldPath, newPath);
        return newPath;
    } catch (error) {
        console.error('Error renaming file:', error);
        return null;
    }

}

export default renameFile