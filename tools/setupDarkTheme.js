import dotenv from 'dotenv';
dotenv.config();
import {connectToDatabase} from './_variables/connectToDatabase';
connectToDatabase().finally()

import userSchema from '../expressServer/models/userSchema';
import settingSchema from '../expressServer/models/settingSchema';
import widgetSchema from '../expressServer/models/widgetSchema';
import postSchema from '../expressServer/models/postSchema';
import bcrypt from 'bcryptjs';


// const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
//     `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
//     `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//
// mongoose.connect(mongoDBConnectionUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('DB connected'))
//     .catch(err => console.log('DB not connected', err));


const designData = {
    type: 'design',
    data: {
        customStyle: `:root {
                          --main-text-color: #fff;
                          --main-background-color: #000;
                          --main-dark-color:#1b1b1b;
                        }
                        
                        body{
                          background-color: black;
                        }
                        
                        .posts-grid{
                            margin-top: 10px;
                        }
                        .postPageLeftSidebar,.homePageLeftSidebar{
                          background-color: #1f1f23;
                        }`,
        topBarStyle:'background-color:#333;',
        headerStyle:'background-color:black;',
        navigationStyle:'background-color:#333;',
        footerStyle:'background-color:#333;',
        postElementStyle:`.post-element {
                                  .image {
                                    position: relative;
                                    .bottom-right,.top-left,.bottom-left, .top-right {
                                      color: var(--main-text-color);
                                    }
                                  }
                                  
                                  h3 {
                                    color: var(--main-text-color);
                                    text-align:center;
                                  }
                                
                                  .progressParent{
                                    background-color: #333;
                                    width: 100%;
                                    .progressChild{
                                      background-color: var(--main-text-color);
                                      p{
                                        position: relative;
                                        width: 100%;
                                        color: var(--main-text-color);
                                      }
                                    }
                                  }
                                }`
    }
}

const siteDesignToSave = new settingSchema(designData)
siteDesignToSave.save().catch(() => {
    console.log('Error on site Identity set')
})
