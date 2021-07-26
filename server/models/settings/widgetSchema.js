const mongoose = require('mongoose');
const Schema = mongoose.Schema

const widgetDataSchema =  mongoose.Schema({
    extraClassName: String,
    extraId: String,
    position: String,
    text: String,
    title: String,
    redirectLink: String,
    redirectToTitle: String,
    type: String,
    customStyles: String,
    deviceTypeToRender: String,
    languageToRender: String,
    metaType: String,
    sortBy: String,
    LogoText: String,
    headLine: String,
    linkToType: String,
    linkToText: String,
    linkToAs: String,
    linkTo: String,
    mediaUrl: String,
    mediaType: String,
    widgetIndex: Number,
    selectedMetaForPosts: Schema.Types.ObjectID,
    count: Number,
    stayOpen: Boolean,
    translations: mongoose.Mixed,
    formData: mongoose.Mixed,
    menuItems: mongoose.Mixed,
    posts: [{type: Schema.Types.ObjectID, ref: 'post'}],
    metaData: [{type: Schema.Types.ObjectID, ref: 'meta'}],
    comments: [{type: Schema.Types.ObjectID, ref: 'comment'}]
});

const widgetSchema = mongoose.Schema({
    // data:mongoose.Mixed,
    data: widgetDataSchema,
});

module.exports = mongoose.model("widgets", widgetSchema);