import path from "path";
import {promises as fs} from "fs";

export const renameFile = async (oldPath:string, newBaseName:string) => {
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
};

export const removeFileExtension = async (fileName:string) => {
    return new Promise((resolve, reject) => {
        const index = fileName.lastIndexOf('.');
        if (index > 0 && index < fileName.length - 1) {
            const fileNameWithoutExtension = fileName.substring(0, index);
            resolve(fileNameWithoutExtension);
        } else {
            reject(new Error('File name has no extension.'));
        }
    });
};