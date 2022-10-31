"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var widgetDataSchema = new mongoose_1.Schema({
    extraClassName: String,
    extraId: String,
    position: String,
    text: String,
    adCode: String,
    title: String,
    name: String,
    redirectLink: String,
    redirectToTitle: String,
    type: String,
    linkToWindowType: String,
    customStyles: String,
    customScript: String,
    customScriptStrategy: String,
    deviceTypeToRender: String,
    languageToRender: String,
    specificDayToRender: String,
    metaType: String,
    postType: String,
    sortBy: String,
    LogoText: String,
    LogoUrl: String,
    headLine: String,
    linkToType: String,
    cardWidthDesktop: Number,
    linkToText: String,
    linkToAs: String,
    editMode: Boolean,
    noSSR: Boolean,
    linkTo: String,
    multipleLinks: Array,
    mediaUrl: String,
    mediaType: String,
    widgetIndex: Number,
    selectedMetaForPosts: String,
    count: Number,
    pagination: Boolean,
    stayOpen: Boolean,
    translations: mongoose_1.Schema.Types.Mixed,
    uniqueData: mongoose_1.Schema.Types.Mixed,
    menuItems: mongoose_1.Schema.Types.Mixed,
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
});
var widgetSchema = new mongoose_1.Schema({
    data: widgetDataSchema
});
exports["default"] = (0, mongoose_1.model)("widgets", widgetSchema);
