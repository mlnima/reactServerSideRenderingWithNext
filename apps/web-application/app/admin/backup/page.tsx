"use client";

import './styles.scss';

const Backup = () => {

    const onBackupHandler = async ()=>{
        try {
            // const backupResult = await backup()
            // console.log(`backupData=> `,backupResult.data)
        }catch (error){
            console.log(`onBackupHandler Error=> `,error)
        }
    }

    return (
        <div className={'backupPage'}>
            <button className={'btn btn-primary'} onClick={onBackupHandler}>
                Backup
            </button>
        </div>
    )
};
export default Backup;