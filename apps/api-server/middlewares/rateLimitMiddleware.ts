import { Request, Response, NextFunction } from 'express';

interface UserRate {
    count: number;
    timestamp: number;
}

const userCounts: Record<string, UserRate> = {};

function rateLimitMiddleware(limit: number, withinMillis: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userID = String(req.headers['x-real-ip'] || req.connection.remoteAddress);

        if (!userCounts[userID]) {
            userCounts[userID] = { count: 0, timestamp: Date.now() };
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
    };
}

export default rateLimitMiddleware;