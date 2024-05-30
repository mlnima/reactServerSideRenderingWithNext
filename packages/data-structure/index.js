const databaseSelectFieldsForPostCards = require('./src/databaseSelectFieldsForPostCards');
const postFieldRequestForCards = require('./src/postFieldRequestForCards');
const postTypes = require('./src/postTypes');
const userStatus = require('./src/userStatus');
const userRoles = require('./src/userRoles');
const videoQualities = require('./src/videoQualities');
const widgetsStaticPositions = require('./src/widgetsStaticPositions');
const widgetsTypes = require('./src/widgetsTypes');
const rtlLanguages = require('./src/rtlLanguages');
const postStatuses = require('./src/postStatuses');
const UGCPostImagesLimit = require('./src/UGCPostImagesLimit');
const { languagesMapOrigin, languagesMapInEnglish } = require('./src/languagesMap');

module.exports = {
    databaseSelectFieldsForPostCards,
    postFieldRequestForCards,
    postTypes,
    userStatus,
    userRoles,
    videoQualities,
    widgetsStaticPositions,
    widgetsTypes,
    rtlLanguages,
    postStatuses,
    UGCPostImagesLimit,
    languagesMapOrigin,
    languagesMapInEnglish
};
