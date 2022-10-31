import mongoose, {Schema} from "mongoose";

const translateSchema =  new Schema({
     defaultValue:String,
     translate: Schema.Types.Mixed
});

export default mongoose.model("translate", translateSchema);