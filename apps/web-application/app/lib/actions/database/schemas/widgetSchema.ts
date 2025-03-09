// import {model, Schema, Document} from "mongoose";
// import {Widget} from "@repo/typescript-types";
import mongoose, { Schema, models, model, Document } from "mongoose";
import { Widget } from "@repo/typescript-types";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

interface IWidgetData {
    extraClassName: string;
    extraId: string;
    position: string;
    text: string;
    title: string;
    name: string;
    redirectLink: string;
    redirectToTitle: string;
    redirectLinkPosition: string;
    type: string;
    customStyles: string;
    customScript: string;
    customScriptStrategy: string;
    deviceTypeToRender: string;
    languageToRender: string;
    specificDayToRender: string;
    metaType: string;
    postType: string;
    sortBy: string;
    linkToType: string;
    cardWidthDesktop: number;
    linkToWindowType: string;
    linkToText: string;
    linkToAs: string;
    editMode: boolean;
    noSSR: boolean;
    linkTo: string;
    multipleLinks: any[];
    mediaUrl: string;
    mediaType: string;
    widgetIndex: number;
    selectedMetaForPosts: string;
    count: number;
    pagination: boolean;
    stayOpen: boolean;
    translations: any;
    uniqueData: any;
    menuItems: any;
    comments: any[];
}

const widgetDataSchema = new Schema<IWidgetData>({
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
    translations: Schema.Types.Mixed,
    uniqueData: Schema.Types.Mixed,
    menuItems: Schema.Types.Mixed,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
});

widgetDataSchema.plugin(mongooseLeanVirtuals);

interface IWidget extends Document, Widget {
    data: IWidgetData;
}

const widgetSchema = new Schema<IWidget>({
    data: widgetDataSchema,
}, { timestamps: true });

const WidgetModel = models?.widgets || model<IWidget>("widgets", widgetSchema);

export default WidgetModel;

// import mongooseLeanVirtuals from "mongoose-lean-virtuals";
//
// const widgetDataSchema = new Schema({
//     extraClassName: String,
//     extraId: String,
//     position: String,
//     text: String,
//     title: String,
//     name: String,
//     redirectLink: String,
//     redirectToTitle: String,
//     redirectLinkPosition: String,
//     type: String,
//     customStyles: String,
//     customScript: String,
//     customScriptStrategy: String,
//     deviceTypeToRender: String,
//     languageToRender: String,
//     specificDayToRender: String,
//     metaType: String,
//     postType: String,
//     sortBy: String,
//     linkToType: String,
//     cardWidthDesktop: Number,
//     linkToWindowType: String,
//     linkToText: String,
//     linkToAs: String,
//     editMode: Boolean,
//     noSSR: Boolean,
//     linkTo: String,
//     multipleLinks: Array,
//     mediaUrl: String,
//     mediaType: String,
//     widgetIndex: Number,
//     selectedMetaForPosts: String,
//     count: Number,
//     pagination: Boolean,
//     stayOpen: Boolean,
//     translations: Schema.Types.Mixed,
//     uniqueData: Schema.Types.Mixed,
//     menuItems: Schema.Types.Mixed,
//     comments: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'comment'
//         }
//     ]
// } );
//
// widgetDataSchema.plugin(mongooseLeanVirtuals);
//
// const widgetSchema = new Schema({
//     data: widgetDataSchema,
// },{timestamps: true});
//
// export default model<Widget & Document>("widgets", widgetSchema);