const fs = require('fs').promises;
const path = require('path');

// Function to delete a file or a folder
async function deleteIfExists(filePath) {
    try {
        await fs.access(filePath);
        const stats = await fs.lstat(filePath);
        if (stats.isDirectory()) {
            console.log(`Attempting to delete directory: ${filePath}`);
            await fs.rm(filePath, { recursive: true, force: true });
            console.log(`Directory ${filePath} has been deleted.`);
        } else {
            console.log(`Attempting to delete file: ${filePath}`);
            await fs.unlink(filePath);
            console.log(`File ${filePath} has been deleted.`);
        }
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(`Error while deleting ${filePath}:`, err);
        } else {
            console.log(`File or directory ${filePath} does not exist. Skipping...`);
        }
    }
}

// Function to delete specific files or folders in the given directory
async function deleteInDirectory(directory, itemsToDelete) {
    console.log(`Looking for items to delete in directory: ${directory}`);
    try {
        const subdirectories = await fs.readdir(directory, { withFileTypes: true });

        for (const dirent of subdirectories) {
            if (dirent.isDirectory()) {
                const subdirPath = path.join(directory, dirent.name);

                for (const item of itemsToDelete) {
                    const itemPath = path.join(subdirPath, item);
                    await deleteIfExists(itemPath);
                }

                // Recursive call for sub-subdirectories
                await deleteInDirectory(subdirPath, itemsToDelete);
            }
        }
    } catch (err) {
        console.error(`Error while deleting in ${directory}:`, err);
    }
}

// MainWidgetArea function
async function cleanup() {
    console.log('Cleanup script started.');

    // Delete node_modules and package-lock.json in the current directory
    const rootItemsToDelete = ['node_modules', 'package-lock.json'];
    for (const item of rootItemsToDelete) {
        await deleteIfExists(item);
    }

    // Delete specific items in the './apps' and './packages' directories
    const itemsToDelete =  ['node_modules', '.turbo', 'dist', '.next', 'build'];
    const directories = ['./apps', './packages'];
    for (const directory of directories) {
        await deleteInDirectory(directory, itemsToDelete);
    }

    console.log('Cleanup script finished.');
}

cleanup().catch(console.error);
