import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const disAllowRoutes = [
        '/user/*',
        '/dashboard/*',
        '/chatroom/*',
        '/page/test',
        '/editPost/*',
        '/messenger/*',
        '/post/*/*/preview/',
        '/account/*',
        '/*?preview=true*',
    ];

    const AIAgents = [
        'GPTBot',
        'ChatGPT-User',
        'CCBot',
        'Google-Extended',
        'FacebookBot',
        'Omgilibot',
    ]

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: disAllowRoutes,
            },
            {
                userAgent: AIAgents,
                disallow: disAllowRoutes,
            },
        ],
        sitemap: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap.xml`,
    };
}
