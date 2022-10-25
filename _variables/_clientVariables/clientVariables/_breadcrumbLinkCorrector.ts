const _breadcrumbLinkCorrector =(url)=>{
    return url.includes('/tag') && !url.includes('/tags') ? url.replace('/tag','/tags') :
           url.includes('/actor') && !url.includes('/actors') ? url.replace('/actor','/actors') :
           url.includes('/category') ? url.replace('/category','/categories') :
           url === '/post' ? '/posts' :
               url.includes('/post/video/') ? url :
               url.includes('/post/product/') ? url :
               url.includes('/post/promotion/') ? url :
               url.includes('/post/article/') ? url :
               url.includes('/post/learn/') ? url :
               url.includes('/post/video') ? '/posts?postType=video' :
               url.includes('/post/product') ? '/posts?postType=product' :
               url.includes('/post/promotion') ? '/posts?postType=promotion' :
               url.includes('/post/article') ? '/posts?postType=article' :
               url.includes('/post/learn') ? '/posts?postType=learn' :
                url
}

export default _breadcrumbLinkCorrector