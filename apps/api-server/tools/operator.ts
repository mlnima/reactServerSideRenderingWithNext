import ProjectTools from './projectTools';
import dotenv from 'dotenv';
import GlobalStore from '@store/GlobalStore';

dotenv.config({ path: '../../.env' });

GlobalStore.connectToDatabase('operator').then(async () => {
    const arg = process.argv[2];
    const projectTools = new ProjectTools();
    await projectTools[arg ?? 'help']().then(() => process.exit());
});
