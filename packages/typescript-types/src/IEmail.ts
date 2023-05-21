
export interface IEmail {
    from: String,
    to: String,
    receiver: String,
    subject: String,
    text?: String,
    html?: String,
    status: String,
    attachments ?: String,
    createdAt: Date,
    updatedAt: Date
}