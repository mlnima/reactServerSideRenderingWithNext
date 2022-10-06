const allowedDomainForImages = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' ')

module.exports = {
    images: {
        deviceSizes: [320, 375, 414, 540, 640, 717, 750, 768, 828, 1024, 1080, 1200, 1920, 2048],
        remotePatterns: allowedDomainForImages.filter(Boolean).reduce((finalPatterns, domain) => {
            const domainSplit = domain.split('.')
            finalPatterns = [
                ...finalPatterns,
                {
                    protocol: 'https',
                    hostname: `**.${domainSplit[domainSplit.length - 2]}.${domainSplit[domainSplit.length - 1]}`
                },
                {
                    protocol: 'https',
                    hostname: `${domainSplit[domainSplit.length - 2]}.${domainSplit[domainSplit.length - 1]}`
                },
            ]
            return finalPatterns
        }, [])
    },
}