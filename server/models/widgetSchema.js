const mongoose = require('mongoose');
const Schema = mongoose.Schema

const widgetDataSchema = new Schema({
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
    postElementSize: String,
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
    stayOpen: Boolean,
    translations: mongoose.Mixed,
    uniqueData: mongoose.Mixed,
    menuItems: mongoose.Mixed,
    posts: [{type: Schema.Types.ObjectID, ref: 'post'}],
    metaData: [{type: Schema.Types.ObjectID, ref: 'meta'}],
    comments: [{type: Schema.Types.ObjectID, ref: 'comment'}]
});

const widgetSchema = new Schema({

    data: widgetDataSchema,
});

module.exports = mongoose.model("widgets", widgetSchema);