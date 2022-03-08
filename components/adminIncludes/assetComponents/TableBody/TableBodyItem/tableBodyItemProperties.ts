const tableBodyItemProperties = {
    posts:['title', 'author', 'status', 'tags', 'categories', 'mainThumbnail', 'createdAt', 'updatedAt'],
    users:['username', 'email', 'role', 'createdAt', 'updatedAt'],
    comments:['author', 'body', 'onDocument', 'email', 'createdAt', 'updatedAt'],
    metas:['name', 'description', 'type', 'count', 'imageUrl', 'createdAt', 'updatedAt'],
    forms:['formName', 'widgetId', 'createdAt', 'updatedAt'],
    pages: ['pageName', 'status', 'sidebar', 'createdAt', 'updatedAt'],
    orders :['buyer', 'status', 'type', 'isPaid', 'createdAt', 'updatedAt']
}
export default tableBodyItemProperties