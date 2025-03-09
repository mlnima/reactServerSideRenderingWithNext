const tableItemProperties = {
    posts:['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'thumbnail', 'createdAt', 'updatedAt'],
    chatrooms:['name', 'status', 'createdAt', 'updatedAt'],
    users:['username', 'email', 'status', 'role', 'createdAt', 'updatedAt'],
    comments:['_id','author','status', 'body', 'onDocumentId','createdAt', 'updatedAt'],
    metas:['name',  'type', 'status', 'count', 'imageUrl', 'createdAt', 'updatedAt'],
    forms:['formName', 'widgetId', 'createdAt', 'updatedAt'],
    pages: ['pageName', 'status', 'sidebar', 'createdAt', 'updatedAt'],
    orders :['buyer', 'status', 'type', 'isPaid', 'createdAt', 'updatedAt']
}
export default tableItemProperties

