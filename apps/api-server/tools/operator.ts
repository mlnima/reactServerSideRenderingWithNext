import ProjectTools from './projectTools';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });
import { connectToDatabase } from '../util/database-util';

connectToDatabase('operator').then(async () => {
    const arg = process.argv[2];
    const projectTools = new ProjectTools();
    // if (!arg) {
    //     console.log('no arg was provided');
    //     process.exit();
    // }
    // console.log(`executing arg `, arg);
    await projectTools[arg ?? 'help']().then(() => process.exit());
});
