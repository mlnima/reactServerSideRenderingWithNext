module.exports = () => {
    return {
        beforeFiles: [
            {
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/:path*`,
            },
            {
                source: "/public/:path*",
                destination: `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/public/:path*`,
            },
        ],
    }
}
