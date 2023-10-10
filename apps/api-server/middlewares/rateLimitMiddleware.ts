import {Request, Response, NextFunction} from 'express';

const dev = process.env.NODE_ENV !== 'production';

interface UserRate {
    count: number;
    timestamp: number;
}

const userCounts: Record<string, UserRate> = {};

const cleanupIntervalMillis = 600000; // 1H for cleanup

// Periodically clean up old entries
setInterval(() => {
    const now = Date.now();
    for (const userID in userCounts) {
        if (now - userCounts[userID].timestamp > cleanupIntervalMillis) {
            delete userCounts[userID];
        }
    }
}, cleanupIntervalMillis);

function rateLimitMiddleware(limit: number, withinMillis: number) {

    return (req: Request, res: Response, next: NextFunction) => {
        if (dev) {
            next()
        }else {
            const userID = String(req.headers['x-real-ip'] || req.connection.remoteAddress);

            if (!userCounts[userID]) {
                userCounts[userID] = {count: 0, timestamp: Date.now()};
            }

            const timePassed = Date.now() - userCounts[userID].timestamp;

            if (timePassed < withinMillis && userCounts[userID].count >= limit) {
                return res.status(429).send('Too many requests. Please wait.');
            } else if (timePassed >= withinMillis) {
                userCounts[userID].count = 0;
                userCounts[userID].timestamp = Date.now();
            }

            userCounts[userID].count += 1;
            next();
        }
    };
}

export default rateLimitMiddleware;


// import { Request, Response, NextFunction } from 'express';
//
// interface UserRate {
//     count: number;
//     timestamp: number;
// }
//
// const userCounts: Record<string, UserRate> = {};
//
// function rateLimitMiddleware(limit: number, withinMillis: number) {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const userID = String(req.headers['x-real-ip'] || req.connection.remoteAddress);
//
//         if (!userCounts[userID]) {
//             userCounts[userID] = { count: 0, timestamp: Date.now() };
//         }
//
//         const timePassed = Date.now() - userCounts[userID].timestamp;
//
//         if (timePassed < withinMillis && userCounts[userID].count >= limit) {
//             return res.status(429).send('Too many requests. Please wait.');
//         } else if (timePassed >= withinMillis) {
//             userCounts[userID].count = 0;
//             userCounts[userID].timestamp = Date.now();
//         }
//
//         userCounts[userID].count += 1;
//         next();
//     };
// }
//
// export default rateLimitMiddleware;