module.exports = () => {
    return {
        beforeFiles: [
            // {
            //     source: "/api/:path*",
            //     destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/:path*`,
            // },
            {
                source: "/wp/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/wp/:path*`,
            },
            {
                source: "/public/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/public/:path*`,
            }
          // {
          //   source: "/public/:path*",
          //   destination: `/api/public/:path*`,
          // }

        ]
    }
}
