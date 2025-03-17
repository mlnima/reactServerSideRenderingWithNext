export interface IEmail {
    from: string;
    to: string;
    receiver: string; // Made this property required and used lowercase string
    subject: string;
    text?: string;
    html?: string;
    status: string;
    attachments?: string[]; // Changed the type to string[]
    createdAt: Date;
    updatedAt: Date;
}
