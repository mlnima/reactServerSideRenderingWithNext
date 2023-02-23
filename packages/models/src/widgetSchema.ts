import {model, Schema, Document} from "mongoose";
import {Widget} from "typescript-types";

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
    translations: Schema.Types.Mixed,
    uniqueData: Schema.Types.Mixed,
    menuItems: Schema.Types.Mixed,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
}, {timestamps: true});

const widgetSchema = new Schema({
    data: widgetDataSchema,
});

export default model<Widget & Document>("widgets", widgetSchema);