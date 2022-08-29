export interface Comment{
    onDocumentId: string,
    author:string,
    reply:[Comment],
    likes:number,
    disLikes:number,
    body: string,
    status:string
}