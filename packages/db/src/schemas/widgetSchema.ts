import { Schema, models, model, Document, Model } from 'mongoose';
import { IWidget, IWidgetData } from '@repo/typescript-types';

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
      ref: 'comment',
    },
  ],
});

interface IDWidget extends Document, Omit<IWidget, '_id'> {
  data: IWidgetData;
}

const widgetSchema = new Schema<IDWidget>(
  {
    data: widgetDataSchema,
  },
  { timestamps: true },
);

const WidgetModel = (models?.widgets || model<IDWidget>('widgets', widgetSchema)) as Model<any>;

export default WidgetModel;
