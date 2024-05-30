const mongoose = require('mongoose');

const WidgetDataSchema = new mongoose.Schema({
    extraClassName: String,
    extraId: String,
    position: String,
    text: String,
    title: String,
    name: String,
    redirectLink: String,
    redirectToTitle: String,
    redirectLinkPosition: String,
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
    linkToType: String,
    cardWidthDesktop: Number,
    linkToWindowType: String,
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
    translations: mongoose.Schema.Types.Mixed,
    uniqueData: mongoose.Schema.Types.Mixed,
    menuItems: mongoose.Schema.Types.Mixed,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
} );

const WidgetSchema = new mongoose.Schema({
    data: WidgetDataSchema,
},{timestamps: true});

module.exports = mongoose.model("widgets", WidgetSchema);