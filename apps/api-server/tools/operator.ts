import ProjectTools from './projectTools';
import dotenv from 'dotenv';
import {connectToDatabase} from "@repo/db";

dotenv.config({ path: '../../.env' });

connectToDatabase('operator').then(async () => {
    const arg = process.argv[2];
    const projectTools = new ProjectTools();
    await projectTools[arg ?? 'help']().then(() => process.exit());
});
