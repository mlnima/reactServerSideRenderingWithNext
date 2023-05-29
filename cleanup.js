const fs = require('fs').promises;
const path = require('path');

// Function to delete a file or a folder
async function deleteIfExists(filePath) {
    try {
        await fs.access(filePath);
        const stats = await fs.lstat(filePath);
        if (stats.isDirectory()) {
            await fs.rm(filePath, { recursive: true, force: true });
        } else {
            await fs.unlink(filePath);
        }
        console.log(`${filePath} has been deleted`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(`Error while deleting ${filePath}:`, err);
        }
    }
}

// Function to delete specific files or folders in the given directory
async function deleteInDirectory(directory, itemsToDelete) {
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

// Main function
async function cleanup() {
    // Delete node_modules and package-lock.json in the current directory
    const rootItemsToDelete = ['node_modules', 'package-lock.json'];
    for (const item of rootItemsToDelete) {
        await deleteIfExists(item);
    }

    // Delete specific items in the './apps' and './packages' directories
    const itemsToDelete = ['node_modules', '.turbo', 'dist', '.next', 'build'];
    const directories = ['./apps', './packages'];
    for (const directory of directories) {
        await deleteInDirectory(directory, itemsToDelete);
    }
}

cleanup().catch(console.error);
