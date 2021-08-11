module.exports = (pathname, pageName, direction) => {

    return pathname === '/' ? `homePage${direction}Sidebar` :
        pathname === '/post' ? `postPage${direction}Sidebar` :
            pathname === '/post/[postType]/[id]' ? `postPage${direction}Sidebar` :
                pathname === '/posts' ? `postsPage${direction}Sidebar` :
                    pathname === '/tags' ? `tagsPage${direction}Sidebar` :
                        pathname === '/categories' ? `categoriesPage${direction}Sidebar` :
                            pathname === '/actors' ? `actorsPage${direction}Sidebar` :
                                pathname === '/tag/[tagId]' ? `tagPage${direction}Sidebar` :
                                    pathname === '/category/[categoryId]' ? `categoryPage${direction}Sidebar` :
                                        pathname === '/actor/[actorId]' ? `actorPage${direction}Sidebar` :
                                            pathname === '/auth/register' || pathname === '/auth/login' ? `authPage${direction}Sidebar` :
                                                pathname.includes('/profile') ? `profilePage${direction}Sidebar` :
                                                    pathname.includes('/messenger') ? `messengerPage${direction}Sidebar` :
                                                        pathname.includes('/user/') ? `userPage${direction}Sidebar` :
                                                            pathname === '/page/[pageName]' ? pageName + direction + `Sidebar` :
                                                                `homePage${direction}Sidebar`
}