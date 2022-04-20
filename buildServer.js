require('dotenv').config()
require('./server/_variables/connectToDatabase').then(()=>{
    require('./server/_variables/_writeSettingsAndStaticWidgetsToJsonFile').finally(()=>process.exit(0))
})
