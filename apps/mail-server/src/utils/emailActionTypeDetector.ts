
const emailActionTypeDetector = (from:string, to:string)=>{
    const fromDomain = from.split('@')[1];
    const toDomain = to.split('@')[1];

    if (toDomain === process.env.MAIL_EXTENSION && fromDomain !== process.env.MAIL_EXTENSION) {
        return 'received';
    }else if (toDomain !== process.env.MAIL_EXTENSION && fromDomain === process.env.MAIL_EXTENSION) {
        return 'toSend';
    }else if (toDomain === process.env.MAIL_EXTENSION && fromDomain === process.env.MAIL_EXTENSION) {
        return 'internal';
    }
}

export default emailActionTypeDetector;