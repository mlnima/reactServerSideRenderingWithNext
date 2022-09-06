"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var contactFormSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    subject: String,
    description: String,
    date: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose.model("contact", contactFormSchema);
//# sourceMappingURL=contactFromSchema.js.map