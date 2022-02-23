require('dotenv').config()
require('./server/_variables/connectToDatabase')
require('./server/_variables/_writeSettingsAndStaticWidgetsToJsonFile').finally()