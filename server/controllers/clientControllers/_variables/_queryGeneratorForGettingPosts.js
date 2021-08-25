//queryGeneratorForGettingPosts
module.exports = data =>{
     const size = data?.size || data?.count
     const sort = data?.sort || data?.sortBy
     const meta = data.metaId || data?.selectedMetaForPosts
    return {
         size : size ? parseInt(size)  > 500 ? 500 : parseInt(size)  : 30,
         page : data?.page ? parseInt(data?.page) : 1,
         postTypeQuery : data?.postType ? {postType: data.postType} : {},
         statusQuery : data?.status ? data?.status === 'all' ? {status: {$ne: 'trash'}} : {status: data.status} : {status: 'published'} ,
         authorQuery : data.author ? data.author === 'all' ? {} : {author: data.author}:{},
         metaQuery : meta ? {$or: [{categories: meta}, {tags: meta}, {actors: meta}]}:{},
         searchQuery : data.keyword ? !data.lang || data.lang === 'default' ? {$or: [{title: new RegExp(data.keyword, 'i')}]} :
                      {$or: [{title: new RegExp(data.keyword, 'i')}, {[`translations.${data.lang}.title`]: new RegExp(data.keyword, 'i')},]} : {},
         selectedFields : data.fields && data.fields?.length > 0 || !data.fields ? [] : data.fields,
         sortQuery : sort === 'createdAt' || sort === 'random' || !sort ? {} : {[sort]: -1}
    }
}