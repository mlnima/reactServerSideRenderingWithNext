import path from 'path';
import fs from 'fs';
import fsExtra from 'fs-extra';
import archiver from 'archiver';

export const renameFile = async (oldPath: string, newBaseName: string) => {
    const ext = path.extname(oldPath);
    const dir = path.dirname(oldPath);
    const newPath = path.join(dir, newBaseName + ext);

    try {
        fs.rename(oldPath, newPath,()=>null);
        return newPath;
    } catch (error) {
        console.error('Error renaming file:', error);
        return null;
    }
};

export const folderRemover = async (folderPath: string,force=false) => {
    try {
        try {
            await fsExtra.remove(folderPath);
            console.log('Folder removed successfully');
        } catch (err) {
            console.error('Error removing folder:', err);
        }
    }catch (error){
        console.log(`error trying to remove a folder=> `,error)
    }

};

export const removeFileExtension = async (fileName: string) => {
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

export const createFileIfDoesntExist = async (filePath: string) => {
    try {
        await fsExtra.ensureFile(filePath);
    } catch (err) {
        console.error(err);
    }
};

export async function folderCompressor(sourceFolderPath: string, outputFilePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // Ensure source folder exists
        if (!fs.existsSync(sourceFolderPath)) {
            reject(`Source folder does not exist: ${sourceFolderPath}`);
            return;
        }

        // Create a write stream to the output zip file
        const output = fs.createWriteStream(outputFilePath);

        // Create archiver instance
        const archive = archiver('zip', {
            zlib: { level: 9 }, // Set compression level
        });

        // Pipe archive data to the output file
        archive.pipe(output);

        // Append all files from source directory into the archive
        archive.directory(sourceFolderPath, false);

        // Finalize the archive (write to disk)
        archive.finalize();

        // Listen for archive 'close' event
        output.on('close', () => {
            resolve(outputFilePath);
        });

        // Listen for archive 'error' event
        archive.on('error', (err: Error) => {
            reject(`Error creating archive: ${err}`);
        });
    });
}
