const tableItemProperties = {
    posts:['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt'],
    users:['username', 'email', 'role', 'createdAt', 'updatedAt'],
    comments:['_id','author','status', 'body', 'onDocumentId','createdAt', 'updatedAt'],
    metas:['name',  'type', 'count', 'imageUrl', 'createdAt', 'updatedAt'],
    forms:['formName', 'widgetId', 'createdAt', 'updatedAt'],
    pages: ['pageName', 'status', 'sidebar', 'createdAt', 'updatedAt'],
    orders :['buyer', 'status', 'type', 'isPaid', 'createdAt', 'updatedAt']
}
export default tableItemProperties

